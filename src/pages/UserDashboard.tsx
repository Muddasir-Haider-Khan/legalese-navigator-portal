
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Clock, FileCheck, FileText, MessageSquare } from 'lucide-react';
import Layout from "@/components/layout/Layout";
import LegalAdvice from '@/components/dashboard/LegalAdvice';
import ScheduleMeeting from '@/components/dashboard/ScheduleMeeting';
import PlanUpgrade from '@/components/dashboard/PlanUpgrade';

// Mock data
const recentDocuments = [
  { id: 1, name: "Last Will and Testament", created: "2023-07-15", status: "Completed" },
  { id: 2, name: "Non-Disclosure Agreement", created: "2023-07-18", status: "In Progress" },
  { id: 3, name: "Residential Lease", created: "2023-07-20", status: "Completed" },
];

const upcomingConsultations = [
  { id: 1, title: "Estate Planning Review", date: "2023-08-05", time: "10:00 AM", lawyer: "Sarah Henderson" },
  { id: 2, title: "Business Contract Review", date: "2023-08-12", time: "2:00 PM", lawyer: "Michael Lawson" },
];

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [userName, setUserName] = useState("User");
  const [isLoaded, setIsLoaded] = useState(false);

  // Simulate data loading
  useEffect(() => {
    // In a real app, we would fetch this data from the API
    setTimeout(() => {
      setUserName("John Smith");
      setIsLoaded(true);
    }, 500);
  }, []);

  return (
    <Layout>
      <div className="container-custom py-8">
        {!isLoaded ? (
          // Loading skeleton
          <div className="animate-pulse space-y-6">
            <div className="h-10 w-1/3 bg-rocket-gray-200 dark:bg-rocket-gray-700 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-40 bg-rocket-gray-200 dark:bg-rocket-gray-700 rounded"></div>
              <div className="h-40 bg-rocket-gray-200 dark:bg-rocket-gray-700 rounded"></div>
              <div className="h-40 bg-rocket-gray-200 dark:bg-rocket-gray-700 rounded"></div>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="heading-lg mb-2">Welcome back, {userName}</h1>
              <p className="text-rocket-gray-600 dark:text-rocket-gray-400">
                Manage your legal documents, consultations, and get expert advice.
              </p>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <div className="bg-white dark:bg-rocket-gray-800 rounded-lg p-1 shadow-sm">
                <TabsList className="grid grid-cols-4 gap-2">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="legal-advice">Legal Advice</TabsTrigger>
                  <TabsTrigger value="meetings">Schedule Meeting</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-rocket-blue-500" />
                        Recent Documents
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {recentDocuments.length > 0 ? (
                        <ul className="space-y-3">
                          {recentDocuments.map((doc) => (
                            <li key={doc.id} className="flex justify-between items-center text-sm border-b pb-2 last:border-b-0 last:pb-0">
                              <span className="font-medium">{doc.name}</span>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                doc.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                              }`}>
                                {doc.status}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-rocket-gray-500 text-sm">You haven't created any documents yet.</p>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Link to="/documents" className="w-full">
                        <Button variant="outline" className="w-full">
                          View All Documents
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-rocket-blue-500" />
                        Upcoming Consultations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {upcomingConsultations.length > 0 ? (
                        <ul className="space-y-3">
                          {upcomingConsultations.map((meeting) => (
                            <li key={meeting.id} className="border-b pb-2 last:border-b-0 last:pb-0">
                              <p className="font-medium text-sm">{meeting.title}</p>
                              <div className="flex justify-between text-xs text-rocket-gray-500 mt-1">
                                <span>{meeting.date}, {meeting.time}</span>
                                <span>with {meeting.lawyer}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-rocket-gray-500 text-sm">No upcoming consultations scheduled.</p>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={() => setActiveTab("meetings")}>
                        Schedule Meeting
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Your Plan</CardTitle>
                      <CardDescription>Basic Plan</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Documents Created</span>
                          <span className="text-sm font-medium">3 / 10</span>
                        </div>
                        <div className="h-2 bg-rocket-gray-200 dark:bg-rocket-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-rocket-blue-500" style={{ width: '30%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Legal Consultations</span>
                          <span className="text-sm font-medium">1 / 3</span>
                        </div>
                        <div className="h-2 bg-rocket-gray-200 dark:bg-rocket-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-rocket-blue-500" style={{ width: '33%' }}></div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" onClick={() => setActiveTab("upgrade")}>
                        Upgrade Plan <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <FileCheck className="h-5 w-5 mr-2 text-rocket-blue-500" />
                        Quick Document Generation
                      </CardTitle>
                      <CardDescription>Create commonly used legal documents in minutes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        {["Will & Testament", "Power of Attorney", "NDA", "Lease Agreement"].map((doc) => (
                          <Link to="/documents" key={doc}>
                            <Button variant="outline" className="w-full h-auto py-6 flex flex-col items-center">
                              <FileText className="h-6 w-6 mb-2" />
                              <span>{doc}</span>
                            </Button>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <MessageSquare className="h-5 w-5 mr-2 text-rocket-blue-500" />
                        Ask a Lawyer
                      </CardTitle>
                      <CardDescription>Get answers to your legal questions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-rocket-gray-600 dark:text-rocket-gray-400">
                        Our network of qualified attorneys is available to answer your specific legal questions. Submit your question and get a response within 24 hours.
                      </p>
                      <Button className="w-full" onClick={() => setActiveTab("legal-advice")}>
                        Ask Question
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="documents">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Documents</CardTitle>
                    <CardDescription>Manage your legal documents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to="/documents">
                      <Button className="mb-6">
                        <FileText className="mr-2 h-4 w-4" /> Create New Document
                      </Button>
                    </Link>
                    
                    {recentDocuments.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4 font-medium">Document Name</th>
                              <th className="text-left py-3 px-4 font-medium">Created Date</th>
                              <th className="text-left py-3 px-4 font-medium">Status</th>
                              <th className="text-left py-3 px-4 font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recentDocuments.map((doc) => (
                              <tr key={doc.id} className="border-b">
                                <td className="py-3 px-4">{doc.name}</td>
                                <td className="py-3 px-4">{doc.created}</td>
                                <td className="py-3 px-4">
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    doc.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                                  }`}>
                                    {doc.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex space-x-2">
                                    <Button variant="ghost" size="sm">View</Button>
                                    <Button variant="ghost" size="sm">Download</Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <FileText className="h-12 w-12 mx-auto text-rocket-gray-400" />
                        <h3 className="mt-4 text-lg font-medium">No Documents Found</h3>
                        <p className="mt-2 text-rocket-gray-500 dark:text-rocket-gray-400">
                          Get started by creating your first legal document.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="legal-advice">
                <LegalAdvice />
              </TabsContent>
              
              <TabsContent value="meetings">
                <ScheduleMeeting />
              </TabsContent>
              
              <TabsContent value="upgrade">
                <PlanUpgrade />
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </Layout>
  );
};

export default UserDashboard;
