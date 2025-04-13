
import React from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import MakeDocuments from '@/components/dashboard/MakeDocuments';
import ScheduleMeeting from '@/components/dashboard/ScheduleMeeting';
import UserProfile from '@/components/dashboard/UserProfile';
import PaymentInfo from '@/components/dashboard/PaymentInfo';
import NotificationsPanel from '@/components/dashboard/NotificationsPanel';

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
      
      {activeTab === "consultations" && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Book a Consultation</h2>
          <ScheduleMeeting />
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
      
      {activeTab === "notifications" && (
        <NotificationsPanel />
      )}
    </div>
  );
};

export default DashboardContent;
