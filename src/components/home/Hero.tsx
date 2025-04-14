
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
    <section className="bg-gradient-to-br from-bright-red-500 to-pink-red-600 relative min-h-[90vh] flex items-center transition-all duration-500">
      {/* Optimized background pattern with reduced opacity */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
      </div>

      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-soft-pink-400/20 blur-3xl animate-float will-change-transform"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-pink-red-400/20 blur-3xl animate-float will-change-transform" style={{ animationDelay: "1s" }}></div>
      
      <div className="container-custom py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 transition-all duration-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Legal made simple
            </h1>
            <p className="text-xl md:text-2xl text-white leading-relaxed max-w-lg">
              Affordable legal services for your family and business
            </p>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 text-lg">
                <Check className="text-white" size={22} />
                <span className="font-light text-white">Create legal documents in minutes</span>
              </div>
              <div className="flex items-center gap-2 text-lg">
                <Check className="text-white" size={22} />
                <span className="font-light text-white">Consult with attorneys at an affordable price</span>
              </div>
              <div className="flex items-center gap-2 text-lg">
                <Check className="text-white" size={22} />
                <span className="font-light text-white">Start an LLC or incorporate your business</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Link to="/documents" className="sm:col-span-1">
                <Button size="lg" className="w-full bg-white text-bright-red-600 hover:bg-gray-100 shadow-lg px-8 py-6 text-lg h-auto">
                  Create a document
                </Button>
              </Link>
              <Link to="/services" className="sm:col-span-1">
                <Button size="lg" variant="outline" className="w-full border-2 bg-transparent border-white text-white hover:bg-pink-red-600/50 px-8 py-6 text-lg h-auto">
                  Explore services
                </Button>
              </Link>
            </div>
          </div>
          
          <div className={`hidden lg:block glass-card backdrop-blur-lg bg-white/10 rounded-xl p-6 border border-white/20 shadow-2xl transition-all duration-1000 transform ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src="/lovable-uploads/32617276-d4d0-4419-bffd-02f96a981caf.png" 
                  alt="Digital Legal Gavel"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src="/lovable-uploads/a24da495-7093-4924-a981-c01c5e1780df.png" 
                  alt="Wooden Gavel"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src="/lovable-uploads/9c117bfb-191c-4585-8bb1-55c62e7fd0ed.png" 
                  alt="Professional in Suit"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src="/lovable-uploads/1f5c79d6-8f2a-4ed2-b3b5-ff3cf25c6b1e.png" 
                  alt="Lady Justice Statue"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <h3 className="text-xl font-semibold mb-2 text-white">Comprehensive Legal Support</h3>
              <p className="text-white">Access professional legal services from document preparation to attorney consultations.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white/5 to-transparent"></div>
    </section>
  );
};

export default memo(Hero);
