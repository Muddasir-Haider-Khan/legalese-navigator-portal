
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
    <section className="bg-gradient-to-br from-rocket-blue-500 to-rocket-blue-700 text-white relative min-h-[90vh] flex items-center transition-all duration-500">
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Legal made simple
            </h1>
            <p className="text-xl md:text-2xl text-rocket-gray-100 leading-relaxed max-w-lg">
              Affordable legal services for your family and business
            </p>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 text-lg">
                <Check className="text-white" size={22} />
                <span className="font-light">Create legal documents in minutes</span>
              </div>
              <div className="flex items-center gap-2 text-lg">
                <Check className="text-white" size={22} />
                <span className="font-light">Consult with attorneys at an affordable price</span>
              </div>
              <div className="flex items-center gap-2 text-lg">
                <Check className="text-white" size={22} />
                <span className="font-light">Start an LLC or incorporate your business</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Link to="/documents" className="sm:col-span-1">
                <Button size="lg" className="w-full bg-white text-rocket-blue-600 hover:bg-rocket-gray-100 shadow-lg dark:shadow-blue-900/20 px-8 py-6 text-lg h-auto">
                  Create a document
                </Button>
              </Link>
              <Link to="/services" className="sm:col-span-1">
                <Button size="lg" variant="outline" className="w-full border-2 bg-transparent border-white text-white hover:bg-rocket-blue-600/50 px-8 py-6 text-lg h-auto">
                  Explore services
                </Button>
              </Link>
            </div>
          </div>
          
          <div className={`hidden lg:flex flex-col gap-8 glass-card backdrop-blur-lg bg-white/10 rounded-xl p-8 border border-white/20 shadow-2xl transition-all duration-1000 transform ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src={`https://images.unsplash.com/photo-1649972904349-6e44c42644a7`} 
                alt="Legal Services" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <img 
                src={`https://images.unsplash.com/photo-1488590528505-98d2b5aba04b`} 
                alt="Business Consultation" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <img 
                src={`https://images.unsplash.com/photo-1581091226825-a6a2a5aee158`} 
                alt="Document Preparation" 
                className="w-full h-48 object-cover rounded-lg col-span-2"
              />
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-2xl font-semibold mb-4">Talk to a lawyer</h3>
              <p className="text-rocket-gray-200 mb-4">Get quick legal advice from experienced attorneys</p>
              <Link to="/ask-a-lawyer" className="inline-flex items-center text-white hover:text-rocket-gray-200 transition-colors">
                <span>Get legal advice</span>
                <ArrowRight size={16} className="ml-2" />
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

