
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Search, FileText, CheckCircle, XCircle, Calendar } from "lucide-react";
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

interface Submission {
  id: string;
  created_at: string;
  user_email: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
  title: string;
  content: string;
}

interface Consultation {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
}

type SubmissionType = Submission | Consultation;

const SubmissionsTable = () => {
  const [submissions, setSubmissions] = useState<SubmissionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<SubmissionType | null>(null);
  const [filter, setFilter] = useState<'all' | 'documents' | 'consultations'>('all');
  
  // Mock submissions data since we don't have a real table yet
  const mockSubmissions: Submission[] = [
    {
      id: "1",
      created_at: "2023-05-12T10:30:00Z",
      user_email: "sarah@example.com",
      type: "Document Request",
      status: "pending",
      title: "Will and Testament Template",
      content: "I need a customized will and testament template for a client with complex family structure."
    },
    {
      id: "2",
      created_at: "2023-05-10T14:20:00Z",
      user_email: "john@example.com",
      type: "Legal Advice",
      status: "approved",
      title: "Business Formation Question",
      content: "I'm starting an LLC in California and need advice on tax implications versus forming an S-Corp."
    },
    {
      id: "3",
      created_at: "2023-05-09T09:45:00Z",
      user_email: "michael@example.com",
      type: "Document Request",
      status: "rejected",
      title: "NDA Template",
      content: "I need a non-disclosure agreement template that's enforceable in both US and EU jurisdictions."
    },
    {
      id: "4",
      created_at: "2023-05-08T16:10:00Z",
      user_email: "emily@example.com",
      type: "Legal Advice",
      status: "pending",
      title: "Property Dispute",
      content: "Need advice about a boundary dispute with my neighbor who built a fence 2 feet into my property."
    },
    {
      id: "5",
      created_at: "2023-05-07T11:05:00Z",
      user_email: "david@example.com",
      type: "Other",
      status: "pending",
      title: "Copyright Question",
      content: "I'm an artist and want to know how to properly copyright my digital artwork and what protections that gives me."
    }
  ];
  
  // Mock consultation data
  const mockConsultations: Consultation[] = [
    {
      id: "c1",
      created_at: "2023-05-15T09:00:00Z",
      name: "Jennifer Smith",
      email: "jennifer@example.com",
      phone: "(555) 987-6543",
      message: "I need legal consultation regarding a real estate transaction dispute.",
      status: "pending"
    },
    {
      id: "c2",
      created_at: "2023-05-14T14:30:00Z",
      name: "Robert Johnson",
      email: "robert@example.com",
      phone: "(555) 456-7890",
      message: "Looking for advice on setting up a trust for my children.",
      status: "approved"
    },
    {
      id: "c3",
      created_at: "2023-05-13T11:15:00Z",
      name: "Amanda Wilson",
      email: "amanda@example.com",
      phone: "(555) 234-5678",
      message: "Need consultation regarding divorce proceedings and child custody options.",
      status: "rejected"
    }
  ];
  
  useEffect(() => {
    // In a real application, we would fetch from Supabase
    // For now, we'll use the mock data
    const combinedData = [...mockSubmissions, ...mockConsultations];
    setSubmissions(combinedData);
    setLoading(false);
  }, []);
  
  const handleSearch = () => {
    let filtered: SubmissionType[] = [];
    
    if (filter === 'documents' || filter === 'all') {
      filtered = [
        ...filtered,
        ...mockSubmissions.filter(sub => 
          sub.user_email.toLowerCase().includes(searchTerm.toLowerCase()) || 
          sub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sub.type.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ];
    }
    
    if (filter === 'consultations' || filter === 'all') {
      filtered = [
        ...filtered,
        ...mockConsultations.filter(cons => 
          cons.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          cons.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cons.message.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ];
    }
    
    setSubmissions(filtered);
  };

  const updateItemStatus = (id: string, status: 'approved' | 'rejected') => {
    // In a real app, we would update in Supabase
    const updatedSubmissions = submissions.map(item => 
      item.id === id ? { ...item, status } : item
    );
    setSubmissions(updatedSubmissions);
    toast.success(`Item ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
  };

  // Filter submissions based on current filter
  let filteredSubmissions = submissions;
  if (filter === 'documents') {
    filteredSubmissions = submissions.filter(item => 'title' in item);
  } else if (filter === 'consultations') {
    filteredSubmissions = submissions.filter(item => 'name' in item);
  }
  
  // Apply search filter if term exists
  if (searchTerm) {
    filteredSubmissions = filteredSubmissions.filter(item => {
      if ('title' in item) { // Document submission
        return item.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
               item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               item.type.toLowerCase().includes(searchTerm.toLowerCase());
      } else { // Consultation
        return item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
               item.message.toLowerCase().includes(searchTerm.toLowerCase());
      }
    });
  }

  const isConsultation = (item: SubmissionType): item is Consultation => {
    return 'name' in item;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Submissions & Consultations</h2>
        <div className="flex items-center gap-2">
          <div>
            <select 
              className="bg-rocket-gray-800 border border-rocket-gray-700 rounded-md px-3 py-1.5 text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'documents' | 'consultations')}
            >
              <option value="all">All</option>
              <option value="documents">Documents</option>
              <option value="consultations">Consultations</option>
            </select>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
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
              <TableHead>Type</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Title/Request</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredSubmissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No submissions found
                </TableCell>
              </TableRow>
            ) : (
              filteredSubmissions.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {isConsultation(item) ? (
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        Consultation
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                        <FileText className="h-3.5 w-3.5 mr-1" />
                        Document
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{isConsultation(item) ? item.name : item.user_email}</TableCell>
                  <TableCell className="font-medium">{isConsultation(item) ? 
                    item.message.substring(0, 40) + (item.message.length > 40 ? '...' : '') : 
                    item.title}
                  </TableCell>
                  <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        item.status === "pending" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" :
                        item.status === "approved" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                        "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                      variant="outline"
                    >
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
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
                            onClick={() => setSelectedItem(item)}
                          >
                            {isConsultation(item) ? 
                              <Calendar className="h-3.5 w-3.5" /> : 
                              <FileText className="h-3.5 w-3.5" />}
                            <span>View</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              {isConsultation(selectedItem) ? 
                                'Consultation Request' : 
                                selectedItem?.title}
                            </DialogTitle>
                            <DialogDescription>
                              {isConsultation(selectedItem) ? 
                                `From ${selectedItem?.name}` : 
                                `From ${selectedItem?.user_email}`}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 mt-4">
                            {selectedItem && isConsultation(selectedItem) ? (
                              // Consultation details
                              <>
                                <div>
                                  <span className="text-sm font-medium">Name:</span>
                                  <p>{selectedItem.name}</p>
                                </div>
                                <div>
                                  <span className="text-sm font-medium">Email:</span>
                                  <p>{selectedItem.email}</p>
                                </div>
                                <div>
                                  <span className="text-sm font-medium">Phone:</span>
                                  <p>{selectedItem.phone}</p>
                                </div>
                                <div>
                                  <span className="text-sm font-medium">Request:</span>
                                  <p className="mt-1 p-3 bg-muted rounded-md">{selectedItem.message}</p>
                                </div>
                              </>
                            ) : selectedItem && !isConsultation(selectedItem) ? (
                              // Document details
                              <>
                                <div>
                                  <span className="text-sm font-medium">Type:</span>
                                  <p>{selectedItem.type}</p>
                                </div>
                                <div>
                                  <span className="text-sm font-medium">Content:</span>
                                  <p className="mt-1 p-3 bg-muted rounded-md">{selectedItem.content}</p>
                                </div>
                              </>
                            ) : null}
                            <div>
                              <span className="text-sm font-medium">Status:</span>
                              <p>{selectedItem?.status.charAt(0).toUpperCase() + selectedItem?.status.slice(1)}</p>
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                              <Button
                                variant="outline"
                                className="gap-1 text-red-500 hover:bg-red-50 hover:text-red-600"
                                onClick={() => selectedItem && updateItemStatus(selectedItem.id, 'rejected')}
                              >
                                <XCircle className="h-4 w-4" />
                                <span>Reject</span>
                              </Button>
                              <Button
                                className="gap-1"
                                onClick={() => selectedItem && updateItemStatus(selectedItem.id, 'approved')}
                              >
                                <CheckCircle className="h-4 w-4" />
                                <span>Approve</span>
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 gap-1 text-green-500 hover:text-green-600 hover:bg-green-50"
                        onClick={() => updateItemStatus(item.id, 'approved')}
                        disabled={item.status === 'approved'}
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                        <span>Approve</span>
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 gap-1 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => updateItemStatus(item.id, 'rejected')}
                        disabled={item.status === 'rejected'}
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

export default SubmissionsTable;
