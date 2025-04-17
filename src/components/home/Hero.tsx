
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, MessageSquare, ArrowRight, Check } from "lucide-react";
import { memo, useState, useEffect } from "react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-gradient-to-br from-rocket-blue-500 to-rocket-blue-700 text-white relative min-h-[80vh] flex items-center transition-all duration-500">
      {/* Optimized background pattern with reduced opacity */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
      </div>

      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-rocket-blue-400/10 blur-3xl animate-float will-change-transform"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-rocket-blue-300/10 blur-3xl animate-float will-change-transform" style={{ animationDelay: "1s" }}></div>
      
      <div className="container-custom py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 transition-all duration-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Quality legal services made simple
            </h1>
            <p className="text-xl md:text-2xl text-rocket-gray-100 leading-relaxed max-w-lg">
              Connect with top attorneys for your business and personal legal needs
            </p>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 text-lg">
                <Check className="text-white" size={22} />
                <span className="font-light">Vetted attorneys with proven expertise</span>
              </div>
              <div className="flex items-center gap-2 text-lg">
                <Check className="text-white" size={22} />
                <span className="font-light">Clear, upfront pricing - no surprises</span>
              </div>
              <div className="flex items-center gap-2 text-lg">
                <Check className="text-white" size={22} />
                <span className="font-light">Quick responses to your legal questions</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <Link to="/post-job" className="flex-1">
                <Button size="lg" variant="orange" className="w-full shadow-lg dark:shadow-blue-900/20 px-8 py-6 text-lg h-auto hover:bg-bright-orange-600 animate-pulse">
                  Post a Job
                </Button>
              </Link>
              <Link to="/contact-lawyer" className="flex-1">
                <Button size="lg" variant="outline" className="w-full border-white text-white hover:bg-white/10 px-8 py-6 text-lg h-auto">
                  Browse Services
                </Button>
              </Link>
            </div>
            
            <p className="text-sm text-rocket-gray-200">
              Trusted by 25,000+ businesses, from startups to Fortune 500 companies
            </p>
          </div>
          
          <div className={`transition-all duration-1000 transform ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold mb-4">What can we help you with?</h3>
              <div className="space-y-4">
                {[
                  { icon: FileText, text: "Business Formation" },
                  { icon: FileText, text: "Contract Review" },
                  { icon: FileText, text: "Trademark Registration" },
                  { icon: FileText, text: "Employment Agreements" },
                  { icon: FileText, text: "Patent Application" }
                ].map((item, index) => (
                  <Link key={index} to={`/services/${item.text.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 gap-3"
                  >
                    <item.icon className="text-[#F18F01]" size={20} />
                    <span>{item.text}</span>
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Link>
                ))}
              </div>
              <Link to="/services" className="mt-4 flex justify-center">
                <Button variant="ghost" className="text-rocket-gray-200 hover:text-white mt-4">
                  See all services <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white/5 to-transparent"></div>
    </section>
  );
};

export default memo(Hero);
