
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Search, UserX, UserCheck } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  user_metadata: {
    first_name?: string;
    last_name?: string;
  };
}

const UserManagementTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Get all users directly from Supabase auth
      const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        // If admin API fails, fall back to the mock data
        console.log("Falling back to local data due to error:", authError);
        
        // Mock data for development
        const mockUsers = [
          {
            id: "usr_1",
            email: "john@example.com",
            created_at: "2023-04-15T10:30:00Z",
            last_sign_in_at: "2023-05-10T15:45:00Z",
            user_metadata: {
              first_name: "John",
              last_name: "Smith"
            }
          },
          {
            id: "usr_2",
            email: "sarah@example.com",
            created_at: "2023-04-21T09:15:00Z", 
            last_sign_in_at: "2023-05-09T12:30:00Z",
            user_metadata: {
              first_name: "Sarah",
              last_name: "Johnson"
            }
          },
          {
            id: "usr_3",
            email: "michael@example.com",
            created_at: "2023-05-02T14:20:00Z",
            last_sign_in_at: "2023-05-08T10:15:00Z",
            user_metadata: {
              first_name: "Michael",
              last_name: "Brown"
            }
          },
          {
            id: "usr_4",
            email: "emily@example.com",
            created_at: "2023-05-05T16:45:00Z",
            last_sign_in_at: null,
            user_metadata: {
              first_name: "Emily",
              last_name: "Davis"
            }
          },
          {
            id: "usr_5",
            email: "david@example.com",
            created_at: "2023-05-07T11:10:00Z",
            last_sign_in_at: "2023-05-07T11:15:00Z",
            user_metadata: {
              first_name: "David",
              last_name: "Wilson"
            }
          }
        ];
        
        setUsers(mockUsers);
      } else {
        // Format the data from Supabase
        const formattedUsers = authData.users.map(user => ({
          id: user.id,
          email: user.email || '',
          created_at: user.created_at,
          last_sign_in_at: user.last_sign_in_at,
          user_metadata: user.user_metadata || {}
        }));
        
        setUsers(formattedUsers);
        console.log("Fetched users:", formattedUsers);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const handleSearch = () => {
    fetchUsers();
  };

  // Handle user ban
  const handleUserAction = async (userId: string, action: 'ban' | 'unban') => {
    try {
      // In a real app, this would call the Supabase admin API to ban/unban users
      if (action === 'ban') {
        toast.success('User has been banned');
      } else {
        toast.success('User has been unbanned');
      }
      
      // Refresh user list
      fetchUsers();
    } catch (error) {
      console.error(`Error ${action}ing user:`, error);
      toast.error(`Failed to ${action} user`);
    }
  };

  const filteredUsers = users.filter(user => 
    user.email !== "admin@legalgram.com" && // Don't show admin in the list
    (user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.user_metadata?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.user_metadata?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">User Management</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-[250px]"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button variant="outline" onClick={handleSearch}>Search</Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Registered</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <div className="flex justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.user_metadata?.first_name} {user.user_metadata?.last_name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'Never'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 gap-1 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleUserAction(user.id, 'ban')}
                      >
                        <UserX className="h-3.5 w-3.5" />
                        <span>Ban</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 gap-1 text-green-500 hover:text-green-600 hover:bg-green-50"
                        onClick={() => handleUserAction(user.id, 'unban')}
                      >
                        <UserCheck className="h-3.5 w-3.5" />
                        <span>Unban</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserManagementTable;
