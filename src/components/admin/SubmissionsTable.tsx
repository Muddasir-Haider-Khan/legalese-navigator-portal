
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Search, FileText, CheckCircle, XCircle } from "lucide-react";
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

const SubmissionsTable = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  
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
  
  useEffect(() => {
    // In a real application, we would fetch from Supabase
    // For now, we'll use the mock data
    setSubmissions(mockSubmissions);
    setLoading(false);
  }, []);
  
  const handleSearch = () => {
    const filtered = mockSubmissions.filter(submission => 
      submission.user_email.toLowerCase().includes(searchTerm.toLowerCase()) || 
      submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSubmissions(filtered);
  };

  const updateSubmissionStatus = (id: string, status: 'approved' | 'rejected') => {
    // In a real app, we would update in Supabase
    const updatedSubmissions = submissions.map(submission => 
      submission.id === id ? { ...submission, status } : submission
    );
    setSubmissions(updatedSubmissions);
    toast.success(`Submission ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
  };

  const filteredSubmissions = searchTerm ? 
    submissions.filter(sub => 
      sub.user_email.toLowerCase().includes(searchTerm.toLowerCase()) || 
      sub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.type.toLowerCase().includes(searchTerm.toLowerCase())
    ) : submissions;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">User Submissions</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search submissions..."
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
              <TableHead>User</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Title</TableHead>
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
              filteredSubmissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>{submission.user_email}</TableCell>
                  <TableCell>{submission.type}</TableCell>
                  <TableCell className="font-medium">{submission.title}</TableCell>
                  <TableCell>{new Date(submission.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        submission.status === "pending" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" :
                        submission.status === "approved" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                        "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                      variant="outline"
                    >
                      {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
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
                            onClick={() => setSelectedSubmission(submission)}
                          >
                            <FileText className="h-3.5 w-3.5" />
                            <span>View</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{selectedSubmission?.title}</DialogTitle>
                            <DialogDescription>
                              Submission from {selectedSubmission?.user_email}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 mt-4">
                            <div>
                              <span className="text-sm font-medium">Type:</span>
                              <p>{selectedSubmission?.type}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium">Content:</span>
                              <p className="mt-1 p-3 bg-muted rounded-md">{selectedSubmission?.content}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium">Status:</span>
                              <p>{selectedSubmission?.status.charAt(0).toUpperCase() + selectedSubmission?.status.slice(1)}</p>
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                              <Button
                                variant="outline"
                                className="gap-1 text-red-500 hover:bg-red-50 hover:text-red-600"
                                onClick={() => selectedSubmission && updateSubmissionStatus(selectedSubmission.id, 'rejected')}
                              >
                                <XCircle className="h-4 w-4" />
                                <span>Reject</span>
                              </Button>
                              <Button
                                className="gap-1"
                                onClick={() => selectedSubmission && updateSubmissionStatus(selectedSubmission.id, 'approved')}
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
                        onClick={() => updateSubmissionStatus(submission.id, 'approved')}
                        disabled={submission.status === 'approved'}
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                        <span>Approve</span>
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 gap-1 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => updateSubmissionStatus(submission.id, 'rejected')}
                        disabled={submission.status === 'rejected'}
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
