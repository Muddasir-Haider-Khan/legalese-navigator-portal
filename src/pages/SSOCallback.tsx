
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
        // First: Check if we already have a session
        const { data, error } = await supabase.auth.getSession();
        
        if (data.session) {
          // Already authenticated
          toast.success("Successfully authenticated!");
          navigate("/dashboard");
          return;
        }
        
        if (error) {
          console.error("Session error:", error);
        }
        
        // Second: Try to process URL parameters for any auth method
        const url = new URL(window.location.href);
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get("access_token");
        
        if (accessToken) {
          // Handle implicit flow tokens
          const { error: setSessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: hashParams.get("refresh_token") || "",
          });
          
          if (setSessionError) {
            console.error("Set session error:", setSessionError);
          } else {
            // Success with implicit flow
            toast.success("Successfully authenticated!");
            navigate("/dashboard");
            return;
          }
        }
        
        // Third: Try code exchange (PKCE flow)
        if (url.searchParams.get("code")) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(window.location.href);
          
          if (exchangeError) {
            console.error("Code exchange error:", exchangeError);
          } else {
            // Check if we now have a valid session
            const { data: sessionData } = await supabase.auth.getSession();
            if (sessionData.session) {
              toast.success("Successfully authenticated!");
              navigate("/dashboard");
              return;
            }
          }
        }
        
        // Fourth: Last resort - check email from localStorage and try OTP
        const email = localStorage.getItem("lastLoginEmail");
        if (email) {
          try {
            const { error: otpError } = await supabase.auth.signInWithOtp({
              email,
              options: { shouldCreateUser: false }
            });
            
            if (!otpError) {
              toast.success("Authentication successful!");
              navigate("/dashboard");
              return;
            }
          } catch (e) {
            console.error("OTP fallback error:", e);
          }
        }
        
        // If all methods fail, redirect to login
        console.error("No authentication method worked");
        setError("Authentication failed. Please try logging in again.");
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
