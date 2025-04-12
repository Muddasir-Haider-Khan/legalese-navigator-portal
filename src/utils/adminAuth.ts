
// Admin authentication utility functions
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Admin credentials
const ADMIN_EMAIL = "admin@legalgram.com";
const ADMIN_PASSWORD = "legalgram.admin"; // Store password for auto-creation

// Functions to check if current user is admin
export const isAdmin = async (): Promise<boolean> => {
  const { data } = await supabase.auth.getSession();
  
  if (!data.session) return false;
  
  // Check if the logged-in user has the admin email
  return data.session.user.email === ADMIN_EMAIL;
};

// Function to ensure admin user exists
const ensureAdminExists = async (): Promise<boolean> => {
  try {
    // Check if admin can sign in
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });
    
    // If sign in works, admin exists
    if (signInData.session) {
      // Sign out immediately since we're just checking existence
      await supabase.auth.signOut();
      return true;
    }
    
    // If error is not "Invalid login credentials", something else is wrong
    if (signInError && signInError.message !== "Invalid login credentials") {
      console.error("Admin check error:", signInError);
      return false;
    }
    
    // Admin doesn't exist, try to create it
    const { error: signUpError } = await supabase.auth.signUp({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });
    
    if (signUpError) {
      console.error("Failed to create admin user:", signUpError);
      return false;
    }
    
    console.log("Admin user created successfully");
    return true;
  } catch (error) {
    console.error("Admin user check/creation error:", error);
    return false;
  }
};

// Function to authenticate admin
export const loginAsAdmin = async (email: string, password: string): Promise<boolean> => {
  if (email !== ADMIN_EMAIL) {
    toast.error("Invalid admin credentials");
    return false;
  }
  
  try {
    // Ensure admin user exists in the database
    await ensureAdminExists();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("Admin authentication failed: " + error.message);
      return false;
    }
    
    toast.success("Admin login successful");
    return true;
  } catch (error) {
    console.error("Admin login error:", error);
    toast.error("An unexpected error occurred during admin login");
    return false;
  }
};

// Function to redirect if not admin
export const redirectIfNotAdmin = async (navigate: (path: string) => void): Promise<boolean> => {
  const adminStatus = await isAdmin();
  if (!adminStatus) {
    toast.error("Admin access required");
    navigate("/admin-login");
    return false;
  }
  return true;
};
