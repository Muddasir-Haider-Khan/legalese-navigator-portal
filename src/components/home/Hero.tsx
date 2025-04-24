
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, Check } from "lucide-react";
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
    <section className="relative min-h-[85vh] flex items-center overflow-hidden transition-all duration-500">
      <div 
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <img 
          src="/lovable-uploads/a5f2d63e-9556-45d9-a3cc-f9c6a97852df.png" 
          alt="Lady Justice statue" 
          className="w-full h-full object-cover opacity-20"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/85"></div>
      </div>

      <div className="container-custom py-16 md:py-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 transition-all duration-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-black">
              Legal Made Simple
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-lg">
              Legal documents and attorney advice when you need them.
            </p>
            
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-base group">
                <span className="bg-bright-orange-500/15 rounded-full p-1">
                  <Check className="text-bright-orange-500" size={18} />
                </span>
                <span className="text-gray-700">Create legal documents in minutes</span>
              </div>
              <div className="flex items-center gap-3 text-base group">
                <span className="bg-bright-orange-500/15 rounded-full p-1">
                  <Check className="text-bright-orange-500" size={18} />
                </span>
                <span className="text-gray-700">Consult with attorneys at an affordable price</span>
              </div>
              <div className="flex items-center gap-3 text-base group">
                <span className="bg-bright-orange-500/15 rounded-full p-1">
                  <Check className="text-bright-orange-500" size={18} />
                </span>
                <span className="text-gray-700">Start an LLC or incorporate your business</span>
              </div>
            </div>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link to="/documents">
                <Button size="lg" variant="orange" className="w-full sm:w-auto shadow-md px-6 py-6 h-auto text-white">
                  Make a Document
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact-lawyer">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-bright-orange-500 text-bright-orange-500">
                  Talk to a Lawyer
                </Button>
              </Link>
            </div>
          </div>
          
          <div className={`transition-all duration-1000 transform ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/f71dcb3e-44f6-47f2-a368-b65778dfe4da.png"
                alt="Person signing legal documents"
                className="w-full h-auto object-cover"
                loading="eager"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
                <div className="flex items-center gap-3">
                  <FileText className="text-white" size={24} />
                  <span className="text-white font-semibold">Document Creation Made Easy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);
