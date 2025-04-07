
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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
      <div className="container-custom py-16 md:py-20">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg border border-rocket-gray-100 p-6 md:p-8">
            <h1 className="heading-md mb-4 text-center">Verify Your Email</h1>
            <p className="text-center mb-6 text-rocket-gray-500">
              We've sent a verification code to your email. Please enter it below to complete your registration.
            </p>

            {!email && (
              <div className="mb-4">
                <Input
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-2"
                />
              </div>
            )}

            <form onSubmit={handleVerification} className="space-y-6">
              <div>
                <Input
                  placeholder="Enter verification code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="text-center text-lg tracking-wider"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-rocket-blue hover:bg-rocket-blue-600"
                disabled={isSubmitting || !verificationCode}
              >
                {isSubmitting ? "Verifying..." : "Verify Email"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-rocket-gray-500 text-sm">
                Didn't receive a code?{" "}
                <button
                  type="button"
                  className="text-rocket-blue-500 hover:underline"
                  onClick={handleResendCode}
                >
                  Resend code
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VerifyEmail;
