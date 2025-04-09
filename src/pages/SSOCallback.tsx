
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const SSOCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Handle the OAuth callback with Supabase
    const handleOAuthCallback = async () => {
      try {
        // Get the current session
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session error:", error);
          setError("Authentication error. Please try again.");
          toast.error("Authentication failed");
          setTimeout(() => navigate("/login"), 2000);
          return;
        }
        
        if (data.session) {
          // Successfully authenticated
          toast.success("Successfully authenticated!");
          navigate("/dashboard");
          return;
        }

        // No session found, try to process URL parameters
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get("access_token");
        
        if (accessToken) {
          // Set the session with the access token
          const { error: setSessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: hashParams.get("refresh_token") || "",
          });
          
          if (setSessionError) {
            console.error("Set session error:", setSessionError);
            setError("Failed to set session. Please try again.");
            toast.error("Authentication failed");
            setTimeout(() => navigate("/login"), 2000);
            return;
          }
          
          toast.success("Successfully authenticated!");
          navigate("/dashboard");
          return;
        }
        
        // Try to exchange code for session (PKCE flow)
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(window.location.search);
        
        if (exchangeError) {
          console.error("Code exchange error:", exchangeError);
          
          // Even if we have an error exchanging the code, try to get the session again
          const { data: sessionData } = await supabase.auth.getSession();
          if (sessionData.session) {
            toast.success("Successfully authenticated!");
            navigate("/dashboard");
            return;
          }
          
          setError("Authentication error. Please try again.");
          toast.error("Authentication failed");
          setTimeout(() => navigate("/login"), 2000);
          return;
        }
        
        // Check if we have a session after code exchange
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData.session) {
          toast.success("Successfully authenticated!");
          navigate("/dashboard");
          return;
        }
        
        // If we still don't have a session, try OTP as a last resort
        const email = localStorage.getItem("lastLoginEmail");
        if (email) {
          const { error: otpError } = await supabase.auth.signInWithOtp({
            email,
            options: {
              shouldCreateUser: false
            }
          });
          
          if (!otpError) {
            toast.success("Authentication successful!");
            setTimeout(() => navigate("/dashboard"), 1000);
            return;
          }
        }
        
        // No authentication method worked
        console.error("No authentication data found");
        setError("No authentication data found. Please try again.");
        toast.error("Authentication failed");
        setTimeout(() => navigate("/login"), 2000);
      } catch (err) {
        console.error("OAuth callback error:", err);
        setError("An unexpected error occurred. Please try again.");
        toast.error("Authentication error");
        setTimeout(() => navigate("/login"), 2000);
      }
    };

    handleOAuthCallback();
  }, [navigate]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-rocket-blue-950">
      {error ? (
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <p className="text-white">Redirecting to login page...</p>
        </div>
      ) : (
        <>
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-rocket-blue-300 border-t-rocket-blue-600"></div>
          <p className="mt-4 text-white text-lg">Completing authentication...</p>
        </>
      )}
    </div>
  );
};

export default SSOCallback;
