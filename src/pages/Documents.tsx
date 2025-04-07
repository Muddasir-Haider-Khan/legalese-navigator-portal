
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { FileText, Download, CheckCircle } from "lucide-react";

const documentTypes = [
  { id: "will", name: "Last Will and Testament" },
  { id: "nda", name: "Non-Disclosure Agreement" },
  { id: "poa", name: "Power of Attorney" },
  { id: "employment", name: "Employment Contract" },
  { id: "rental", name: "Rental Agreement" },
];

const countryOptions = [
  { id: "us", name: "United States" },
  { id: "ca", name: "Canada" },
  { id: "uk", name: "United Kingdom" },
  { id: "au", name: "Australia" },
  { id: "nz", name: "New Zealand" },
];

const Documents = () => {
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [description, setDescription] = useState("");
  const [expertReview, setExpertReview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!fullName || !country || !documentType || !description) {
      toast.error("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    // Simulate document generation
    setTimeout(() => {
      setIsSubmitting(false);
      setGenerated(true);
      toast.success("Document generated successfully!");
    }, 2000);

    // In a real scenario, this is where we'd send the data to Supabase
    // const { data, error } = await supabase
    //   .from("documents")
    //   .insert([
    //     { fullName, country, documentType, description, expertReview, userId: session?.user?.id }
    //   ]);
  };

  const handleDownload = () => {
    // In a real scenario, this would download the actual document
    toast.info("Document downloaded");
  };

  return (
    <Layout>
      <div className="container-custom section-padding">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="heading-md mb-4 text-rocket-gray-900 dark:text-white">Create Legal Documents</h1>
            <p className="text-lg text-rocket-gray-700 dark:text-rocket-gray-300">
              Generate professional legal documents tailored to your specific needs in minutes.
            </p>
          </div>

          {!generated ? (
            <div className="bg-white dark:bg-rocket-gray-800 rounded-lg shadow-lg border border-rocket-gray-100 dark:border-rocket-gray-700 p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="fullName" className="text-rocket-gray-800 dark:text-white">Full Name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full legal name"
                    className="mt-1 text-rocket-gray-900 dark:text-white bg-white dark:bg-rocket-gray-700"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="country" className="text-rocket-gray-800 dark:text-white">Country of Residence</Label>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger className="mt-1 text-rocket-gray-900 dark:text-white bg-white dark:bg-rocket-gray-700">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countryOptions.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="documentType" className="text-rocket-gray-800 dark:text-white">Type of Document</Label>
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger className="mt-1 text-rocket-gray-900 dark:text-white bg-white dark:bg-rocket-gray-700">
                      <SelectValue placeholder="Select a document type" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description" className="text-rocket-gray-800 dark:text-white">Brief Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Please describe your specific needs for this document"
                    className="mt-1 min-h-[120px] text-rocket-gray-900 dark:text-white bg-white dark:bg-rocket-gray-700 placeholder:text-rocket-gray-500 dark:placeholder:text-rocket-gray-400"
                    required
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="expertReview"
                    checked={expertReview}
                    onCheckedChange={(checked) => setExpertReview(!!checked)}
                  />
                  <Label htmlFor="expertReview" className="text-sm cursor-pointer text-rocket-gray-800 dark:text-white">
                    Request Expert Review (additional fees apply)
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-rocket-blue hover:bg-rocket-blue-600 gap-2 text-white"
                  disabled={isSubmitting}
                >
                  <FileText className="h-5 w-5" />
                  {isSubmitting ? "Generating..." : "Generate Document"}
                </Button>
              </form>
            </div>
          ) : (
            <div className="bg-white dark:bg-rocket-gray-800 rounded-lg shadow-lg border border-rocket-gray-100 dark:border-rocket-gray-700 p-6 md:p-8">
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-rocket-blue-50 dark:bg-rocket-blue-900/30 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-rocket-blue-500 dark:text-rocket-blue-300" />
                </div>
                <h2 className="text-2xl font-bold text-rocket-blue-500 dark:text-rocket-blue-300">Document Ready!</h2>
                <p className="text-rocket-gray-700 dark:text-rocket-gray-300 mt-2">
                  Your {documentTypes.find(d => d.id === documentType)?.name} has been generated successfully.
                </p>
              </div>

              <div className="border border-rocket-gray-200 dark:border-rocket-gray-700 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-rocket-blue-500 dark:text-rocket-blue-300" />
                    <div>
                      <p className="font-medium text-rocket-gray-800 dark:text-white">{documentTypes.find(d => d.id === documentType)?.name}</p>
                      <p className="text-sm text-rocket-gray-500 dark:text-rocket-gray-400">Generated on {new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Button 
                    onClick={handleDownload} 
                    className="bg-rocket-blue hover:bg-rocket-blue-600 gap-2 text-white"
                  >
                    <Download className="h-5 w-5" />
                    Download
                  </Button>
                </div>
              </div>

              {expertReview && (
                <div className="bg-rocket-blue-50 dark:bg-rocket-blue-900/20 border border-rocket-blue-100 dark:border-rocket-blue-800/30 rounded-lg p-4 mb-6">
                  <p className="text-rocket-blue-600 dark:text-rocket-blue-300 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Expert review requested. A legal professional will review your document within 48 hours.</span>
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => setGenerated(false)} 
                  variant="outline" 
                  className="flex-1 border-rocket-blue text-rocket-blue dark:text-rocket-blue-300 dark:border-rocket-blue-700 hover:bg-rocket-blue-50 dark:hover:bg-rocket-blue-900/20"
                >
                  Create Another Document
                </Button>
                <Button 
                  onClick={() => window.location.href = "/"}
                  className="flex-1 bg-rocket-blue hover:bg-rocket-blue-600 text-white"
                >
                  Return to Home
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Documents;
