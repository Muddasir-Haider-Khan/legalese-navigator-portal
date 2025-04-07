
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@clerk/clerk-react";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import EmailSignupForm from "@/components/auth/EmailSignupForm";
import SignupLayout from "@/components/auth/SignupLayout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

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
        {/* Development Mode Alert */}
        <Alert className="mb-6 bg-amber-50/10 border-amber-300/20 animate-slide-in" style={{ animationDelay: "0.025s" }}>
          <InfoIcon className="h-4 w-4 text-amber-400" />
          <AlertDescription className="text-xs text-amber-200">
            This app uses Clerk in development mode. OAuth providers may require additional configuration.
          </AlertDescription>
        </Alert>
        
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
