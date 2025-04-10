
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import MakeDocuments from '@/components/dashboard/MakeDocuments';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          setIsAuthenticated(true);
          setUserName(data.session.user.email?.split('@')[0] || "User");
          setIsLoaded(true);
        } else {
          // Redirect to login if not authenticated
          navigate("/login");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        navigate("/login");
      }
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setIsAuthenticated(true);
          setUserName(session.user.email?.split('@')[0] || "User");
          setIsLoaded(true);
        } else {
          setIsAuthenticated(false);
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
        
        {/* Content section - directly showing MakeDocuments by default */}
        <div className="space-y-8">
          <MakeDocuments />
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
