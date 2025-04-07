
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@clerk/clerk-react";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import EmailSignupForm from "@/components/auth/EmailSignupForm";
import SignupLayout from "@/components/auth/SignupLayout";

const Signup = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If user is already signed in, redirect to dashboard
  if (isSignedIn) {
    navigate("/dashboard");
    return null;
  }

  return (
    <Layout>
      <SignupLayout>
        {/* Google Sign-up Button */}
        <div className="mb-6 animate-slide-in" style={{ animationDelay: "0.05s" }}>
          <GoogleAuthButton isSubmitting={isSubmitting} />
        </div>
        
        {/* Divider */}
        <div className="flex items-center justify-center mb-6 animate-slide-in" style={{ animationDelay: "0.075s" }}>
          <div className="bg-white/20 h-px flex-1"></div>
          <span className="px-4 text-sm text-white/60">or</span>
          <div className="bg-white/20 h-px flex-1"></div>
        </div>

        <EmailSignupForm />
      </SignupLayout>
    </Layout>
  );
};

export default Signup;
