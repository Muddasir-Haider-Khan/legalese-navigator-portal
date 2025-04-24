
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, CheckCircle, Shield, Clock, PenTool, Book, Award, ArrowRight } from "lucide-react";
import HeroSection from "@/components/documents/HeroSection";
import MakeDocuments from "@/components/dashboard/MakeDocuments";
import HowItWorksSection from "@/components/documents/HowItWorksSection";

// Featured document categories
const documentCategories = [
  {
    title: "Personal",
    icon: <FileText className="h-8 w-8 text-bright-orange-500" />,
    image: "https://images.unsplash.com/photo-1614036634955-ae5e90f9b9eb?q=80&w=1600&auto=format&fit=crop",
    documents: [
      "Last Will and Testament",
      "Living Will",
      "Power of Attorney",
      "Healthcare Directive",
      "Personal Loan Agreement"
    ]
  },
  {
    title: "Business",
    icon: <Award className="h-8 w-8 text-bright-orange-500" />,
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=1600&auto=format&fit=crop",
    documents: [
      "LLC Operating Agreement",
      "Non-Disclosure Agreement",
      "Employment Contract",
      "Independent Contractor Agreement",
      "Business Plan"
    ]
  },
  {
    title: "Real Estate",
    icon: <Book className="h-8 w-8 text-bright-orange-500" />,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop",
    documents: [
      "Residential Lease Agreement",
      "Commercial Lease Agreement",
      "Quitclaim Deed",
      "Property Sale Agreement",
      "Eviction Notice"
    ]
  }
];

const Documents = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Layout>
      <HeroSection isAuthenticated={false} />
      
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="heading-md mb-4 text-rocket-gray-900 dark:text-white">Professional Legal Documents</h1>
            <p className="text-lg text-rocket-gray-700 dark:text-rocket-gray-300">
              Create customized, legally binding documents tailored to your specific needs in minutes.
            </p>
          </div>
          
          {/* Featured document categories */}
          <div className="mb-12">
            <div className="flex justify-center space-x-2 mb-8 border-b border-gray-200 overflow-x-auto pb-1">
              {documentCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-6 py-3 font-medium rounded-t-lg whitespace-nowrap transition-colors ${
                    activeTab === index 
                    ? 'text-bright-orange-500 border-b-2 border-bright-orange-500' 
                    : 'text-gray-600 hover:text-bright-orange-400'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
            
            <div className="bg-white dark:bg-rocket-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-rocket-gray-700 overflow-hidden">
              <div className="relative h-60">
                <img 
                  src={documentCategories[activeTab].image}
                  alt={`${documentCategories[activeTab].title} documents`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="bg-white p-2 rounded-lg shadow-lg">
                      {documentCategories[activeTab].icon}
                    </div>
                    <h2 className="text-2xl font-bold text-white">{documentCategories[activeTab].title} Documents</h2>
                  </div>
                  <p className="text-white/80">
                    Professional templates for all your {documentCategories[activeTab].title.toLowerCase()} legal needs
                  </p>
                </div>
              </div>
              
              <div className="p-6">
                <ul className="space-y-3">
                  {documentCategories[activeTab].documents.map((doc, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-bright-orange-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{doc}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Plus many more {documentCategories[activeTab].title.toLowerCase()} documents
                  </span>
                  <Link to={`/document-category/${activeTab}`}>
                    <Button variant="ghost" className="text-bright-orange-500 hover:text-bright-orange-600 hover:bg-bright-orange-50">
                      <span>View all</span>
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
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

          <div className="my-20">
            <MakeDocuments />
          </div>

          <HowItWorksSection />
          
          {/* Visual Explainer Section */}
          <div className="my-16">
            <div className="bg-white dark:bg-rocket-gray-800 rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-rocket-gray-900 dark:text-white">How Our Document Process Works</h3>
                  <p className="text-gray-600 mb-6">See how easy it is to create and manage your legal documents with our platform</p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-bright-orange-100 flex items-center justify-center text-bright-orange-500 font-bold">1</div>
                      <div>
                        <h4 className="font-medium text-lg text-rocket-gray-900 dark:text-white">Choose your document type</h4>
                        <p className="text-gray-600">Browse our extensive library of legal documents</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-bright-orange-100 flex items-center justify-center text-bright-orange-500 font-bold">2</div>
                      <div>
                        <h4 className="font-medium text-lg text-rocket-gray-900 dark:text-white">Answer simple questions</h4>
                        <p className="text-gray-600">Our system generates your document based on your responses</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-bright-orange-100 flex items-center justify-center text-bright-orange-500 font-bold">3</div>
                      <div>
                        <h4 className="font-medium text-lg text-rocket-gray-900 dark:text-white">Review and download</h4>
                        <p className="text-gray-600">Get your finalized document ready for signing and sharing</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Link to="/documents/demo">
                      <Button variant="outline" className="border-bright-orange-500 text-bright-orange-500">
                        Watch demo video
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1554774853-d50f9c681ae2?q=80&w=1600&auto=format&fit=crop"
                    alt="Person using document creation platform"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-bright-orange-500 flex items-center justify-center cursor-pointer hover:bg-bright-orange-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-8 h-8">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
