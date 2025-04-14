
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
        <section className="py-16 md:py-24 bg-rocket-gray-50 dark:bg-rocket-gray-800/30">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="text-rocket-blue-500 font-medium mb-2 block text-white">How It Works</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-rocket-gray-900 dark:text-white">
                Simple, Affordable Legal Solutions
              </h2>
              <p className="text-lg text-rocket-gray-600 dark:text-rocket-gray-300 max-w-3xl mx-auto">
                We make legal matters easy to understand and manage through our streamlined process.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              <div className="text-center">
                <div className="bg-rocket-blue-50 dark:bg-rocket-blue-900/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <FileText className="h-8 w-8 text-[#F18F01]" />
                  <span className="absolute -top-2 -right-2 bg-[#F18F01] text-white h-6 w-6 rounded-full flex items-center justify-center text-sm font-medium">
                    1
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-rocket-gray-900 dark:text-white">Select Your Document</h3>
                <p className="text-rocket-gray-600 dark:text-rocket-gray-300">
                  Choose from hundreds of legal documents designed for personal and business needs.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-rocket-blue-50 dark:bg-rocket-blue-900/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <CheckCircle className="h-8 w-8 text-[#F18F01]" />
                  <span className="absolute -top-2 -right-2 bg-[#F18F01] text-white h-6 w-6 rounded-full flex items-center justify-center text-sm font-medium">
                    2
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-rocket-gray-900 dark:text-white">Customize It</h3>
                <p className="text-rocket-gray-600 dark:text-rocket-gray-300">
                  Answer simple questions to create your personalized legal document.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-rocket-blue-50 dark:bg-rocket-blue-900/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <Shield className="h-8 w-8 text-[#F18F01]" />
                  <span className="absolute -top-2 -right-2 bg-[#F18F01] text-white h-6 w-6 rounded-full flex items-center justify-center text-sm font-medium">
                    3
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-rocket-gray-900 dark:text-white">Sign & Share</h3>
                <p className="text-rocket-gray-600 dark:text-rocket-gray-300">
                  Save, print, download, or share your legal document instantly.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/how-it-works">
                <Button variant="orange" className="hover:bg-[#D17701] shadow-md">
                  Learn more about our process <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <Testimonials />
        
        {/* Popular Documents Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-rocket-gray-900">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="text-rocket-blue-500 font-medium mb-2 block text-black">Popular Documents</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
                Most Frequently Used Legal Documents
              </h2>
              <p className="text-lg text-black max-w-3xl mx-auto">
                Create any of these documents in minutes with our easy-to-use platform.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
              {[
                { link: "/documents/1", text: "Last Will and Testament" },
                { link: "/documents/4", text: "Power of Attorney" },
                { link: "/documents/2", text: "Non-Disclosure Agreement" },
                { link: "/documents/3", text: "LLC Operating Agreement" },
                { link: "/documents/5", text: "Residential Lease" },
                { link: "/documents/6", text: "Employment Contract" }
              ].map(({ link, text }) => (
                <Link 
                  key={link} 
                  to={link} 
                  className="bg-white dark:bg-rocket-gray-800 border border-rocket-gray-200 dark:border-rocket-gray-700 rounded-lg p-4 text-center hover:shadow-md transition-shadow"
                >
                  <FileText className="h-8 w-8 mx-auto mb-2 text-[#F18F01]" />
                  <span className="font-medium text-black">{text}</span>
                </Link>
              ))}
            </div>
            
            <div className="text-center">
              <Link to="/documents">
                <Button variant="orange" className="hover:bg-[#D17701] shadow-md">
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
