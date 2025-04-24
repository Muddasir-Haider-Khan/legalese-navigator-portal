
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, CheckCircle, Shield, Clock, PenTool } from "lucide-react";
import HeroSection from "@/components/documents/HeroSection";
import MakeDocuments from "@/components/dashboard/MakeDocuments";

const Documents = () => {
  return (
    <Layout>
      <HeroSection isAuthenticated={false} />
      
      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="heading-md mb-4 text-rocket-gray-900 dark:text-white">Professional Legal Documents</h1>
            <p className="text-lg text-rocket-gray-700 dark:text-rocket-gray-300">
              Create customized, legally binding documents tailored to your specific needs in minutes.
            </p>
          </div>

          <div className="bg-white dark:bg-rocket-gray-800 rounded-lg shadow-lg border border-rocket-gray-100 dark:border-rocket-gray-700 p-6 md:p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-rocket-blue-50 dark:bg-rocket-blue-900/20 p-2 rounded-lg">
                    <Shield className="h-6 w-6 text-rocket-blue-500 dark:text-rocket-blue-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-rocket-gray-900 dark:text-white">Legally Sound Documents</h3>
                    <p className="text-rocket-gray-600 dark:text-rocket-gray-300">All documents are created by legal professionals and regularly updated to comply with current laws.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-rocket-blue-50 dark:bg-rocket-blue-900/20 p-2 rounded-lg">
                    <PenTool className="h-6 w-6 text-rocket-blue-500 dark:text-rocket-blue-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-rocket-gray-900 dark:text-white">Customizable Templates</h3>
                    <p className="text-rocket-gray-600 dark:text-rocket-gray-300">Choose from a wide variety of templates and customize them to fit your specific requirements.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-rocket-blue-50 dark:bg-rocket-blue-900/20 p-2 rounded-lg">
                    <Clock className="h-6 w-6 text-rocket-blue-500 dark:text-rocket-blue-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-rocket-gray-900 dark:text-white">Save Time and Money</h3>
                    <p className="text-rocket-gray-600 dark:text-rocket-gray-300">Create documents in minutes instead of hours and avoid expensive lawyer consultations for standard documents.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-rocket-blue-50 dark:bg-rocket-blue-900/20 p-2 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-rocket-blue-500 dark:text-rocket-blue-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-rocket-gray-900 dark:text-white">Expert Review Option</h3>
                    <p className="text-rocket-gray-600 dark:text-rocket-gray-300">Get your document reviewed by a legal professional for additional peace of mind (premium feature).</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <MakeDocuments />

          <div className="bg-white dark:bg-rocket-gray-800 rounded-lg shadow-lg border border-rocket-gray-100 dark:border-rocket-gray-700 p-6 md:p-8 mt-16">
            <div className="text-center space-y-6">
              <p className="text-rocket-gray-600 dark:text-rocket-gray-300 max-w-xl mx-auto">
                Create professional legal documents with our easy-to-use platform. Sign up now to access our full range of document templates and creation tools.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/signup">
                  <Button 
                    className="bg-rocket-blue hover:bg-rocket-blue-600 gap-2 text-white w-full sm:w-auto"
                    size="lg"
                  >
                    Sign Up Now
                    <FileText className="h-5 w-5" />
                  </Button>
                </Link>
                
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    className="border-rocket-blue text-rocket-blue dark:border-rocket-blue-400 dark:text-rocket-blue-400 w-full sm:w-auto"
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
    </Layout>
  );
};

export default Documents;
