
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";

const Login = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Error during login:", error);
        setErrorMessage(error.message || "Invalid email or password");
        toast.error(error.message || "Invalid email or password");
      } else {
        console.log("Login successful:", data);
        toast.success("Logged in successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Exception during login:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container-custom py-12 md:py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="heading-md mb-2">Welcome Back</h1>
            <p className="text-rocket-gray-500">
              Sign in to access your legal documents and advice history.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg border border-rocket-gray-100 p-6 md:p-8 dark:bg-rocket-blue-800 dark:border-rocket-blue-700">
            <form onSubmit={handleLogin} className="space-y-6">
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md dark:bg-red-900/30 dark:border-red-800 dark:text-red-300">
                  {errorMessage}
                </div>
              )}

              <div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="mt-1 pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-rocket-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                  />
                  <label htmlFor="remember-me" className="text-sm cursor-pointer">
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-rocket-blue-500 text-sm hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-rocket-blue-600 hover:bg-rocket-blue-700 dark:bg-rocket-blue-500 dark:hover:bg-rocket-blue-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-rocket-gray-200 dark:border-rocket-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-rocket-gray-500 dark:bg-rocket-blue-800 dark:text-rocket-gray-400">Or continue with</span>
                </div>
              </div>
              
              <GoogleAuthButton isSubmitting={isSubmitting} />
            </form>

            <div className="mt-6 text-center">
              <p className="text-rocket-gray-500 dark:text-rocket-gray-400">
                Don't have an account?{" "}
                <Link to="/signup" className="text-rocket-blue-500 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
