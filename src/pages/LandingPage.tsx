
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, MessageCircle, Scale, Building, Shield, CheckCircle } from "lucide-react";
import Hero from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

const LandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <div className={`w-full transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Hero Section */}
        <Hero />
        
        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-cream-50 dark:bg-gray-800/30">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="text-bright-red-500 font-medium mb-2 block">How It Works</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Simple, Affordable Legal Solutions
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We make legal matters easy to understand and manage through our streamlined process.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              <div className="text-center">
                <div className="bg-bright-red-50 dark:bg-bright-red-900/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <FileText className="h-8 w-8 text-bright-red-500 dark:text-bright-red-300" />
                  <span className="absolute -top-2 -right-2 bg-bright-red-500 text-white h-6 w-6 rounded-full flex items-center justify-center text-sm font-medium">
                    1
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Select Your Document</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Choose from hundreds of legal documents designed for personal and business needs.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-bright-red-50 dark:bg-bright-red-900/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <CheckCircle className="h-8 w-8 text-bright-red-500 dark:text-bright-red-300" />
                  <span className="absolute -top-2 -right-2 bg-bright-red-500 text-white h-6 w-6 rounded-full flex items-center justify-center text-sm font-medium">
                    2
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Customize It</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Answer simple questions to create your personalized legal document.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-bright-red-50 dark:bg-bright-red-900/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <Shield className="h-8 w-8 text-bright-red-500 dark:text-bright-red-300" />
                  <span className="absolute -top-2 -right-2 bg-bright-red-500 text-white h-6 w-6 rounded-full flex items-center justify-center text-sm font-medium">
                    3
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Sign & Share</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Save, print, download, or share your legal document instantly.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/how-it-works">
                <Button variant="outline" className="border-bright-red-500 text-bright-red-500 hover:bg-bright-red-50 dark:border-bright-red-400 dark:text-bright-red-400 dark:hover:bg-bright-red-900/20">
                  Learn more about our process <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <Testimonials />
        
        {/* Popular Documents Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="text-bright-red-500 font-medium mb-2 block">Popular Documents</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Most Frequently Used Legal Documents
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Create any of these documents in minutes with our easy-to-use platform.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
              <Link to="/documents/will" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                <FileText className="h-8 w-8 mx-auto mb-2 text-bright-red-500 dark:text-bright-red-300" />
                <span className="font-medium text-gray-900 dark:text-white">Last Will and Testament</span>
              </Link>
              
              <Link to="/documents/power-of-attorney" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                <FileText className="h-8 w-8 mx-auto mb-2 text-bright-red-500 dark:text-bright-red-300" />
                <span className="font-medium text-gray-900 dark:text-white">Power of Attorney</span>
              </Link>
              
              <Link to="/documents/nda" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                <FileText className="h-8 w-8 mx-auto mb-2 text-bright-red-500 dark:text-bright-red-300" />
                <span className="font-medium text-gray-900 dark:text-white">Non-Disclosure Agreement</span>
              </Link>
              
              <Link to="/documents/llc" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                <FileText className="h-8 w-8 mx-auto mb-2 text-bright-red-500 dark:text-bright-red-300" />
                <span className="font-medium text-gray-900 dark:text-white">LLC Operating Agreement</span>
              </Link>
              
              <Link to="/documents/lease" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                <FileText className="h-8 w-8 mx-auto mb-2 text-bright-red-500 dark:text-bright-red-300" />
                <span className="font-medium text-gray-900 dark:text-white">Residential Lease</span>
              </Link>
              
              <Link to="/documents/employment" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                <FileText className="h-8 w-8 mx-auto mb-2 text-bright-red-500 dark:text-bright-red-300" />
                <span className="font-medium text-gray-900 dark:text-white">Employment Contract</span>
              </Link>
            </div>
            
            <div className="text-center">
              <Link to="/documents">
                <Button className="bg-bright-red-500 hover:bg-bright-red-600 text-white shadow-md">
                  View all documents <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <CTASection />
      </div>
    </Layout>
  );
};

export default LandingPage;
