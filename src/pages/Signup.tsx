
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import EmailSignupForm from "@/components/auth/EmailSignupForm";
import SignupLayout from "@/components/auth/SignupLayout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <SignupLayout>
        <Alert className="mb-6 bg-amber-50/10 border-amber-300/20 animate-slide-in" style={{ animationDelay: "0.025s" }}>
          <InfoIcon className="h-4 w-4 text-amber-400" />
          <AlertDescription className="text-xs text-amber-200">
            Register to create an account. Your information will be securely stored in Supabase.
          </AlertDescription>
        </Alert>
        
        <EmailSignupForm />
      </SignupLayout>
    </Layout>
  );
};

export default Signup;
