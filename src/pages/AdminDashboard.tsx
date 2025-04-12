
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import { redirectIfNotAdmin } from "@/utils/adminAuth";
import DashboardStats from "@/components/admin/DashboardStats";
import UserManagementTable from "@/components/admin/UserManagementTable";
import SubmissionsTable from "@/components/admin/SubmissionsTable";
import { supabase } from "@/integrations/supabase/client";

interface ActivityItem {
  id: string;
  activity_type: string;
  description: string;
  user_name: string | null;
  details: string | null;
  created_at: string;
}

interface SystemStatus {
  id: string;
  service_name: string;
  status: string;
  last_updated: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [systemStatus, setSystemStatus] = useState<SystemStatus[]>([]);
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      setIsLoading(true);
      const isAdmin = await redirectIfNotAdmin(navigate);
      setIsAuthorized(isAdmin);
      
      if (isAdmin) {
        // Fetch dashboard data directly from tables
        try {
          console.log("Fetching dashboard data...");
          
          // Fetch recent activity
          const { data: activityData, error: activityError } = await supabase
            .from('activity_log')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5);
            
          if (activityError) {
            console.error("Activity fetch error:", activityError);
            throw activityError;
          }
          
          console.log("Activity data received:", activityData);
          if (activityData) {
            setRecentActivity(activityData);
          }
          
          // Fetch system status
          const { data: statusData, error: statusError } = await supabase
            .from('system_status')
            .select('*');
            
          if (statusError) {
            console.error("Status fetch error:", statusError);
            throw statusError;
          }
          
          console.log("Status data received:", statusData);
          if (statusData) {
            setSystemStatus(statusData);
          }
          
          // Alternatively, we could use the DB function
          // const { data, error } = await supabase.rpc('get_dashboard_data');
          // if (error) throw error;
          // if (data) {
          //   setRecentActivity(data.activities || []);
          //   setSystemStatus(data.status || []);
          // }
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
          toast.error("Failed to load some dashboard data");
        }
      }
      
      setIsLoading(false);
    };
    
    checkAdminStatus();
  }, [navigate]);
  
  // Format relative time
  const getRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffDay > 0) {
      return diffDay === 1 ? "Yesterday" : `${diffDay} days ago`;
    } else if (diffHour > 0) {
      return `${diffHour} ${diffHour === 1 ? "hour" : "hours"} ago`;
    } else if (diffMin > 0) {
      return `${diffMin} ${diffMin === 1 ? "minute" : "minutes"} ago`;
    } else {
      return "Just now";
    }
  };
  
  // Get CSS classes for status
  const getStatusClasses = (status: string) => {
    switch(status) {
      case "Operational":
        return {
          bg: "bg-rocket-gray-800 dark:bg-rocket-gray-800",
          text: "text-green-400",
          dot: "bg-green-400"
        };
      case "Partial Outage":
        return {
          bg: "bg-rocket-gray-800 dark:bg-rocket-gray-800",
          text: "text-yellow-400",
          dot: "bg-yellow-400"
        };
      case "Major Outage":
        return {
          bg: "bg-rocket-gray-800 dark:bg-rocket-gray-800",
          text: "text-red-400",
          dot: "bg-red-400"
        };
      default:
        return {
          bg: "bg-rocket-gray-800 dark:bg-rocket-gray-800",
          text: "text-gray-400",
          dot: "bg-gray-400"
        };
    }
  };
  
  // If loading, show loading screen
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary/30 border-t-primary"></div>
      </div>
    );
  }
  
  // If not authorized, redirect is handled by the redirectIfNotAdmin function
  if (!isAuthorized) {
    return null;
  }

  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="heading-lg mb-6">Admin Dashboard</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="bg-rocket-gray-800 rounded-lg p-1 shadow-sm">
            <TabsList className="grid grid-cols-3 gap-2">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
            </TabsList>
          </div>
          
          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <DashboardStats />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Recent activity section */}
              <div className="bg-rocket-gray-800 p-6 rounded-lg shadow-sm text-white">
                <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                <ul className="space-y-4">
                  {recentActivity.length === 0 && isLoading ? (
                    // Loading skeleton for activity
                    Array(4).fill(0).map((_, i) => (
                      <li key={i} className="flex items-center justify-between border-b border-gray-700 pb-2">
                        <div className="w-full">
                          <div className="h-5 bg-rocket-gray-700 rounded w-1/3 animate-pulse mb-2"></div>
                          <div className="h-4 bg-rocket-gray-700 rounded w-2/3 animate-pulse"></div>
                        </div>
                        <div className="h-4 bg-rocket-gray-700 rounded w-16 animate-pulse"></div>
                      </li>
                    ))
                  ) : recentActivity.length === 0 ? (
                    <li className="text-center py-4 text-gray-400">No recent activity</li>
                  ) : (
                    recentActivity.map((activity) => (
                      <li key={activity.id} className="flex items-center justify-between border-b border-gray-700 pb-2">
                        <div>
                          <p className="font-medium">{activity.description}</p>
                          <p className="text-sm text-gray-400">
                            {activity.user_name && `${activity.user_name} `}
                            {activity.details}
                          </p>
                        </div>
                        <span className="text-xs text-gray-400">
                          {getRelativeTime(activity.created_at)}
                        </span>
                      </li>
                    ))
                  )}
                </ul>
              </div>
              
              {/* System status section */}
              <div className="bg-rocket-gray-800 p-6 rounded-lg shadow-sm text-white">
                <h3 className="text-lg font-medium mb-4">System Status</h3>
                <div className="space-y-4">
                  {systemStatus.length === 0 && isLoading ? (
                    // Loading skeleton for status
                    Array(4).fill(0).map((_, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-rocket-gray-700 rounded-md">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                          <div className="h-5 w-28 bg-rocket-gray-600 rounded animate-pulse"></div>
                        </div>
                        <div className="h-4 w-24 bg-rocket-gray-600 rounded animate-pulse"></div>
                      </div>
                    ))
                  ) : systemStatus.length === 0 ? (
                    <div className="text-center py-4 text-gray-400">No system status data</div>
                  ) : (
                    systemStatus.map((status) => {
                      const statusClasses = getStatusClasses(status.status);
                      return (
                        <div 
                          key={status.id} 
                          className={`flex justify-between items-center p-3 ${statusClasses.bg} rounded-md border border-gray-700`}
                        >
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full ${statusClasses.dot} mr-2`}></div>
                            <span className="font-medium text-white">{status.service_name}</span>
                          </div>
                          <span className={`text-sm ${statusClasses.text}`}>{status.status}</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Users Tab */}
          <TabsContent value="users">
            <UserManagementTable />
          </TabsContent>
          
          {/* Submissions Tab */}
          <TabsContent value="submissions">
            <SubmissionsTable />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
