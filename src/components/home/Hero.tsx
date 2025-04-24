import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, MessageSquare, ArrowRight, Check } from "lucide-react";
import { memo, useState, useEffect } from "react";
import HeroBackgroundSlideshow from "./HeroBackgroundSlideshow";

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
      <HeroBackgroundSlideshow />

      <div className="absolute inset-0 z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiIG9wYWNpdHk9IjAuOCIvPjwvc3ZnPg==')] opacity-80 backdrop-blur-[2.8px]"></div>
      </div>

      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-bright-orange-500/10 blur-3xl animate-float will-change-transform z-10"></div>
      <div className="absolute bottom-40 right-20 w-96 h-96 rounded-full bg-rocket-blue-300/10 blur-3xl animate-float will-change-transform z-10" style={{ animationDelay: "1s" }}></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-bright-orange-300/5 blur-3xl animate-float will-change-transform z-10" style={{ animationDelay: "1.5s" }}></div>
      
      <div className="container-custom py-16 md:py-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 transition-all duration-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-block rounded-full bg-white backdrop-blur-sm px-4 py-1 border border-white/20 mb-4">
              <span className="text-sm font-medium text-black">Professional Legal Solutions</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-bright-orange-500">Legal made simple</span>
            </h1>
            <p className="text-xl md:text-2xl text-white leading-relaxed max-w-lg">
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
                <Button 
                  size="lg" 
                  variant="signup" 
                  className="w-full px-8 py-7 text-lg h-auto hover:scale-[1.02] transition-all group"
                >
                  Create a document
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="mt-3 text-sm text-black/80">Trusted legal help at your fingertips</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white/10 to-transparent"></div>
    </section>
  );
};

export default memo(Hero);
