
import React from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import MakeDocuments from '@/components/dashboard/MakeDocuments';
import UserProfile from '@/components/dashboard/UserProfile';
import PaymentInfo from '@/components/dashboard/PaymentInfo';

interface DashboardContentProps {
  activeTab: string;
  userEmail: string;
  userCreatedAt: string;
  userMetadata: any;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ 
  activeTab,
  userEmail,
  userCreatedAt,
  userMetadata
}) => {
  return (
    <div className="mb-8">
      <SidebarTrigger className="md:hidden mb-4" />
      
      {activeTab === "documents" && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Your Documents</h2>
          <MakeDocuments />
        </div>
      )}
      
      {activeTab === "profile" && (
        <UserProfile 
          userEmail={userEmail}
          userCreatedAt={userCreatedAt}
          userMetadata={userMetadata}
        />
      )}
      
      {activeTab === "payment" && (
        <PaymentInfo />
      )}
    </div>
  );
};

export default DashboardContent;

