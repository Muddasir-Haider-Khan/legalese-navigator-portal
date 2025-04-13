
import { useParams } from "react-router-dom";
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// This matches the document structure from DocumentTemplates.tsx
interface Document {
  id: number;
  title: string;
  category: string;
  description: string;
  popular: boolean;
}

// Mock document data - same as in DocumentTemplates.tsx
const documents = [
  {
    id: 1,
    title: "Last Will and Testament",
    category: "Estate Planning",
    description: "Create a legally binding will to distribute your assets and property.",
    popular: true,
  },
  {
    id: 2,
    title: "Non-Disclosure Agreement",
    category: "Business",
    description: "Protect confidential information when working with contractors or partners.",
    popular: true,
  },
  {
    id: 3,
    title: "LLC Operating Agreement",
    category: "Business",
    description: "Define the financial and working relationships between business owners.",
    popular: false,
  },
  {
    id: 4,
    title: "Power of Attorney",
    category: "Estate Planning",
    description: "Authorize someone to act on your behalf for legal, financial, or medical decisions.",
    popular: true,
  },
  {
    id: 5,
    title: "Residential Lease Agreement",
    category: "Real Estate",
    description: "Create a binding agreement between a landlord and tenant for property rental.",
    popular: true,
  },
  {
    id: 6,
    title: "Employment Contract",
    category: "Employment",
    description: "Establish clear terms and conditions for hiring employees.",
    popular: false,
  },
  {
    id: 7,
    title: "Trademark Application",
    category: "Intellectual Property",
    description: "File for protection of your brand names, logos, and slogans.",
    popular: false,
  },
  {
    id: 8,
    title: "Divorce Settlement",
    category: "Family",
    description: "Create a legal agreement to divide assets and resolve other matters during divorce.",
    popular: false,
  },
];

const DocumentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  
  // Find the document with the given id
  const document = documents.find(doc => doc.id === Number(id));
  
  if (!document) {
    return (
      <Layout>
        <div className="container-custom py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-lg mb-4">Document Not Found</h1>
            <p className="text-lg text-rocket-gray-600 dark:text-rocket-gray-400 mb-6">
              The document you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/documents">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Documents
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handleDownload = () => {
    setLoading(true);
    // Simulate document generation delay
    setTimeout(() => {
      setLoading(false);
      // In a real app, this would trigger a file download
      alert("Document downloaded successfully!");
    }, 1500);
  };

  return (
    <Layout>
      <div className="container-custom py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Link to="/documents" className="inline-flex items-center text-rocket-blue-500 hover:text-rocket-blue-600 mb-6">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to All Documents
          </Link>
          
          <Card className="mb-8">
            <CardHeader className="pb-4">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="outline">{document.category}</Badge>
                {document.popular && (
                  <Badge className="bg-yellow-500">Popular</Badge>
                )}
              </div>
              <CardTitle className="text-2xl mb-2">{document.title}</CardTitle>
              <CardDescription className="text-lg">{document.description}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-3 p-4 bg-rocket-gray-50 dark:bg-rocket-gray-800/50 rounded-lg">
                  <FileText className="h-6 w-6 text-rocket-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Document Details</h3>
                    <p className="text-rocket-gray-600 dark:text-rocket-gray-400">
                      This is a customizable legal template that complies with current laws and regulations.
                      Once completed, you'll receive a downloadable document in PDF format.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-medium">What you'll need to complete this document:</h3>
                  <ul className="list-disc list-inside space-y-2 text-rocket-gray-600 dark:text-rocket-gray-400">
                    <li>Personal identification information</li>
                    <li>Relevant dates and details specific to this document type</li>
                    <li>Any supporting documentation mentioned in the template</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex-col space-y-4">
              <Button 
                onClick={handleDownload} 
                className="w-full md:w-auto" 
                size="lg" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Document...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-5 w-5" /> Download Template
                  </>
                )}
              </Button>
              
              <p className="text-sm text-center text-rocket-gray-500 dark:text-rocket-gray-400">
                Need help? <Link to="/contact-lawyer" className="text-rocket-blue-500 hover:underline">Contact a lawyer</Link> for professional assistance.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DocumentDetail;
