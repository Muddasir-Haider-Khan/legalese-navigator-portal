
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import SignupLayout from "@/components/auth/SignupLayout";
import { Check } from "lucide-react";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState<string>("");

  // Extract email from URL params if available
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [location]);

  const handleResendVerification = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    
    try {
      // Resend verification email using Supabase
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) throw error;
      toast.success("Verification email resent successfully");
    } catch (error) {
      console.error("Error resending email:", error);
      toast.error("Failed to resend verification email");
    }
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <Layout>
      <SignupLayout>
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center w-16 h-16 bg-rocket-blue-500/20 rounded-full mb-4">
            <Check className="h-8 w-8 text-rocket-blue-300" />
          </div>
          <h2 className="text-xl font-medium text-white mb-3">Check Your Email</h2>
          <p className="text-rocket-gray-400 text-sm mb-4">
            We've sent a verification link to {email ? <span className="font-medium text-rocket-blue-300">{email}</span> : "your email"}. 
            Please check your inbox and click on the link to verify your account.
          </p>
          <p className="text-rocket-gray-400 text-sm">
            The link will expire in 24 hours.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            type="button"
            className="w-full bg-rocket-blue-500 hover:bg-rocket-blue-600"
            onClick={handleResendVerification}
          >
            Resend Verification Email
          </Button>
          
          <Button
            type="button"
            variant="outline"
            className="w-full bg-transparent border-white/20 hover:bg-white/5 text-white"
            onClick={handleGoToLogin}
          >
            Back to Login
          </Button>
        </div>
      </SignupLayout>
    </Layout>
  );
};

export default VerifyEmail;
