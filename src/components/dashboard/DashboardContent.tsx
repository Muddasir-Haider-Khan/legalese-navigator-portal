
import React from 'react';
import { PaymentInfo } from './PaymentInfo';
import { UserProfile } from './UserProfile';
import DocumentsPanel from './Documents/DocumentsPanel';
import ConsultationsPanel from './ConsultationsPanel';
import NotificationsPanel from './NotificationsPanel';

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
  if (activeTab === 'documents') {
    return <DocumentsPanel userEmail={userEmail} />;
  }
  
  if (activeTab === 'consultations') {
    return <ConsultationsPanel userEmail={userEmail} />;
  }
  
  if (activeTab === 'profile') {
    return (
      <UserProfile 
        email={userEmail}
        createdAt={userCreatedAt}
        firstName={userMetadata?.first_name}
        lastName={userMetadata?.last_name}
      />
    );
  }
  
  if (activeTab === 'payment') {
    return <PaymentInfo />;
  }
  
  if (activeTab === 'notifications') {
    return <NotificationsPanel />;
  }
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Unknown tab</h2>
      <p className="text-muted-foreground">The requested tab does not exist.</p>
    </div>
  );
};

export default DashboardContent;
