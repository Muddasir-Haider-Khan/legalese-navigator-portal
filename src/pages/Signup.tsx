
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Eye, EyeOff, CheckCircle2, X } from "lucide-react";
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
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  
  // Simulated Google accounts that might be present in the browser
  const [browserGoogleAccounts] = useState(() => {
    // In a real app, we wouldn't be able to access this information directly
    // This is just for simulation purposes
    return [
      { 
        email: "johndoe@gmail.com", 
        name: "John Doe", 
        avatar: "J", 
        color: "bg-blue-500" 
      },
      { 
        email: "jane.smith@gmail.com", 
        name: "Jane Smith", 
        avatar: "J", 
        color: "bg-purple-500" 
      },
      { 
        email: "alex.taylor@gmail.com", 
        name: "Alex Taylor", 
        avatar: "A", 
        color: "bg-green-500" 
      }
    ];
  });

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
    // Show Google account selection modal
    setShowGoogleModal(true);
  };

  const handleGoogleAccountSelection = (email: string) => {
    setIsSubmitting(true);
    
    // Simulate Google sign-in process after selecting an account
    setTimeout(() => {
      setIsSubmitting(false);
      setShowGoogleModal(false);
      toast.success(`Signed in with ${email}`, {
        icon: <CheckCircle2 className="h-4 w-4 text-green-500" />
      });
      sessionStorage.setItem("userEmail", email);
      window.location.href = "/dashboard";
    }, 1000);
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
      
      {/* Google Account Selection Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-[#202124] text-white w-full max-w-sm mx-4 rounded-lg shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-700 flex items-center">
              <div className="mr-3">
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-medium">Sign in with Google</h2>
              </div>
              <button 
                className="ml-auto text-gray-400 hover:text-white"
                onClick={() => setShowGoogleModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Main Content */}
            <div className="px-6 py-8">
              <h1 className="text-2xl font-light mb-2">Choose an account</h1>
              <p className="text-sm text-gray-400 mb-8">to continue to yourlegalapp.com</p>
              
              {/* Browser Google Accounts */}
              <div className="space-y-4">
                {/* Map through simulated browser accounts */}
                {browserGoogleAccounts.map((account, index) => (
                  <button 
                    key={index}
                    className="flex items-center w-full py-2 px-1 hover:bg-white/5 rounded-lg transition-colors"
                    onClick={() => handleGoogleAccountSelection(account.email)}
                  >
                    <div className={`w-10 h-10 rounded-full ${account.color} flex items-center justify-center mr-4 text-white font-medium`}>
                      {account.avatar}
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{account.name}</div>
                      <div className="text-sm text-gray-400">{account.email}</div>
                    </div>
                  </button>
                ))}
                
                {/* Use another account */}
                <button 
                  className="flex items-center w-full py-2 px-1 hover:bg-white/5 rounded-lg transition-colors"
                  onClick={() => {
                    // In a real app, this would open Google's sign-in screen
                    toast.info("This would open Google's sign-in page in a real implementation");
                  }}
                >
                  <div className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center mr-4 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="16" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Use another account</div>
                  </div>
                </button>
              </div>
            </div>
            
            {/* Footer */}
            <div className="border-t border-gray-700 px-6 py-4">
              <p className="text-xs text-gray-400">
                Before using this app, you can review your Legal App's{' '}
                <a href="/privacy" className="text-blue-400 hover:text-blue-300">privacy policy</a>{' '}
                and{' '}
                <a href="/terms" className="text-blue-400 hover:text-blue-300">terms of service</a>.
              </p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Signup;
