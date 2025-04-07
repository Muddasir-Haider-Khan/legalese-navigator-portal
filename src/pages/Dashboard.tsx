
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Calendar, Home, Book, CreditCard, MessageCircle, User } from "lucide-react";
import ScheduleMeeting from "@/components/dashboard/ScheduleMeeting";
import LegalAdvice from "@/components/dashboard/LegalAdvice";
import PlanUpgrade from "@/components/dashboard/PlanUpgrade";
import AccountInfo from "@/components/dashboard/AccountInfo";

// Mock user data (in a real app, this would come from Supabase/auth)
const mockUser = {
  firstName: "User",
  lastName: "Smith",
  email: "user@example.com",
  phone: "+1 (555) 123-4567",
  isAuthenticated: true,
  plan: "Basic"
};

type TabType = "dashboard" | "schedule" | "advice" | "upgrade" | "account";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // In real app, would check auth status
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const navigate = useNavigate();
  
  useEffect(() => {
    // In a real app with Supabase, we would check if user is authenticated
    // For now, we're using mock data
    if (!mockUser.isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSignOut = async () => {
    // In a real app with Supabase, we would sign out the user
    toast.success("Logged out successfully");
    navigate("/");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight">Welcome, {mockUser.firstName}!</h1>
              <div className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {mockUser.plan} Plan
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 shadow-sm">
                <h3 className="text-lg font-semibold text-blue-800">Need legal advice?</h3>
                <p className="text-blue-600 mt-1 mb-4">Speak with a qualified lawyer today</p>
                <button 
                  className="text-sm font-medium flex items-center text-blue-700 hover:text-blue-800 transition-colors"
                  onClick={() => setActiveTab("advice")}
                >
                  Get advice
                  <svg className="ml-1 h-4 w-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100 shadow-sm">
                <h3 className="text-lg font-semibold text-purple-800">Schedule a consultation</h3>
                <p className="text-purple-600 mt-1 mb-4">Book time with one of our lawyers</p>
                <button 
                  className="text-sm font-medium flex items-center text-purple-700 hover:text-purple-800 transition-colors"
                  onClick={() => setActiveTab("schedule")}
                >
                  Schedule now
                  <svg className="ml-1 h-4 w-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="flex items-center justify-center h-32 bg-muted/40 rounded-lg border border-dashed">
                <p className="text-muted-foreground">No recent activity yet. As you use our services, your actions will appear here.</p>
              </div>
            </div>
          </div>
        );
      case "schedule":
        return <ScheduleMeeting />;
      case "advice":
        return <LegalAdvice />;
      case "upgrade":
        return <PlanUpgrade />;
      case "account":
        return <AccountInfo user={mockUser} onSignOut={handleSignOut} />;
      default:
        return null;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary/30 border-t-primary"></div>
      </div>
    );
  }

  return (
    <Layout>
      <SidebarProvider>
        <div className="flex h-full min-h-screen w-full">
          <Sidebar>
            <SidebarContent>
              <div className="px-3 py-4">
                <div className="mb-6 px-2 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Legal Dashboard</h2>
                  <SidebarTrigger />
                </div>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeTab === "dashboard"}
                      onClick={() => setActiveTab("dashboard")}
                      tooltip="Dashboard"
                      className="w-full"
                    >
                      <Home className="h-4 w-4" />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeTab === "schedule"}
                      onClick={() => setActiveTab("schedule")}
                      tooltip="Schedule Meeting"
                      className="w-full"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Schedule Meeting</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeTab === "advice"}
                      onClick={() => setActiveTab("advice")}
                      tooltip="Legal Advice"
                      className="w-full"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Legal Advice</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeTab === "upgrade"}
                      onClick={() => setActiveTab("upgrade")}
                      tooltip="Plan Upgrade"
                      className="w-full"
                    >
                      <CreditCard className="h-4 w-4" />
                      <span>Plan Upgrade</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeTab === "account"}
                      onClick={() => setActiveTab("account")}
                      tooltip="Account"
                      className="w-full"
                    >
                      <User className="h-4 w-4" />
                      <span>Account</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </div>
            </SidebarContent>
          </Sidebar>
          
          <SidebarInset>
            <div className="container mx-auto max-w-6xl py-6 px-4 md:px-8 md:py-8">
              {renderTabContent()}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </Layout>
  );
};

export default Dashboard;
