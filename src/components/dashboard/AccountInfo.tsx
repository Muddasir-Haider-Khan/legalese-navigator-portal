
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Lock, CreditCard } from "lucide-react";

interface AccountInfoProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    plan: string;
  };
  onSignOut: () => void;
}

const AccountInfo = ({ user, onSignOut }: AccountInfoProps) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleUpdateProfile = () => {
    // In a real app, we would send this data to the backend
    toast.success("Profile updated successfully!");
  };

  const handleUpdatePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    // In a real app, we would send this data to the backend
    toast.success("Password updated successfully!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div>
      <h1 className="heading-lg mb-2">Account Settings</h1>
      <p className="text-rocket-gray-500 mb-6">
        Manage your account information and settings.
      </p>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="password">
            <Lock className="mr-2 h-4 w-4" />
            Password
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="heading-sm mb-4">Personal Information</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-6">
              <Button onClick={handleUpdateProfile}>
                Update Profile
              </Button>
              
              <Button variant="outline" onClick={onSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="password" className="mt-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="heading-sm mb-4">Change Password</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Current Password</label>
                <Input
                  name="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">New Password</label>
                <Input
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                <Input
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
            
            <Button onClick={handleUpdatePassword} className="mt-6">
              Update Password
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="billing" className="mt-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="heading-sm mb-4">Billing Information</h2>
            
            <div className="mb-6">
              <p>Current Plan: <span className="font-semibold">{user.plan}</span></p>
              <p className="text-rocket-gray-500 text-sm mt-1">Your plan renews on April 15, 2025</p>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-4">
              <h3 className="font-medium mb-2">Payment Method</h3>
              <p className="text-rocket-gray-500">No payment methods added yet.</p>
              <Button variant="outline" className="mt-3">
                Add Payment Method
              </Button>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-medium mb-2">Billing History</h3>
              <p className="text-rocket-gray-500">No billing history available yet.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountInfo;
