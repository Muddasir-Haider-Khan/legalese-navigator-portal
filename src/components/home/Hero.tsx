
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, MessageSquare, ArrowRight, Scale } from "lucide-react";
import { memo } from "react";

// Memoize feature items to prevent unnecessary re-renders
const FeatureItem = memo(({ 
  icon: Icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  delay: string;
}) => (
  <div className="flex items-start gap-4 group animate-slide-in-right" style={{ animationDelay: delay }}>
    <div className="bg-white/20 p-3 rounded-lg group-hover:bg-white/30 transition-colors duration-300">
      <Icon size={24} className="text-white group-hover:scale-110 transition-transform" />
    </div>
    <div>
      <h3 className="font-semibold text-lg group-hover:text-rocket-gray-100 transition-colors">{title}</h3>
      <p className="text-rocket-gray-200 mt-1 group-hover:text-white/90 transition-colors">
        {description}
      </p>
    </div>
  </div>
));

FeatureItem.displayName = 'FeatureItem';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-rocket-blue-500 to-rocket-blue-700 text-white relative min-h-[90vh] flex items-center">
      {/* Optimized background pattern with reduced opacity */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
      </div>

      {/* Optimized animated circles with will-change property */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-rocket-blue-400/10 blur-3xl animate-float will-change-transform"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-rocket-blue-300/10 blur-3xl animate-float will-change-transform" style={{ animationDelay: "1s" }}></div>
      
      <div className="container-custom py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-in">
            <span className="bg-white/10 text-white px-4 py-1 rounded-full inline-block backdrop-blur-sm border border-white/10 mb-2 animate-pulse">Trusted by over 10,000+ clients</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Start Your <span className="text-gradient relative">Legal Journey</span> With Confidence
            </h1>
            <p className="text-lg md:text-xl text-rocket-gray-100 leading-relaxed max-w-lg">
              Create legal documents, get expert advice, and access resources to solve your legal needs quickly and affordably.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link to="/documents" className="group">
                <Button size="lg" className="bg-white text-rocket-blue-500 hover:bg-rocket-gray-100 gap-2 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:translate-y-[-2px]">
                  Make Documents
                  <FileText size={18} className="transition-transform group-hover:scale-110"/>
                </Button>
              </Link>
              <Link to="/advice" className="group">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-rocket-blue-600 gap-2 shadow-md hover:shadow-lg transition-all duration-300 group-hover:translate-y-[-2px]">
                  Get Legal Advice
                  <MessageSquare size={18} className="transition-transform group-hover:scale-110"/>
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block glass-card backdrop-blur-lg bg-white/10 rounded-xl p-8 border border-white/20 shadow-2xl animate-scale-in hover:shadow-glow transition-all duration-500">
            <div className="space-y-8">
              <FeatureItem 
                icon={FileText} 
                title="Create Legal Documents" 
                description="Generate professional legal documents tailored to your needs"
                delay="0.1s"
              />
              
              <FeatureItem 
                icon={MessageSquare} 
                title="Legal Advice Chat" 
                description="Get guidance for your specific legal situation"
                delay="0.2s"
              />
              
              <FeatureItem 
                icon={Scale} 
                title="Expert Consultation" 
                description="Connect with qualified legal professionals"
                delay="0.3s"
              />
              
              <Link to="/services" className="flex items-center gap-2 text-white hover:text-rocket-gray-200 transition-colors group">
                See all our services 
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
