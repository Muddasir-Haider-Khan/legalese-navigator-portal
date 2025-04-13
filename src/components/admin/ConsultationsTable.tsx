
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Search, Calendar, CheckCircle, XCircle, Phone, User } from "lucide-react";
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
} from "@/components/ui/dialog";

// Define the consultation interface based on our Supabase schema
interface Consultation {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
}

const ConsultationsTable = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  
  useEffect(() => {
    console.log("ConsultationsTable component mounted, fetching data...");
    fetchConsultations();
  }, []);
  
  const fetchConsultations = async () => {
    setLoading(true);
    console.log("Fetching consultations from Supabase...");
    
    try {
      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .order('created_at', { ascending: false });
        
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
      // If search is empty, refresh data
      fetchConsultations();
      return;
    }
    
    // Client-side filtering based on search term
    const lowerSearchTerm = searchTerm.toLowerCase();
    const filtered = consultations.filter(item => 
      item.name.toLowerCase().includes(lowerSearchTerm) || 
      item.email.toLowerCase().includes(lowerSearchTerm) ||
      (item.phone && item.phone.toLowerCase().includes(lowerSearchTerm)) ||
      item.message.toLowerCase().includes(lowerSearchTerm)
    );
    
    setConsultations(filtered);
  };

  const updateConsultationStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('consultations')
        .update({ status })
        .eq('id', id);
      
      if (error) {
        console.error('Error updating consultation status:', error);
        toast.error('Failed to update consultation status');
        return;
      }
      
      // Update the local state
      setConsultations(prev => 
        prev.map(item => 
          item.id === id ? { ...item, status } : item
        )
      );
      
      // If the selected consultation is being updated, update that too
      if (selectedConsultation && selectedConsultation.id === id) {
        setSelectedConsultation({ ...selectedConsultation, status });
      }
      
      toast.success(`Consultation ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
      
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred');
    }
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
          <Button variant="outline" onClick={fetchConsultations} className="gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
              <path d="M21 3v5h-5"/>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
              <path d="M3 21v-5h5"/>
            </svg>
            <span>Refresh</span>
          </Button>
        </div>
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
                  <TableCell>{new Date(consultation.created_at).toLocaleDateString()}</TableCell>
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
                                  >
                                    <XCircle className="h-4 w-4" />
                                    <span>Reject</span>
                                  </Button>
                                  <Button
                                    className="gap-1"
                                    onClick={() => {
                                      updateConsultationStatus(selectedConsultation.id, 'approved');
                                    }}
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
