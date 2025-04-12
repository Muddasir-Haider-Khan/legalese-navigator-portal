
// Admin authentication utility functions
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Admin credentials
const ADMIN_EMAIL = "admin@legalgram.com";

// Functions to check if current user is admin
export const isAdmin = async (): Promise<boolean> => {
  const { data } = await supabase.auth.getSession();
  
  if (!data.session) return false;
  
  // Check if the logged-in user has the admin email
  return data.session.user.email === ADMIN_EMAIL;
};

// Function to authenticate admin
export const loginAsAdmin = async (email: string, password: string): Promise<boolean> => {
  if (email !== ADMIN_EMAIL) {
    toast.error("Invalid admin credentials");
    return false;
  }
  
  try {
    const { error } = await supabase.auth.signInWithPassword({
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
