
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, MessageSquare, ArrowRight, Check } from "lucide-react";
import { memo, useState, useEffect } from "react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);
    
    const handleScroll = () => {
      setParallaxOffset(window.scrollY * 0.2);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden transition-all duration-500">
      <div 
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <img 
          src="/lovable-uploads/a5f2d63e-9556-45d9-a3cc-f9c6a97852df.png" 
          alt="Lady Justice statue" 
          className="w-full h-full object-cover opacity-30"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-rocket-blue-600/95 to-rocket-blue-900/95"></div>
      </div>

      <div className="absolute inset-0 opacity-8 z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
      </div>

      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-bright-orange-500/10 blur-3xl animate-float will-change-transform z-10"></div>
      <div className="absolute bottom-40 right-20 w-96 h-96 rounded-full bg-rocket-blue-300/10 blur-3xl animate-float will-change-transform z-10" style={{ animationDelay: "1s" }}></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-bright-orange-300/5 blur-3xl animate-float will-change-transform z-10" style={{ animationDelay: "1.5s" }}></div>
      
      <div className="container-custom py-16 md:py-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 transition-all duration-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-block rounded-full bg-bright-orange-400 backdrop-blur-sm px-4 py-1 border border-white/20 mb-4">
              <span className="text-sm font-medium text-white">Professional Legal Solutions</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-bright-orange-600">Legal made simple</span>
            </h1>
            <p className="text-xl md:text-2xl text-black leading-relaxed max-w-lg">
              Affordable legal services for your family and business
            </p>
            
            <div className="space-y-4 pt-2 bg-bright-orange-500/10 p-6 rounded-xl backdrop-blur-sm border border-bright-orange-500/20">
              <div className="flex items-center gap-3 text-lg group hover:translate-x-1 transition-transform">
                <span className="bg-bright-orange-500/20 rounded-full p-1">
                  <Check className="text-bright-orange-400" size={22} />
                </span>
                <span className="font-light text-black">Create legal documents in minutes</span>
              </div>
              <div className="flex items-center gap-3 text-lg group hover:translate-x-1 transition-transform">
                <span className="bg-bright-orange-500/20 rounded-full p-1">
                  <Check className="text-bright-orange-400" size={22} />
                </span>
                <span className="font-light text-black">Consult with attorneys at an affordable price</span>
              </div>
              <div className="flex items-center gap-3 text-lg group hover:translate-x-1 transition-transform">
                <span className="bg-bright-orange-500/20 rounded-full p-1">
                  <Check className="text-bright-orange-400" size={22} />
                </span>
                <span className="font-light text-black">Start an LLC or incorporate your business</span>
              </div>
            </div>
            
            <div className="pt-6">
              <Link to="/documents" className="flex flex-col items-center">
                <Button size="lg" variant="orange" className="w-full shadow-lg dark:shadow-blue-900/20 px-8 py-7 text-lg h-auto hover:bg-bright-orange-600 hover:scale-[1.02] transition-all group">
                  Create a document
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="mt-3 text-sm text-black/80">Trusted legal help at your fingertips</p>
              </Link>
            </div>
          </div>
          
          <div className={`transition-all duration-1000 transform ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <div className="relative rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm border border-white/10">
              <img 
                src="/lovable-uploads/f71dcb3e-44f6-47f2-a368-b65778dfe4da.png"
                alt="Person signing legal documents"
                className="w-full h-auto object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rocket-blue-900/60 to-transparent pointer-events-none"></div>
              
              <div className="absolute top-4 right-4 bg-bright-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                Professional Services
              </div>
            </div>
            <div className="mt-6 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 transform hover:translate-y-[-5px] transition-transform duration-300">
              <h3 className="text-xl font-bold text-black">Professional Document Preparation</h3>
              <p className="text-black/80 mt-2">Create, sign, and manage your legal documents with our easy-to-use platform</p>
              <div className="mt-3 flex gap-2">
                <span className="inline-block bg-white/20 rounded-full px-3 py-1 text-xs text-black">Fast</span>
                <span className="inline-block bg-white/20 rounded-full px-3 py-1 text-xs text-black">Secure</span>
                <span className="inline-block bg-white/20 rounded-full px-3 py-1 text-xs text-black">Professional</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white/10 to-transparent"></div>
    </section>
  );
};

export default memo(Hero);
