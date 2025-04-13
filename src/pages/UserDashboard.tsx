
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import MakeDocuments from '@/components/dashboard/MakeDocuments';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("documents");

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          setIsAuthenticated(true);
          // Get user's first name if available, otherwise use email
          const email = data.session.user.email || "";
          const firstName = data.session.user.user_metadata?.first_name;
          setUserName(firstName || email.split('@')[0] || "User");
          setIsLoaded(true);
        } else {
          // Redirect to login if not authenticated
          toast.error("Please log in to access your dashboard");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        toast.error("Authentication error. Please try again.");
        navigate("/login");
      }
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setIsAuthenticated(true);
          // Get user's first name if available, otherwise use email
          const email = session.user.email || "";
          const firstName = session.user.user_metadata?.first_name;
          setUserName(firstName || email.split('@')[0] || "User");
          setIsLoaded(true);
        } else {
          setIsAuthenticated(false);
          toast.error("You have been logged out");
          navigate("/login");
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, [navigate]);

  // If not loaded yet, show loading screen
  if (!isLoaded) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary/30 border-t-primary"></div>
      </div>
    );
  }

  // If not authenticated, don't render anything (will be redirected by useEffect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="heading-lg mb-2">Welcome back, {userName}</h1>
          <p className="text-rocket-gray-600 dark:text-rocket-gray-400">
            Manage your legal documents, consultations, and get expert advice.
          </p>
        </div>
        
        <div className="mb-6">
          <div className="flex space-x-2 border-b border-border pb-2">
            <button
              onClick={() => setActiveTab("documents")}
              className={`px-4 py-2 rounded-t-md ${
                activeTab === "documents"
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Documents
            </button>
            <button
              onClick={() => setActiveTab("consultations")}
              className={`px-4 py-2 rounded-t-md ${
                activeTab === "consultations"
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Consultations
            </button>
          </div>
        </div>
        
        <div className="space-y-8">
          {activeTab === "documents" && (
            <MakeDocuments />
          )}
          
          {activeTab === "consultations" && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Your Consultations</h2>
                <p className="text-muted-foreground">
                  You don't have any active consultations. Schedule a meeting with a lawyer to get started.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
