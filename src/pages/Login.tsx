
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Eye, EyeOff, Shield, Info } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional()
});

const Login = () => {
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSubmitting, setResetSubmitting] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/user-dashboard");
      }
    };
    checkSession();
    
    // Pre-fill email if available from localStorage
    const savedEmail = localStorage.getItem("lastLoginEmail");
    if (savedEmail) {
      form.setValue("email", savedEmail);
      form.setValue("rememberMe", true);
    }
  }, [navigate, form]);

  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    setIsSubmitting(true);
    setErrorMessage("");

    if (values.rememberMe) {
      localStorage.setItem("lastLoginEmail", values.email);
    } else {
      localStorage.removeItem("lastLoginEmail");
    }

    try {
      // Sign in with password
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        console.log("Login error:", error.message);
        setErrorMessage(error.message);
        toast.error("Login failed");
        setIsSubmitting(false);
        return;
      }

      // Login successful
      toast.success("Welcome back!");
      navigate("/user-dashboard");
      
    } catch (error) {
      console.error("Exception during login:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred");
      setIsSubmitting(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetSubmitting(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Password reset link sent to your email");
        setShowResetDialog(false);
      }
    } catch (error) {
      toast.error("Failed to send reset link");
    } finally {
      setResetSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="relative min-h-screen bg-gradient-to-b from-deep-blue-900/90 to-deep-blue-950 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[80vh] h-[80vh] bg-bright-orange-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-0 w-[60vh] h-[60vh] bg-bright-orange-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-[50vh] h-[50vh] bg-bright-orange-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-md mx-auto">
            {/* Logo and heading section */}
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center p-2 bg-bright-orange-500 rounded-lg shadow-glow mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2 text-white">Sign In to Legal Gram</h1>
              <p className="text-gray-300 max-w-sm mx-auto">
                Access your legal documents, consultations, and account information securely.
              </p>
            </div>
            
            {/* Login form card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-5">
                  {errorMessage && (
                    <Alert className="bg-red-900/20 border-red-700/30 text-red-200">
                      <Info className="h-4 w-4 text-red-300" />
                      <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                  )}
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email" 
                            placeholder="name@example.com"
                            className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Password</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              className="bg-white/20 border-white/30 pr-10 text-white placeholder:text-gray-400"
                              {...field}
                            />
                          </FormControl>
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-center justify-between">
                    <FormField
                      control={form.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="remember-me"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-white/40 data-[state=checked]:bg-bright-orange-500 data-[state=checked]:border-bright-orange-500"
                          />
                          <label 
                            htmlFor="remember-me" 
                            className="text-sm cursor-pointer text-gray-200 hover:text-white transition-colors"
                          >
                            Remember me
                          </label>
                        </div>
                      )}
                    />
                    
                    <button
                      type="button"
                      onClick={() => setShowResetDialog(true)}
                      className="text-bright-orange-300 text-sm hover:text-bright-orange-200 hover:underline transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-bright-orange-500 hover:bg-bright-orange-600 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing In
                      </span>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                  
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/20"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-deep-blue-900/50 text-gray-400">or</span>
                    </div>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <p className="text-gray-300">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-bright-orange-300 hover:text-bright-orange-200 hover:underline transition-colors font-medium">
                        Create an account
                      </Link>
                    </p>
                    
                    <p className="text-xs text-gray-400">
                      <Link to="/admin-login" className="hover:text-gray-300 transition-colors">
                        Admin Login
                      </Link>
                    </p>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reset your password</DialogTitle>
            <DialogDescription>
              Enter your email address and we'll send you a link to reset your password.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div className="space-y-2">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowResetDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={resetSubmitting}
              >
                {resetSubmitting ? "Sending..." : "Send Reset Link"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Login;
