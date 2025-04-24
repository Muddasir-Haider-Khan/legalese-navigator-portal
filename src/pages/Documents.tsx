
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, CheckCircle, Shield, Clock, PenTool, Search } from "lucide-react";
import HeroSection from "@/components/documents/HeroSection";
import MakeDocuments from "@/components/dashboard/MakeDocuments";
import HowItWorksSection from "@/components/documents/HowItWorksSection";
import { useState } from "react";

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Popular document categories
  const categories = [
    { name: "Business Formation", icon: <FileText className="h-5 w-5 text-bright-orange-500" /> },
    { name: "Real Estate", icon: <FileText className="h-5 w-5 text-bright-orange-500" /> },
    { name: "Family", icon: <FileText className="h-5 w-5 text-bright-orange-500" /> },
    { name: "Estate Planning", icon: <FileText className="h-5 w-5 text-bright-orange-500" /> },
  ];
  
  return (
    <Layout>
      <HeroSection isAuthenticated={false} />
      
      <div className="container-custom py-8 md:py-12">
        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white dark:bg-rocket-gray-800 rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">Find the Document You Need</h2>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for documents..."
                className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bright-orange-500 focus:border-bright-orange-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button 
                  key={category.name} 
                  variant="outline" 
                  className="bg-gray-50 border-gray-200 hover:bg-gray-100"
                >
                  {category.icon}
                  <span className="ml-1">{category.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Professional Legal Documents</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Create customized, legally binding documents tailored to your specific needs in minutes.
            </p>
          </div>

          <div className="bg-white dark:bg-rocket-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-rocket-gray-700 p-6 md:p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-bright-orange-100 dark:bg-bright-orange-900/20 p-2 rounded-lg">
                    <Shield className="h-6 w-6 text-bright-orange-500 dark:text-bright-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-gray-900 dark:text-white">Legally Sound Documents</h3>
                    <p className="text-gray-600 dark:text-gray-300">All documents are created by legal professionals and regularly updated to comply with current laws.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-bright-orange-100 dark:bg-bright-orange-900/20 p-2 rounded-lg">
                    <PenTool className="h-6 w-6 text-bright-orange-500 dark:text-bright-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-gray-900 dark:text-white">Customizable Templates</h3>
                    <p className="text-gray-600 dark:text-gray-300">Choose from a wide variety of templates and customize them to fit your specific requirements.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-bright-orange-100 dark:bg-bright-orange-900/20 p-2 rounded-lg">
                    <Clock className="h-6 w-6 text-bright-orange-500 dark:text-bright-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-gray-900 dark:text-white">Save Time and Money</h3>
                    <p className="text-gray-600 dark:text-gray-300">Create documents in minutes instead of hours and avoid expensive lawyer consultations for standard documents.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-bright-orange-100 dark:bg-bright-orange-900/20 p-2 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-bright-orange-500 dark:text-bright-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-gray-900 dark:text-white">Expert Review Option</h3>
                    <p className="text-gray-600 dark:text-gray-300">Get your document reviewed by a legal professional for additional peace of mind (premium feature).</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <MakeDocuments />

          <div className="bg-white dark:bg-rocket-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-rocket-gray-700 p-6 md:p-8 mt-16">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Ready to Create Your Legal Document?</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                Create professional legal documents with our easy-to-use platform. Sign up now to access our full range of document templates and creation tools.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/signup">
                  <Button 
                    className="bg-bright-orange-500 hover:bg-bright-orange-600 gap-2 text-white w-full sm:w-auto"
                    size="lg"
                  >
                    Sign Up Now
                    <FileText className="h-5 w-5" />
                  </Button>
                </Link>
                
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    className="border-bright-orange-500 text-bright-orange-500 dark:border-bright-orange-400 dark:text-bright-orange-400 w-full sm:w-auto"
                    size="lg"
                  >
                    Log In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <HowItWorksSection />
    </Layout>
  );
};

export default Documents;
