
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
  SidebarInset
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
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="heading-sm mb-4">Welcome, {mockUser.firstName}!</h2>
              <p className="text-rocket-gray-600">
                Your current legal plan: <span className="font-semibold">{mockUser.plan}</span>
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-rocket-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium">Need legal advice?</h3>
                  <p className="text-sm mt-1 mb-3">Speak with a qualified lawyer today</p>
                  <button 
                    className="text-sm text-rocket-blue-600 font-medium" 
                    onClick={() => setActiveTab("advice")}
                  >
                    Get advice →
                  </button>
                </div>
                <div className="bg-rocket-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium">Schedule a consultation</h3>
                  <p className="text-sm mt-1 mb-3">Book time with one of our lawyers</p>
                  <button 
                    className="text-sm text-rocket-blue-600 font-medium" 
                    onClick={() => setActiveTab("schedule")}
                  >
                    Schedule now →
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="heading-sm mb-4">Recent Activity</h2>
              <p className="text-rocket-gray-500">No recent activity yet. As you use our services, your actions will appear here.</p>
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
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-rocket-blue-300 border-t-rocket-blue-600"></div>
      </div>
    );
  }

  return (
    <Layout>
      <SidebarProvider>
        <div className="flex h-full min-h-screen w-full">
          <Sidebar>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeTab === "dashboard"}
                    onClick={() => setActiveTab("dashboard")}
                    tooltip="Dashboard"
                  >
                    <Home />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeTab === "schedule"}
                    onClick={() => setActiveTab("schedule")}
                    tooltip="Schedule Meeting"
                  >
                    <Calendar />
                    <span>Schedule Meeting</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeTab === "advice"}
                    onClick={() => setActiveTab("advice")}
                    tooltip="Legal Advice"
                  >
                    <MessageCircle />
                    <span>Legal Advice</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeTab === "upgrade"}
                    onClick={() => setActiveTab("upgrade")}
                    tooltip="Plan Upgrade"
                  >
                    <CreditCard />
                    <span>Plan Upgrade</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeTab === "account"}
                    onClick={() => setActiveTab("account")}
                    tooltip="Account"
                  >
                    <User />
                    <span>Account</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
          
          <SidebarInset>
            <div className="container-custom py-8 md:py-12">
              {renderTabContent()}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </Layout>
  );
};

export default Dashboard;
