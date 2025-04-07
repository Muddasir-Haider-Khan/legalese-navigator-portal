
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import SignupLayout from "@/components/auth/SignupLayout";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [verificationCode, setVerificationCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState<string>("");

  // Extract email from URL params if available
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [location]);

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationCode) return;
    setIsSubmitting(true);

    try {
      // Use Supabase to verify the email with OTP
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: verificationCode,
        type: 'email'
      });
      
      if (error) {
        console.error("Verification error:", error);
        toast.error("Verification failed. Please try again.");
        return;
      }

      toast.success("Email verified successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during verification:", error);
      toast.error("Invalid verification code");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
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
      toast.success("Verification code resent successfully");
    } catch (error) {
      console.error("Error resending code:", error);
      toast.error("Failed to resend verification code");
    }
  };

  return (
    <Layout>
      <SignupLayout>
        <div className="text-center mb-6">
          <h2 className="text-xl font-medium text-white mb-3">Verify Your Email</h2>
          <p className="text-rocket-gray-400 text-sm">
            We've sent a verification code to your email. Please enter it below to complete your registration.
          </p>
        </div>

        {!email && (
          <div className="mb-4">
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
        )}

        <form onSubmit={handleVerification} className="space-y-6">
          <div>
            <Input
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="text-center text-lg tracking-wider bg-white/10 border-white/20 text-white"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-rocket-blue-500 hover:bg-rocket-blue-600"
            disabled={isSubmitting || !verificationCode}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </span>
            ) : "Verify Email"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-rocket-blue-300 hover:text-rocket-blue-200 text-sm hover:underline transition-colors"
            onClick={handleResendCode}
          >
            Didn't receive a code? Resend code
          </button>
        </div>
      </SignupLayout>
    </Layout>
  );
};

export default VerifyEmail;
