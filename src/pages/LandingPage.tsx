
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, FileText, MessageCircle, UserCheck } from "lucide-react";

const LandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Set loaded after a small delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      title: "Legal Document Templates",
      description: "Access hundreds of legally verified document templates",
      icon: <FileText className="h-8 w-8 text-rocket-blue-500" />,
    },
    {
      title: "Ask a Lawyer",
      description: "Get immediate legal advice from qualified attorneys",
      icon: <MessageCircle className="h-8 w-8 text-rocket-blue-500" />,
    },
    {
      title: "Custom Legal Solutions",
      description: "Tailored legal assistance for your specific needs",
      icon: <UserCheck className="h-8 w-8 text-rocket-blue-500" />,
    }
  ];

  return (
    <Layout>
      <div className={`w-full transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-rocket-blue-50 to-white dark:from-rocket-blue-900 dark:to-rocket-gray-900">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="heading-xl text-rocket-blue-900 dark:text-white">
                  Legal Solutions <span className="text-rocket-blue-500">Made Simple</span>
                </h1>
                <p className="text-lg text-rocket-gray-700 dark:text-rocket-gray-300 max-w-lg">
                  Access professional legal documents, connect with qualified attorneys, and get the legal help you need without the complexity.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link to="/documents">
                    <Button size="lg" className="bg-rocket-blue-500 hover:bg-rocket-blue-600">
                      Browse Documents <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/contact-lawyer">
                    <Button size="lg" variant="outline" className="border-rocket-blue-500 text-rocket-blue-500 hover:bg-rocket-blue-50 dark:hover:bg-rocket-blue-900/30">
                      Talk to a Lawyer
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-rocket-gray-200 dark:border-rocket-gray-800">
                <div className="aspect-w-16 aspect-h-9 bg-white dark:bg-rocket-gray-800">
                  <img 
                    src="/placeholder.svg" 
                    alt="Legal Platform Preview" 
                    className="object-cover"
                    width={600}
                    height={400}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white dark:bg-rocket-gray-900">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-lg text-rocket-blue-900 dark:text-white mb-4">How We Can Help</h2>
              <p className="text-lg text-rocket-gray-600 dark:text-rocket-gray-400 max-w-2xl mx-auto">
                Our platform provides everything you need to navigate legal matters with confidence and clarity.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-rocket-gray-50 dark:bg-rocket-gray-800 p-8 rounded-xl shadow-sm border border-rocket-gray-100 dark:border-rocket-gray-700 transition-transform hover:-translate-y-1 duration-300"
                >
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="heading-sm mb-3 text-rocket-blue-900 dark:text-white">{feature.title}</h3>
                  <p className="text-rocket-gray-600 dark:text-rocket-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-rocket-blue-50 dark:bg-rocket-blue-900/20">
          <div className="container-custom">
            <div className="bg-rocket-blue-600 dark:bg-rocket-blue-800 rounded-xl p-8 md:p-12 text-white text-center">
              <h2 className="heading-lg mb-4">Ready to Get Started?</h2>
              <p className="text-lg text-rocket-blue-100 max-w-2xl mx-auto mb-8">
                Join thousands of individuals and businesses who trust us with their legal needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/signup">
                  <Button size="lg" variant="secondary" className="bg-white text-rocket-blue-600 hover:bg-rocket-gray-100">
                    Create Free Account
                  </Button>
                </Link>
                <Link to="/documents">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-rocket-blue-700">
                    Browse Templates
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default LandingPage;
