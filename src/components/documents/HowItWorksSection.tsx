
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorksSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Creating your legal document is simple with our guided process
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow border border-gray-100">
            <div className="w-16 h-16 bg-bright-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="relative">
                <FileText className="w-7 h-7 text-bright-orange-500" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-bright-orange-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                  1
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Select Your Document</h3>
            <p className="text-gray-600">
              Choose from our library of legal documents designed for personal and business needs.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow border border-gray-100">
            <div className="w-16 h-16 bg-bright-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="relative">
                <CheckCircle className="w-7 h-7 text-bright-orange-500" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-bright-orange-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                  2
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Answer Questions</h3>
            <p className="text-gray-600">
              Our guided process asks simple questions to customize your document to your needs.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow border border-gray-100">
            <div className="w-16 h-16 bg-bright-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="relative">
                <FileText className="w-7 h-7 text-bright-orange-500" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-bright-orange-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                  3
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Download & Sign</h3>
            <p className="text-gray-600">
              Get your completed document instantly. Print, download or sign it electronically.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link to="/documents">
            <Button className="bg-bright-orange-500 hover:bg-bright-orange-600 text-white px-6 py-2">
              Browse Documents
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
