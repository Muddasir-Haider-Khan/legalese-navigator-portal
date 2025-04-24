import { 
  Building2,
  BriefcaseBusiness,
  FileLock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import BusinessBackgroundSlideshow from "@/components/business/BusinessBackgroundSlideshow";

const StartABusiness = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <BusinessBackgroundSlideshow />
        
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Start Your Business the Right Way
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 drop-shadow-md">
              Get your business up and running with professional legal documents and expert guidance.
            </p>
            <Button 
              size="lg" 
              className="bg-bright-orange-500 hover:bg-bright-orange-600 text-white shadow-lg"
            >
              Start Now
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            Everything You Need to Start Your Business
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-black/10 hover:shadow-lg transition-shadow">
              <Building2 className="h-10 w-10 text-bright-orange-500 mb-4" />
              <h3 className="text-xl font-semibold text-black mb-3">
                Business Registrations
              </h3>
              <ul className="space-y-3 mb-4">
                <li>
                  <Link to="/documents/llc" className="text-black hover:text-bright-orange-500 transition-colors">
                    Start an LLC
                  </Link>
                </li>
                <li>
                  <Link to="/documents/corporation" className="text-black hover:text-bright-orange-500 transition-colors">
                    Start a Corporation
                  </Link>
                </li>
                <li>
                  <Link to="/documents/non-profit" className="text-black hover:text-bright-orange-500 transition-colors">
                    Start a Non-profit
                  </Link>
                </li>
              </ul>
              <Link to="/documents" className="text-bright-orange-500 hover:underline">
                Learn More →
              </Link>
            </div>

            <div className="p-6 rounded-xl border border-black/10 hover:shadow-lg transition-shadow">
              <BriefcaseBusiness className="h-10 w-10 text-bright-orange-500 mb-4" />
              <h3 className="text-xl font-semibold text-black mb-3">
                Business Services
              </h3>
              <ul className="space-y-3 mb-4">
                <li>
                  <Link to="/documents/operating-agreement" className="text-black hover:text-bright-orange-500 transition-colors">
                    Operating Agreement
                  </Link>
                </li>
                <li>
                  <Link to="/documents/annual-report" className="text-black hover:text-bright-orange-500 transition-colors">
                    Annual Report Filing
                  </Link>
                </li>
                <li>
                  <Link to="/documents/business-plan" className="text-black hover:text-bright-orange-500 transition-colors">
                    Business Plan
                  </Link>
                </li>
              </ul>
              <Link to="/documents" className="text-bright-orange-500 hover:underline">
                Learn More →
              </Link>
            </div>

            <div className="p-6 rounded-xl border border-black/10 hover:shadow-lg transition-shadow">
              <FileLock className="h-10 w-10 text-bright-orange-500 mb-4" />
              <h3 className="text-xl font-semibold text-black mb-3">
                Business Property
              </h3>
              <ul className="space-y-3 mb-4">
                <li>
                  <Link to="/documents/trademark" className="text-black hover:text-bright-orange-500 transition-colors">
                    Trademark Registration
                  </Link>
                </li>
                <li>
                  <Link to="/documents/copyright" className="text-black hover:text-bright-orange-500 transition-colors">
                    Copyright Protection
                  </Link>
                </li>
                <li>
                  <Link to="/documents/nda" className="text-black hover:text-bright-orange-500 transition-colors">
                    Make an NDA
                  </Link>
                </li>
              </ul>
              <Link to="/documents" className="text-bright-orange-500 hover:underline">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Business Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -top-4 left-0">
                <span className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  MOST POPULAR
                </span>
              </div>
              <img 
                src="/lovable-uploads/888acfa1-e266-4274-be64-98eed751f1d1.png"
                alt="Start your LLC" 
                className="rounded-lg w-full h-auto"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                Start your LLC today
              </h2>
              <p className="text-lg text-gray-600">
                A Limited Liability Company (LLC), protects your personal assets from some business debts and lawsuits, and offers flexible tax management. They're a popular choice for solos and entrepreneurs.
              </p>
              <div className="flex gap-4">
                <Button 
                  size="lg"
                  className="bg-bright-orange-500 hover:bg-bright-orange-600"
                  asChild
                >
                  <Link to="/documents/llc">Start my LLC</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  asChild
                >
                  <Link to="/documents/llc-guide">Learn about LLCs</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-[#FDE1D3]">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            Why Choose Legal Gram
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <Star className="h-10 w-10 text-bright-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-black mb-3">
                Expert Support
              </h3>
              <p className="text-black">
                Get help from our network of experienced business attorneys.
              </p>
            </div>
            
            <div className="text-center">
              <Star className="h-10 w-10 text-bright-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-black mb-3">
                Affordable Pricing
              </h3>
              <p className="text-black">
                Start your business without breaking the bank.
              </p>
            </div>
            
            <div className="text-center">
              <Star className="h-10 w-10 text-bright-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-black mb-3">
                Fast & Easy
              </h3>
              <p className="text-black">
                Simple step-by-step process to get started quickly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default StartABusiness;
