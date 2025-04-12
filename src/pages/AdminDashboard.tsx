
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import { redirectIfNotAdmin } from "@/utils/adminAuth";
import DashboardStats from "@/components/admin/DashboardStats";
import UserManagementTable from "@/components/admin/UserManagementTable";
import SubmissionsTable from "@/components/admin/SubmissionsTable";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      setIsLoading(true);
      const isAdmin = await redirectIfNotAdmin(navigate);
      setIsAuthorized(isAdmin);
      setIsLoading(false);
    };
    
    checkAdminStatus();
  }, [navigate]);
  
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
          <div className="bg-white dark:bg-rocket-gray-800 rounded-lg p-1 shadow-sm">
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
              <div className="bg-white dark:bg-rocket-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                <ul className="space-y-4">
                  <li className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">New user registered</p>
                      <p className="text-sm text-rocket-gray-500">Amy Wilson joined with Professional plan</p>
                    </div>
                    <span className="text-xs text-rocket-gray-500">2 hours ago</span>
                  </li>
                  <li className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">Document created</p>
                      <p className="text-sm text-rocket-gray-500">Will and Testament created by John Smith</p>
                    </div>
                    <span className="text-xs text-rocket-gray-500">5 hours ago</span>
                  </li>
                  <li className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">Payment received</p>
                      <p className="text-sm text-rocket-gray-500">Sarah Johnson renewed Premium subscription</p>
                    </div>
                    <span className="text-xs text-rocket-gray-500">Yesterday</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Lawyer consultation scheduled</p>
                      <p className="text-sm text-rocket-gray-500">Michael Brown scheduled call with Attorney Henderson</p>
                    </div>
                    <span className="text-xs text-rocket-gray-500">Yesterday</span>
                  </li>
                </ul>
              </div>
              
              {/* Quick actions section */}
              <div className="bg-white dark:bg-rocket-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">System Status</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="font-medium text-green-700 dark:text-green-300">Authentication Service</span>
                    </div>
                    <span className="text-sm text-green-600 dark:text-green-300">Operational</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="font-medium text-green-700 dark:text-green-300">Document Generation</span>
                    </div>
                    <span className="text-sm text-green-600 dark:text-green-300">Operational</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="font-medium text-green-700 dark:text-green-300">Payment Processing</span>
                    </div>
                    <span className="text-sm text-green-600 dark:text-green-300">Operational</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="font-medium text-yellow-700 dark:text-yellow-300">Email Notifications</span>
                    </div>
                    <span className="text-sm text-yellow-600 dark:text-yellow-300">Partial Outage</span>
                  </div>
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
