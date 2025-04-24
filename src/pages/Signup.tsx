
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import EmailSignupForm from "@/components/auth/EmailSignupForm";
import SignupLayout from "@/components/auth/SignupLayout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <SignupLayout>
        <div className="flex justify-center mb-6">
          <div className="p-3 rounded-full bg-amber-500/10 border border-amber-500/20 animate-bounce-slow">
            <Shield className="h-6 w-6 text-amber-400" />
          </div>
        </div>
        
        <Alert className="mb-6 bg-amber-50/10 border-amber-300/20 animate-slide-in" style={{ animationDelay: "0.025s" }}>
          <AlertDescription className="text-sm text-amber-200 text-center">
            Create your account to access legal documents, advice, and more. Your information is securely stored and protected.
          </AlertDescription>
        </Alert>
        
        <EmailSignupForm />
      </SignupLayout>
    </Layout>
  );
};

export default Signup;
