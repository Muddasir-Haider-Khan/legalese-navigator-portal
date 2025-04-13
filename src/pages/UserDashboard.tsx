
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import MakeDocuments from '@/components/dashboard/MakeDocuments';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  FileText, 
  User, 
  CreditCard, 
  MessageSquare, 
  Bell, 
  Home 
} from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar";

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

  // Dashboard navigation items
  const sidebarItems = [
    { icon: Home, label: "Dashboard", onClick: () => setActiveTab("documents") },
    { icon: User, label: "Profile", onClick: () => setActiveTab("profile") },
    { icon: CreditCard, label: "Payment", onClick: () => setActiveTab("payment") },
    { icon: FileText, label: "Documents", onClick: () => setActiveTab("documents") },
    { icon: MessageSquare, label: "Consultations", onClick: () => setActiveTab("consultations") },
    { icon: Bell, label: "Notifications", onClick: () => setActiveTab("notifications") },
  ];

  return (
    <div className="min-h-screen w-full">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          {/* Sidebar */}
          <Sidebar>
            <SidebarHeader className="border-b p-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div className="text-sm font-medium">{userName}</div>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {sidebarItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton 
                      onClick={item.onClick} 
                      isActive={activeTab === item.label.toLowerCase()}
                      tooltip={item.label}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
          
          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <div className="container-custom p-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold">Welcome to Legal Portal</h1>
                <p className="text-muted-foreground mt-2">
                  Manage your legal documents, consultations, and get expert advice.
                </p>
              </div>
              
              <div className="mb-8">
                <SidebarTrigger className="md:hidden mb-4" />
                
                {/* Dashboard Content based on active tab */}
                {activeTab === "documents" && (
                  <div>
                    <h2 className="text-2xl font-semibold mb-6">Your Documents</h2>
                    <MakeDocuments />
                  </div>
                )}
                
                {activeTab === "consultations" && (
                  <div>
                    <h2 className="text-2xl font-semibold mb-6">Your Consultations</h2>
                    <Card>
                      <CardContent className="p-6">
                        <p className="text-muted-foreground">
                          You don't have any active consultations. Schedule a meeting with a lawyer to get started.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                {activeTab === "profile" && (
                  <div>
                    <h2 className="text-2xl font-semibold mb-6">Your Profile</h2>
                    <Card>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-medium">Account Information</h3>
                            <p className="text-muted-foreground">
                              Email: {userName}@example.com
                            </p>
                            <p className="text-muted-foreground">
                              Member since: January 2025
                            </p>
                          </div>
                          <div>
                            <h3 className="text-lg font-medium">Subscription</h3>
                            <p className="text-muted-foreground">
                              Plan: Basic
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                {activeTab === "payment" && (
                  <div>
                    <h2 className="text-2xl font-semibold mb-6">Payment Information</h2>
                    <Card>
                      <CardContent className="p-6">
                        <p className="text-muted-foreground">
                          No payment methods on file. Add a payment method to access premium features.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                {activeTab === "notifications" && (
                  <div>
                    <h2 className="text-2xl font-semibold mb-6">Notifications</h2>
                    <Card>
                      <CardContent className="p-6">
                        <p className="text-muted-foreground">
                          You don't have any notifications at this time.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default UserDashboard;
