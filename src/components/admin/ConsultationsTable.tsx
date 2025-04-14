import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Search, Calendar, CheckCircle, XCircle, Phone, User, RefreshCw, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Consultation {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  user_id: string | null;
}

const ConsultationsTable = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("all");
  
  useEffect(() => {
    console.log("ConsultationsTable component mounted, fetching data...");
    fetchConsultations();
  }, [filterStatus]);
  
  const fetchConsultations = async () => {
    setLoading(true);
    console.log("Fetching consultations from Supabase...");
    
    try {
      let query = supabase
        .from('consultations')
        .select('*')
        
      if (filterStatus !== "all") {
        query = query.eq('status', filterStatus);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
        
      if (error) {
        console.error('Error fetching consultations:', error);
        toast.error('Failed to load consultations');
        setLoading(false);
        return;
      }

      console.log("Consultations fetched:", data);
      setConsultations(data || []);
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      fetchConsultations();
      return;
    }
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    const filtered = consultations.filter(item => 
      item.name.toLowerCase().includes(lowerSearchTerm) || 
      item.email.toLowerCase().includes(lowerSearchTerm) ||
      (item.phone && item.phone.toLowerCase().includes(lowerSearchTerm)) ||
      item.message.toLowerCase().includes(lowerSearchTerm)
    );
    
    setConsultations(filtered);
  };

  const createNotification = async (userId: string, title: string, message: string) => {
    if (!userId) return;
    
    try {
      const { error } = await supabase
        .from('notifications')
        .insert({
          user_id: userId,
          title,
          message,
          is_read: false
        });
        
      if (error) {
        console.error('Error creating notification:', error);
        return;
      }
      
      console.log(`Notification created for user ${userId}`);
    } catch (error) {
      console.error('Unexpected error creating notification:', error);
    }
  };

  const updateConsultationStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const { data: consultationData, error: fetchError } = await supabase
        .from('consultations')
        .select('*')
        .eq('id', id)
        .single();
        
      if (fetchError) {
        console.error('Error fetching consultation:', fetchError);
        toast.error('Failed to update consultation status');
        return;
      }
      
      const { error } = await supabase
        .from('consultations')
        .update({ status })
        .eq('id', id);
      
      if (error) {
        console.error('Error updating consultation status:', error);
        toast.error('Failed to update consultation status');
        return;
      }
      
      if (consultationData && consultationData.user_id) {
        const title = status === 'approved' 
          ? 'Consultation Approved' 
          : 'Consultation Rejected';
          
        const message = status === 'approved'
          ? `Your consultation request regarding "${consultationData.message.substring(0, 30)}${consultationData.message.length > 30 ? '...' : ''}" has been approved.`
          : `Your consultation request regarding "${consultationData.message.substring(0, 30)}${consultationData.message.length > 30 ? '...' : ''}" has been rejected.`;
          
        await createNotification(consultationData.user_id, title, message);
      }
      
      setConsultations(prev => 
        prev.map(item => 
          item.id === id ? { ...item, status } : item
        )
      );
      
      if (selectedConsultation && selectedConsultation.id === id) {
        setSelectedConsultation({ ...selectedConsultation, status });
      }
      
      toast.success(`Consultation ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
      
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred');
    }
  };

  const deleteConsultation = async (id: string) => {
    try {
      const { error } = await supabase
        .from('consultations')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting consultation:', error);
        toast.error('Failed to delete consultation');
        return;
      }
      
      setConsultations(prev => prev.filter(item => item.id !== id));
      
      toast.success('Consultation deleted successfully');
      
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Consultation Requests</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search consultations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-[250px]"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button variant="outline" onClick={handleSearch}>Search</Button>
          <Button 
            variant="outline" 
            onClick={fetchConsultations} 
            className="gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <Button 
          variant={filterStatus === "all" ? "default" : "outline"} 
          size="sm" 
          onClick={() => setFilterStatus("all")}
        >
          All
        </Button>
        <Button 
          variant={filterStatus === "pending" ? "default" : "outline"} 
          size="sm" 
          onClick={() => setFilterStatus("pending")}
          className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200"
        >
          Pending
        </Button>
        <Button 
          variant={filterStatus === "approved" ? "default" : "outline"} 
          size="sm" 
          onClick={() => setFilterStatus("approved")}
          className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200"
        >
          Approved
        </Button>
        <Button 
          variant={filterStatus === "rejected" ? "default" : "outline"} 
          size="sm" 
          onClick={() => setFilterStatus("rejected")}
          className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200"
        >
          Rejected
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Request</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : consultations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No consultation requests found
                </TableCell>
              </TableRow>
            ) : (
              consultations.map((consultation) => (
                <TableRow key={consultation.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      {consultation.name}
                    </div>
                  </TableCell>
                  <TableCell>{consultation.email}</TableCell>
                  <TableCell>{consultation.phone || "N/A"}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {consultation.message.substring(0, 40) + (consultation.message.length > 40 ? '...' : '')}
                  </TableCell>
                  <TableCell>{formatDate(consultation.created_at)}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        consultation.status === "pending" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" :
                        consultation.status === "approved" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                        "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                      variant="outline"
                    >
                      {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 gap-1"
                            onClick={() => setSelectedConsultation(consultation)}
                          >
                            <Calendar className="h-3.5 w-3.5" />
                            <span>View</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          {selectedConsultation && (
                            <>
                              <DialogHeader>
                                <DialogTitle>Consultation Request</DialogTitle>
                                <DialogDescription>
                                  From {selectedConsultation.name}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 mt-4">
                                <div>
                                  <span className="text-sm font-medium">Name:</span>
                                  <p className="flex items-center mt-1">
                                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                                    {selectedConsultation.name}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-sm font-medium">Email:</span>
                                  <p>{selectedConsultation.email}</p>
                                </div>
                                <div>
                                  <span className="text-sm font-medium">Phone:</span>
                                  <p className="flex items-center mt-1">
                                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                                    {selectedConsultation.phone || 'Not provided'}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-sm font-medium">Request:</span>
                                  <p className="mt-1 p-3 bg-muted rounded-md">{selectedConsultation.message}</p>
                                </div>
                                <div>
                                  <span className="text-sm font-medium">Date:</span>
                                  <p>{formatDate(selectedConsultation.created_at)}</p>
                                </div>
                                <div>
                                  <span className="text-sm font-medium">Status:</span>
                                  <p>{selectedConsultation.status.charAt(0).toUpperCase() + selectedConsultation.status.slice(1)}</p>
                                </div>
                                <div className="flex justify-end gap-2 mt-4">
                                  <Button
                                    variant="outline"
                                    className="gap-1 text-red-500 hover:bg-red-50 hover:text-red-600"
                                    onClick={() => {
                                      updateConsultationStatus(selectedConsultation.id, 'rejected');
                                    }}
                                    disabled={selectedConsultation.status === 'rejected'}
                                  >
                                    <XCircle className="h-4 w-4" />
                                    <span>Reject</span>
                                  </Button>
                                  <Button
                                    className="gap-1"
                                    onClick={() => {
                                      updateConsultationStatus(selectedConsultation.id, 'approved');
                                    }}
                                    disabled={selectedConsultation.status === 'approved'}
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                    <span>Approve</span>
                                  </Button>
                                </div>
                              </div>
                            </>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 gap-1 text-green-500 hover:text-green-600 hover:bg-green-50"
                        onClick={() => updateConsultationStatus(consultation.id, 'approved')}
                        disabled={consultation.status === 'approved'}
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                        <span>Approve</span>
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 gap-1 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => updateConsultationStatus(consultation.id, 'rejected')}
                        disabled={consultation.status === 'rejected'}
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        <span>Reject</span>
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-1 text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Delete</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Consultation</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this consultation request? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              className="bg-red-500 hover:bg-red-600"
                              onClick={() => deleteConsultation(consultation.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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

export default ConsultationsTable;
