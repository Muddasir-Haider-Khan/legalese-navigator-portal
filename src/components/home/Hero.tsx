
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, MessageSquare, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-rocket-blue-500 to-rocket-blue-700 text-white">
      <div className="container-custom py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="heading-lg">
              Get Legal Help <span className="text-rocket-gray-100">Instantly</span>
            </h1>
            <p className="text-lg md:text-xl text-rocket-gray-100 leading-relaxed">
              Create legal documents, get expert advice, and access resources to solve your legal needs quickly and affordably.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/documents">
                <Button size="lg" className="bg-white text-rocket-blue-500 hover:bg-rocket-gray-100 gap-2">
                  Make Documents
                  <FileText size={18} />
                </Button>
              </Link>
              <Link to="/advice">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-rocket-blue-600 gap-2">
                  Get Legal Advice
                  <MessageSquare size={18} />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white/20 shadow-xl">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <FileText size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Create Legal Documents</h3>
                  <p className="text-rocket-gray-200 mt-1">
                    Generate professional legal documents tailored to your needs
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <MessageSquare size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Legal Advice Chat</h3>
                  <p className="text-rocket-gray-200 mt-1">
                    Get guidance for your specific legal situation
                  </p>
                </div>
              </div>
              
              <Link to="/service" className="flex items-center gap-2 text-white hover:text-rocket-gray-200 transition-colors">
                See all our services <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
