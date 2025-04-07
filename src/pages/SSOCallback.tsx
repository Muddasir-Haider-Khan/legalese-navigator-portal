
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const SSOCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle the OAuth callback with Supabase
    const handleOAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (data.session) {
        // Successfully authenticated
        navigate("/dashboard");
      } else {
        // Error or not authenticated
        console.error("OAuth error:", error);
        navigate("/login");
      }
    };

    handleOAuthCallback();
  }, [navigate]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-rocket-blue-950">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-rocket-blue-300 border-t-rocket-blue-600"></div>
      <p className="mt-4 text-white text-lg">Completing authentication...</p>
    </div>
  );
};

export default SSOCallback;
