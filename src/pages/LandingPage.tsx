
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, MessageCircle, Scale, Building, Shield, ChevronRight, MapPin, Check, Star, Award, Clock } from "lucide-react";
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
    <Layout fullWidth>
      <div className={`w-full transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Hero Section with CTA */}
        <Hero />
        
        {/* Services By Practice Area */}
        <section className="py-16 md:py-24 bg-rocket-gray-50 dark:bg-rocket-gray-800/30">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="text-rocket-blue-500 font-medium mb-2 block text-black">Our Services</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
                Browse Legal Services by Practice Area
              </h2>
              <p className="text-lg text-black max-w-3xl mx-auto">
                Find the right legal solution for your specific needs
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {[
                { icon: Scale, title: "Business Formation", description: "LLC formation, incorporation, and business structure advice" },
                { icon: FileText, title: "Contracts & Agreements", description: "Draft, review, and negotiate all types of legal agreements" },
                { icon: Shield, title: "Intellectual Property", description: "Trademark, copyright, and patent protection strategies" },
              ].map((service, index) => (
                <div key={index} className="bg-white dark:bg-rocket-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-rocket-gray-200 dark:border-rocket-gray-700">
                  <div className="bg-rocket-blue-50 dark:bg-rocket-blue-900/20 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                    <service.icon className="h-8 w-8 text-[#F18F01]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-black">{service.title}</h3>
                  <p className="text-black mb-4">{service.description}</p>
                  <Link to="/services" className="flex items-center text-[#F18F01] hover:underline font-medium">
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              ))}
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
              {[
                "Employment & Labor", "Real Estate", "Corporate Law", "Litigation", 
                "Immigration", "Tax Law", "Estate Planning", "More Services"
              ].map(area => (
                <Link 
                  key={area} 
                  to={`/services/${area.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-white dark:bg-rocket-gray-800 border border-rocket-gray-200 dark:border-rocket-gray-700 rounded-lg p-4 hover:bg-rocket-blue-50 dark:hover:bg-rocket-blue-900/10 transition-colors"
                >
                  <span className="text-black font-medium flex items-center">
                    {area} <ChevronRight className="ml-auto h-4 w-4 text-[#F18F01]" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-rocket-gray-900">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="text-rocket-blue-500 font-medium mb-2 block text-black">How It Works</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
                Simple, Effective Legal Solutions
              </h2>
              <p className="text-lg text-black max-w-3xl mx-auto">
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
                <h3 className="text-xl font-semibold mb-2 text-black">Post Your Legal Need</h3>
                <p className="text-black">
                  Describe your legal requirements and we'll match you with the right professionals.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-rocket-blue-50 dark:bg-rocket-blue-900/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <MessageCircle className="h-8 w-8 text-[#F18F01]" />
                  <span className="absolute -top-2 -right-2 bg-[#F18F01] text-white h-6 w-6 rounded-full flex items-center justify-center text-sm font-medium">
                    2
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-black">Receive Proposals</h3>
                <p className="text-black">
                  Review custom proposals from qualified attorneys with transparent pricing.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-rocket-blue-50 dark:bg-rocket-blue-900/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <Check className="h-8 w-8 text-[#F18F01]" />
                  <span className="absolute -top-2 -right-2 bg-[#F18F01] text-white h-6 w-6 rounded-full flex items-center justify-center text-sm font-medium">
                    3
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-black">Hire & Collaborate</h3>
                <p className="text-black">
                  Select your attorney and work together through our secure platform.
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
        
        {/* Featured Attorneys Section */}
        <section className="py-16 md:py-24 bg-rocket-gray-50 dark:bg-rocket-gray-800/30">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="text-rocket-blue-500 font-medium mb-2 block text-black">Our Attorneys</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
                Meet Our Featured Legal Professionals
              </h2>
              <p className="text-lg text-black max-w-3xl mx-auto">
                Experienced attorneys ready to help with your legal needs
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((id) => (
                <div key={id} className="bg-white dark:bg-rocket-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-rocket-gray-200 dark:border-rocket-gray-700">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-16 w-16 rounded-full bg-rocket-blue-100 flex items-center justify-center text-rocket-blue-500 text-xl font-bold">
                        {['JD', 'ML', 'AT'][id-1]}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-black">{['Jane Doe', 'Mark Lewis', 'Alice Thompson'][id-1]}</h3>
                        <p className="text-rocket-gray-600">{['Business Law', 'Intellectual Property', 'Real Estate Law'][id-1]}</p>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                          ))}
                          <span className="ml-1 text-sm text-rocket-gray-600">(25+ reviews)</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-[#F18F01]" />
                        <span className="text-sm text-black">Top 5% of attorneys</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[#F18F01]" />
                        <span className="text-sm text-black">10+ years experience</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#F18F01]" />
                        <span className="text-sm text-black">{['New York, NY', 'San Francisco, CA', 'Chicago, IL'][id-1]}</span>
                      </div>
                    </div>
                    <Link to={`/attorneys/${id}`}>
                      <Button variant="outline" className="w-full border-[#F18F01] text-[#F18F01] hover:bg-[#F18F01] hover:text-white">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Link to="/attorneys">
                <Button variant="orange" className="hover:bg-[#D17701] shadow-md">
                  Browse all attorneys <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <Testimonials />
        
        {/* Browse by Location Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-rocket-gray-900">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="text-rocket-blue-500 font-medium mb-2 block text-black">Legal Services Nationwide</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
                Find Legal Help By Location
              </h2>
              <p className="text-lg text-black max-w-3xl mx-auto">
                Connect with attorneys in your area or anywhere in the country
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "New York", "California", "Texas", "Illinois", 
                "Florida", "Pennsylvania", "Ohio", "Georgia",
                "Massachusetts", "Washington", "Colorado", "See All States"
              ].map(state => (
                <Link 
                  key={state} 
                  to={state === "See All States" ? "/locations" : `/locations/${state.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-white dark:bg-rocket-gray-800 border border-rocket-gray-200 dark:border-rocket-gray-700 rounded-lg p-4 flex items-center justify-between hover:bg-rocket-blue-50 dark:hover:bg-rocket-blue-900/10 transition-colors"
                >
                  <span className="flex items-center text-black">
                    <MapPin className="h-4 w-4 mr-2 text-[#F18F01]" />
                    {state}
                  </span>
                  {state !== "See All States" ? (
                    <ChevronRight className="h-4 w-4 text-[#F18F01]" />
                  ) : (
                    <ArrowRight className="h-4 w-4 text-[#F18F01]" />
                  )}
                </Link>
              ))}
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
