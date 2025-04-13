
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  FileText, 
  User, 
  CreditCard, 
  MessageSquare, 
  Bell, 
  Home,
  LogOut 
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
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import MakeDocuments from '@/components/dashboard/MakeDocuments';
import { Card, CardContent } from "@/components/ui/card";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("documents");
  const [userEmail, setUserEmail] = useState("");
  const [userCreatedAt, setUserCreatedAt] = useState("");
  const [userMetadata, setUserMetadata] = useState<any>(null);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error("Error logging out");
        return;
      }
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          const email = data.session.user.email || "";
          
          // Check if the current user is admin
          if (email === "admin@legalgram.com") {
            // Redirect to admin dashboard
            navigate("/admin-dashboard");
            return;
          }
          
          setIsAuthenticated(true);
          setUserEmail(email);
          
          // Format the created_at date to a readable format
          const createdAt = new Date(data.session.user.created_at);
          const createdAtFormatted = createdAt.toLocaleString('default', { 
            month: 'long', 
            year: 'numeric' 
          });
          setUserCreatedAt(createdAtFormatted);
          
          // Store user metadata
          setUserMetadata(data.session.user.user_metadata);
          
          // Set the user name
          const firstName = data.session.user.user_metadata?.first_name;
          setUserName(firstName || email.split('@')[0] || "User");
          
          setIsLoaded(true);
        } else {
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
          const email = session.user.email || "";
          
          // Check if the current user is admin
          if (email === "admin@legalgram.com") {
            // Redirect to admin dashboard
            navigate("/admin-dashboard");
            return;
          }
          
          setIsAuthenticated(true);
          setUserEmail(email);
          
          // Format the created_at date to a readable format
          const createdAt = new Date(session.user.created_at);
          const createdAtFormatted = createdAt.toLocaleString('default', { 
            month: 'long', 
            year: 'numeric' 
          });
          setUserCreatedAt(createdAtFormatted);
          
          // Store user metadata
          setUserMetadata(session.user.user_metadata);
          
          // Set the user name
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

  if (!isLoaded) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary/30 border-t-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const sidebarItems = [
    { icon: Home, label: "Dashboard", onClick: () => setActiveTab("documents") },
    { icon: User, label: "Profile", onClick: () => setActiveTab("profile") },
    { icon: CreditCard, label: "Payment", onClick: () => setActiveTab("payment") },
    { icon: FileText, label: "Documents", onClick: () => setActiveTab("documents") },
    { icon: MessageSquare, label: "Consultations", onClick: () => setActiveTab("consultations") },
    { icon: Bell, label: "Notifications", onClick: () => setActiveTab("notifications") },
  ];

  // Get full name from metadata
  const getFullName = () => {
    if (userMetadata) {
      const firstName = userMetadata.first_name || '';
      const lastName = userMetadata.last_name || '';
      if (firstName || lastName) {
        return `${firstName} ${lastName}`.trim();
      }
    }
    return userName;
  };

  return (
    <div className="min-h-screen w-full">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <Sidebar>
            <SidebarHeader className="border-b p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div className="text-sm font-medium">{userName}</div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleLogout}
                className="hover:bg-destructive/10"
                title="Logout"
              >
                <LogOut className="h-5 w-5 text-destructive" />
              </Button>
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
                              Email: {userEmail}
                            </p>
                            <p className="text-muted-foreground">
                              Member since: {userCreatedAt}
                            </p>
                            {userMetadata && (
                              <>
                                {userMetadata.first_name && (
                                  <p className="text-muted-foreground">
                                    First Name: {userMetadata.first_name}
                                  </p>
                                )}
                                {userMetadata.last_name && (
                                  <p className="text-muted-foreground">
                                    Last Name: {userMetadata.last_name}
                                  </p>
                                )}
                                {userMetadata.phone && (
                                  <p className="text-muted-foreground">
                                    Phone: {userMetadata.phone}
                                  </p>
                                )}
                              </>
                            )}
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
