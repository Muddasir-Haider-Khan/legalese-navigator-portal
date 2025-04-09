
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const SSOCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    // Handle the OAuth or email verification callback
    const handleAuthCallback = async () => {
      try {
        setIsProcessing(true);
        
        // Parse the URL to check what type of callback this is
        const url = window.location.href;
        const isEmailVerification = url.includes('type=signup') || url.includes('type=recovery');
        
        // For email verification links, we need to exchange the code for a session
        if (isEmailVerification || url.includes('code=')) {
          console.log("Processing email verification or OAuth callback");
          
          const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(url);
          
          if (exchangeError) {
            console.error("Code exchange error:", exchangeError);
            setError(`Authentication failed: ${exchangeError.message}`);
            toast.error("Verification failed. Please try logging in again.");
            setTimeout(() => navigate("/login"), 2000);
            return;
          }
          
          if (data?.session) {
            // Successfully authenticated
            console.log("Authentication successful");
            toast.success("Email verified successfully!");
            navigate("/dashboard");
            return;
          }
        }
        
        // Check if we already have a session (fallback)
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData.session) {
          console.log("Session already exists");
          toast.success("Authentication successful!");
          navigate("/dashboard");
          return;
        }
        
        // If we get here, the authentication wasn't successful
        console.error("No authentication method worked");
        setError("Authentication failed. Please try logging in again.");
        toast.error("Authentication failed");
        setTimeout(() => navigate("/login"), 2000);
      } catch (err) {
        console.error("Authentication callback error:", err);
        setError("An unexpected error occurred. Please try logging in again.");
        toast.error("Authentication error");
        setTimeout(() => navigate("/login"), 2000);
      } finally {
        setIsProcessing(false);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-rocket-blue-950">
      <div className="glass-card rounded-xl shadow-xl border border-rocket-blue-50/20 p-8 backdrop-blur-lg bg-white/5 max-w-md w-full mx-4">
        {isProcessing ? (
          <div className="text-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-rocket-blue-300 border-t-rocket-blue-600 mx-auto"></div>
            <p className="mt-6 text-white text-lg font-medium">Completing verification...</p>
            <p className="mt-2 text-rocket-gray-400 text-sm">Please wait while we verify your account</p>
          </div>
        ) : error ? (
          <div className="text-center">
            <div className="flex justify-center">
              <div className="bg-red-900/30 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <p className="text-red-400 text-lg font-medium mt-4">{error}</p>
            <p className="text-rocket-gray-400 mt-2 text-sm">Redirecting to login page...</p>
          </div>
        ) : (
          <div className="text-center">
            <div className="flex justify-center">
              <div className="bg-green-900/30 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <p className="text-green-400 text-lg font-medium mt-4">Verification successful!</p>
            <p className="text-rocket-gray-400 mt-2 text-sm">Redirecting to dashboard...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SSOCallback;
