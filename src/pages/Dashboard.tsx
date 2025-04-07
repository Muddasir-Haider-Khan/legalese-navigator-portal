
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  
  useEffect(() => {
    // Simulate getting user data
    // In a real app, this would be from auth context/state
    const simulatedUserEmail = sessionStorage.getItem("userEmail") || "user@example.com";
    const name = simulatedUserEmail.split("@")[0].split('.').map(
      part => part.charAt(0).toUpperCase() + part.slice(1)
    ).join(' ');
    setUserName(name);
    
    // Store for simulation purposes
    sessionStorage.setItem("userEmail", simulatedUserEmail);
  }, []);

  return (
    <Layout>
      <div className="container-custom py-16 md:py-20">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="heading-lg mb-2">Welcome to Your Dashboard</h1>
            <p className="text-lg text-rocket-gray-500">
              Hello, {userName}! You're successfully logged in.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-rocket-blue-50 p-6 rounded-lg">
              <h3 className="heading-sm mb-3">Your Legal Documents</h3>
              <p className="mb-4">You don't have any documents yet. Get started by creating your first legal document.</p>
              <Button>Create Document</Button>
            </div>
            
            <div className="bg-rocket-blue-50 p-6 rounded-lg">
              <h3 className="heading-sm mb-3">Ask a Lawyer</h3>
              <p className="mb-4">Have legal questions? Connect with one of our experienced lawyers.</p>
              <Button>Get Legal Advice</Button>
            </div>
          </div>
          
          <div className="mt-8 bg-rocket-gray-50 p-6 rounded-lg">
            <h3 className="heading-sm mb-3">Recent Activity</h3>
            <p className="text-rocket-gray-500">No recent activity yet. As you use our services, your actions will appear here.</p>
          </div>
          
          <div className="mt-8 text-center">
            <Button 
              variant="outline" 
              onClick={() => {
                sessionStorage.removeItem("userEmail");
                toast.success("Logged out successfully");
                window.location.href = "/";
              }}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
