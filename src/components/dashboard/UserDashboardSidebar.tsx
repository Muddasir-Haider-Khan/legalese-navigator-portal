
import React from 'react';
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { FileText, Calendar, User, CreditCard, Bell, LogOut } from "lucide-react";

interface UserDashboardSidebarProps {
  userName: string;
  handleLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const UserDashboardSidebar: React.FC<UserDashboardSidebarProps> = ({
  userName,
  handleLogout,
  activeTab,
  setActiveTab
}) => {
  return (
    <SidebarContent className="w-full">
      <div className="p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">
            {userName.charAt(0).toUpperCase()}
          </div>
          <h2 className="font-medium">{userName}</h2>
        </div>
        <div className="mt-8">
          <SidebarGroup>
            <SidebarGroupLabel>Manage</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => setActiveTab('documents')}
                  isActive={activeTab === 'documents'}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  <span>Documents</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => setActiveTab('consultations')}
                  isActive={activeTab === 'consultations'}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Consultations</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          
          <SidebarGroup className="mt-4">
            <SidebarGroupLabel>Personal</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => setActiveTab('profile')}
                  isActive={activeTab === 'profile'}
                >
                  <User className="h-4 w-4 mr-2" />
                  <span>Profile</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => setActiveTab('payment')}
                  isActive={activeTab === 'payment'}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  <span>Payment</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => setActiveTab('notifications')}
                  isActive={activeTab === 'notifications'}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  <span>Notifications</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          
          <SidebarGroup className="mt-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Log out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </div>
      </div>
    </SidebarContent>
  );
};

export default UserDashboardSidebar;
