import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Eye, EyeOff, InfoIcon } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Register = () => {
  const navigate = useNavigate();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      toast.error("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    if (!agreeToTerms) {
      setErrorMessage("You must agree to the Terms of Service and Privacy Policy");
      toast.error("You must agree to the Terms of Service and Privacy Policy");
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      });

      if (error) {
        setErrorMessage(error.message);
        toast.error("Registration failed");
        setIsSubmitting(false);
        return;
      }

      localStorage.setItem("lastLoginEmail", email);
      toast.success("Account created successfully! Please log in.");
      navigate("/login");

    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred");
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>


            {errorMessage && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-800 text-red-300 text-sm rounded-md">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="first-name"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                  required
                />
                <Input
                  id="last-name"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                  required
                />
              </div>

              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
                required
              />

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10 bg-white/10 border-white/20 text-white"
                  required
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-white/70"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pr-10 bg-white/10 border-white/20 text-white"
                  required
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-white/70"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agree-terms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) => setAgreeToTerms(!!checked)}
                  className="border-white/30 data-[state=checked]:bg-rocket-blue-500"
                />
                <label htmlFor="agree-terms" className="text-sm text-white cursor-pointer">
                  I agree to the{" "}
                  <Link to="/terms" className="text-rocket-blue-300 underline">Terms</Link> and{" "}
                  <Link to="/privacy" className="text-rocket-blue-300 underline">Privacy</Link>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !agreeToTerms}
                className="w-full bg-rocket-blue-500 hover:bg-rocket-blue-600 text-white transition-colors"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-rocket-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-rocket-blue-300 hover:underline">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;

