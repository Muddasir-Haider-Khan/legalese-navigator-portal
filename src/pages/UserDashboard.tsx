
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, FileText, MessageSquare } from 'lucide-react';
import Layout from "@/components/layout/Layout";
import LegalAdvice from '@/components/dashboard/LegalAdvice';
import ScheduleMeeting from '@/components/dashboard/ScheduleMeeting';
import PlanUpgrade from '@/components/dashboard/PlanUpgrade';
import { supabase } from "@/integrations/supabase/client";
import MakeDocuments from '@/components/dashboard/MakeDocuments';
import AskLawyer from '@/components/dashboard/AskLawyer';
import Articles from '@/components/dashboard/Articles';
import Contact from '@/components/dashboard/Contact';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("make-documents");
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
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="bg-white dark:bg-rocket-gray-800 rounded-lg p-1 shadow-sm overflow-x-auto">
            <TabsList className="inline-flex min-w-max">
              <TabsTrigger value="make-documents">Make Documents</TabsTrigger>
              <TabsTrigger value="ask-lawyer">Ask a Lawyer</TabsTrigger>
              <TabsTrigger value="legal-advice">Legal Advice</TabsTrigger>
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="contact">Contact Us</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="make-documents">
            <MakeDocuments />
          </TabsContent>

          <TabsContent value="ask-lawyer">
            <AskLawyer />
          </TabsContent>
          
          <TabsContent value="legal-advice">
            <LegalAdvice />
          </TabsContent>

          <TabsContent value="articles">
            <Articles />
          </TabsContent>

          <TabsContent value="contact">
            <Contact />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default UserDashboard;
