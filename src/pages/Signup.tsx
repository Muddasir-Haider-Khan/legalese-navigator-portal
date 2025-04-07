
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import Layout from "@/components/layout/Layout";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    if (!agreedToTerms) {
      toast.error("Please agree to the Terms and Conditions");
      setIsSubmitting(false);
      return;
    }

    // Simulate registration
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Account created successfully! You can now log in.", {
        icon: <CheckCircle2 className="h-4 w-4 text-green-500" />
      });
      window.location.href = "/login";
    }, 1500);
  };

  const handleGoogleSignup = () => {
    setIsSubmitting(true);
    // Simulate Google sign-in process
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Google sign-in successful!", {
        icon: <CheckCircle2 className="h-4 w-4 text-green-500" />
      });
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <Layout>
      <div className="container-custom py-16 md:py-20 min-h-[80vh] flex items-center relative overflow-hidden">
        {/* Expanded light effects */}
        <div className="fixed inset-0 bg-rocket-blue-950 z-0"></div>
        <div className="absolute -top-40 -left-40 w-[100vh] h-[100vh] bg-rocket-blue-200/10 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-0 right-0 w-[80vh] h-[80vh] bg-rocket-blue-300/10 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-[70vh] h-[70vh] bg-rocket-blue-400/10 rounded-full opacity-20 blur-3xl"></div>
        
        <div className="w-full max-w-md mx-auto relative z-10">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="heading-md mb-2 text-gradient">Create Your Account</h1>
            <p className="text-rocket-gray-500">
              Sign up to access legal documents, advice, and more.
            </p>
          </div>

          <div className="glass-card rounded-xl shadow-xl border border-rocket-blue-50/20 p-8 animate-scale-in backdrop-blur-lg bg-white/5">
            {/* Google Sign-up Button */}
            <div className="mb-6 animate-slide-in" style={{ animationDelay: "0.05s" }}>
              <Button
                type="button"
                variant="outline"
                className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center gap-2"
                onClick={handleGoogleSignup}
                disabled={isSubmitting}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107"/>
                  <path d="M3.15295 7.3455L6.43845 9.755C7.32745 7.554 9.48045 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15895 2 4.82795 4.1685 3.15295 7.3455Z" fill="#FF3D00"/>
                  <path d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5718 17.5742 13.3038 18.0011 12 18C9.39903 18 7.19053 16.3415 6.35853 14.027L3.09753 16.5395C4.75253 19.778 8.11353 22 12 22Z" fill="#4CAF50"/>
                  <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2"/>
                </svg>
                Continue with Google
              </Button>
            </div>
            
            {/* Divider */}
            <div className="flex items-center justify-center mb-6 animate-slide-in" style={{ animationDelay: "0.075s" }}>
              <div className="bg-white/20 h-px flex-1"></div>
              <span className="px-4 text-sm text-white/60">or</span>
              <div className="bg-white/20 h-px flex-1"></div>
            </div>

            <form onSubmit={handleSignup} className="space-y-5">
              <div className="animate-slide-in" style={{ animationDelay: "0.1s" }}>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="mt-1 futuristic-input"
                  required
                />
              </div>

              <div className="animate-slide-in" style={{ animationDelay: "0.2s" }}>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="mt-1 futuristic-input"
                  required
                />
              </div>

              <div className="animate-slide-in" style={{ animationDelay: "0.3s" }}>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="mt-1 pr-10 futuristic-input"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-rocket-gray-500 hover:text-rocket-blue-500 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <p className="text-xs text-rocket-gray-500 mt-1">
                  Password must be at least 8 characters
                </p>
              </div>

              <div className="animate-slide-in" style={{ animationDelay: "0.4s" }}>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="mt-1 pr-10 futuristic-input"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-rocket-gray-500 hover:text-rocket-blue-500 transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-3 pt-2 animate-slide-in" style={{ animationDelay: "0.5s" }}>
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(!!checked)}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm cursor-pointer">
                  I agree to the{" "}
                  <Link to="/terms" className="text-rocket-blue-500 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-rocket-blue-500 hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-rocket-blue hover:bg-rocket-blue-600 mt-6 transition-all duration-300 animate-slide-in"
                style={{ animationDelay: "0.6s" }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: "0.7s" }}>
              <p className="text-rocket-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-rocket-blue-300 hover:underline hover:text-rocket-blue-200 transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
