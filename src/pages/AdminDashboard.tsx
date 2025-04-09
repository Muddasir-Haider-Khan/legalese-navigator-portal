
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BarChart, LineChart, PieChart } from "@/components/ui/chart";
import { AlertCircle, BarChart3, Download, FileText, PieChart as PieChartIcon, Search, Users } from "lucide-react";
import Layout from "@/components/layout/Layout";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Mock data for charts
  const userRegistrationData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'New Users',
        data: [65, 78, 90, 120, 145, 132, 170],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
      },
    ],
  };

  const documentCreationData = {
    labels: ['Will', 'NDA', 'Lease', 'Contract', 'Power of Attorney'],
    datasets: [
      {
        label: 'Documents Created',
        data: [42, 38, 35, 27, 22],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Mock data for users
  const users = [
    { id: 1, name: "John Smith", email: "john@example.com", plan: "Premium", status: "Active", joined: "2023-04-15" },
    { id: 2, name: "Sarah Johnson", email: "sarah@example.com", plan: "Basic", status: "Active", joined: "2023-05-21" },
    { id: 3, name: "Michael Brown", email: "michael@example.com", plan: "Professional", status: "Active", joined: "2023-06-08" },
    { id: 4, name: "Emily Davis", email: "emily@example.com", plan: "Basic", status: "Inactive", joined: "2023-03-12" },
    { id: 5, name: "David Wilson", email: "david@example.com", plan: "Premium", status: "Active", joined: "2023-07-30" },
  ];
  
  // Mock data for documents
  const documents = [
    { id: 101, name: "Last Will and Testament", user: "John Smith", created: "2023-07-15", status: "Completed" },
    { id: 102, name: "Non-Disclosure Agreement", user: "Sarah Johnson", created: "2023-07-18", status: "Pending" },
    { id: 103, name: "Residential Lease", user: "Michael Brown", created: "2023-07-20", status: "Completed" },
    { id: 104, name: "Employment Contract", user: "Emily Davis", created: "2023-07-22", status: "Draft" },
    { id: 105, name: "Power of Attorney", user: "David Wilson", created: "2023-07-25", status: "Completed" },
  ];

  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="heading-lg mb-6">Admin Dashboard</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="bg-white dark:bg-rocket-gray-800 rounded-lg p-1 shadow-sm">
            <TabsList className="grid grid-cols-4 gap-2">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
          </div>
          
          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-rocket-gray-500">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-rocket-blue-500 mr-2" />
                    <span className="text-2xl font-bold">2,543</span>
                  </div>
                  <p className="text-xs text-green-600 mt-2">+12% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-rocket-gray-500">Documents Created</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-rocket-blue-500 mr-2" />
                    <span className="text-2xl font-bold">8,729</span>
                  </div>
                  <p className="text-xs text-green-600 mt-2">+8% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-rocket-gray-500">Premium Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-rocket-blue-500 mr-2" />
                    <span className="text-2xl font-bold">843</span>
                  </div>
                  <p className="text-xs text-green-600 mt-2">+15% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-rocket-gray-500">Revenue (Monthly)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold">$24,950</span>
                  </div>
                  <p className="text-xs text-green-600 mt-2">+10% from last month</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    User Registration Trends
                  </CardTitle>
                  <CardDescription>New user signups over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <LineChart className="h-[300px]" data={userRegistrationData} />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChartIcon className="h-5 w-5 mr-2" />
                    Document Types
                  </CardTitle>
                  <CardDescription>Distribution of document templates</CardDescription>
                </CardHeader>
                <CardContent>
                  <PieChart className="h-[300px]" data={documentCreationData} />
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions and events</CardDescription>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-rocket-gray-400" />
                  <Input placeholder="Search users..." className="pl-9 w-[300px]" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Plans</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" /> Export
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-rocket-gray-50 dark:bg-rocket-gray-800/50 text-left">
                        <th className="p-4 font-medium">ID</th>
                        <th className="p-4 font-medium">Name</th>
                        <th className="p-4 font-medium">Email</th>
                        <th className="p-4 font-medium">Plan</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium">Joined</th>
                        <th className="p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b">
                          <td className="p-4">#{user.id}</td>
                          <td className="p-4 font-medium">{user.name}</td>
                          <td className="p-4">{user.email}</td>
                          <td className="p-4">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                              user.plan === 'Premium' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300' :
                              user.plan === 'Professional' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' :
                              'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                            }`}>
                              {user.plan}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                              user.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                              'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="p-4 text-rocket-gray-500">{user.joined}</td>
                          <td className="p-4">
                            <Button variant="ghost" size="sm">Edit</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-rocket-gray-400" />
                  <Input placeholder="Search documents..." className="pl-9 w-[300px]" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" /> Export
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-rocket-gray-50 dark:bg-rocket-gray-800/50 text-left">
                        <th className="p-4 font-medium">ID</th>
                        <th className="p-4 font-medium">Document</th>
                        <th className="p-4 font-medium">User</th>
                        <th className="p-4 font-medium">Created</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.map((doc) => (
                        <tr key={doc.id} className="border-b">
                          <td className="p-4">#{doc.id}</td>
                          <td className="p-4 font-medium">{doc.name}</td>
                          <td className="p-4">{doc.user}</td>
                          <td className="p-4 text-rocket-gray-500">{doc.created}</td>
                          <td className="p-4">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                              doc.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                              doc.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
                              'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                            }`}>
                              {doc.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <Button variant="ghost" size="sm">View</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure global settings for the application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Site Configuration</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1">Site Name</label>
                      <Input defaultValue="Rocket Lawyer" />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Support Email</label>
                      <Input defaultValue="support@rocketlawyer.com" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Security</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1">Password Policy</label>
                      <Select defaultValue="strong">
                        <SelectTrigger>
                          <SelectValue placeholder="Select policy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                          <SelectItem value="moderate">Moderate (8+ with numbers)</SelectItem>
                          <SelectItem value="strong">Strong (8+ with numbers and symbols)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Session Timeout</label>
                      <Select defaultValue="30">
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeout" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="240">4 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <Alert className="bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800">
                  <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  <AlertTitle className="text-yellow-600 dark:text-yellow-400">Warning</AlertTitle>
                  <AlertDescription className="text-yellow-700 dark:text-yellow-300">
                    Changing these settings will affect all users on the platform. Make changes carefully.
                  </AlertDescription>
                </Alert>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
