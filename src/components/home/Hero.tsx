
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
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/a5f2d63e-9556-45d9-a3cc-f9c6a97852df.png" 
          alt="Lady Justice statue" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-rocket-blue-500/90 to-rocket-blue-700/90"></div>
      </div>

      {/* Optimized background pattern with reduced opacity */}
      <div className="absolute inset-0 opacity-5 z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
      </div>

      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-rocket-blue-400/10 blur-3xl animate-float will-change-transform z-10"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-rocket-blue-300/10 blur-3xl animate-float will-change-transform z-10" style={{ animationDelay: "1s" }}></div>
      
      <div className="container-custom py-16 md:py-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 transition-all duration-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
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
            
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 pt-2">
              <Link to="/documents" className="sm:col-span-1 flex flex-col items-center">
                <Button size="lg" variant="orange" className="w-full shadow-lg dark:shadow-blue-900/20 px-8 py-6 text-lg h-auto hover:bg-bright-orange-600">
                  Create a document
                </Button>
                <p className="mt-2 text-sm text-rocket-gray-100">Trusted legal help on single touch</p>
              </Link>
            </div>
          </div>
          
          <div className={`transition-all duration-1000 transform ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <div className="relative rounded-lg shadow-2xl overflow-hidden">
              <img 
                src="/lovable-uploads/f71dcb3e-44f6-47f2-a368-b65778dfe4da.png"
                alt="Person signing legal documents"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rocket-blue-900/50 to-transparent pointer-events-none"></div>
            </div>
            <div className="mt-4 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/10 hidden md:block">
              <h3 className="text-lg font-semibold">Professional Document Preparation</h3>
              <p className="text-sm text-rocket-gray-100">Create, sign, and manage your legal documents with ease</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white/5 to-transparent"></div>
    </section>
  );
};

export default memo(Hero);
