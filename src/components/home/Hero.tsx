
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, MessageSquare, ArrowRight, Shield, Scale } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-rocket-blue-500 to-rocket-blue-700 text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
      </div>
      
      <div className="container-custom py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-in">
            <h1 className="heading-lg">
              Get Legal Help <span className="text-rocket-gray-100">Instantly</span>
            </h1>
            <p className="text-lg md:text-xl text-rocket-gray-100 leading-relaxed max-w-lg">
              Create legal documents, get expert advice, and access resources to solve your legal needs quickly and affordably.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link to="/documents" className="animate-hover-float">
                <Button size="lg" className="bg-white text-rocket-blue-500 hover:bg-rocket-gray-100 gap-2 shadow-lg hover:shadow-xl transition-all duration-300">
                  Make Documents
                  <FileText size={18} className="animate-float"/>
                </Button>
              </Link>
              <Link to="/advice" className="animate-hover-float">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-rocket-blue-600 gap-2 shadow-md hover:shadow-lg transition-all duration-300">
                  Get Legal Advice
                  <MessageSquare size={18} className="animate-float"/>
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block glass-card backdrop-blur-lg bg-white/10 rounded-lg p-8 border border-white/20 shadow-2xl animate-scale-in">
            <div className="space-y-8">
              <div className="flex items-start gap-4 group animate-slide-in-right" style={{ animationDelay: "0.1s" }}>
                <div className="bg-white/20 p-3 rounded-lg group-hover:bg-white/30 transition-colors duration-300">
                  <FileText size={24} className="text-white group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-rocket-gray-100 transition-colors">Create Legal Documents</h3>
                  <p className="text-rocket-gray-200 mt-1 group-hover:text-white/90 transition-colors">
                    Generate professional legal documents tailored to your needs
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
                <div className="bg-white/20 p-3 rounded-lg group-hover:bg-white/30 transition-colors duration-300">
                  <MessageSquare size={24} className="text-white group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-rocket-gray-100 transition-colors">Legal Advice Chat</h3>
                  <p className="text-rocket-gray-200 mt-1 group-hover:text-white/90 transition-colors">
                    Get guidance for your specific legal situation
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group animate-slide-in-right" style={{ animationDelay: "0.3s" }}>
                <div className="bg-white/20 p-3 rounded-lg group-hover:bg-white/30 transition-colors duration-300">
                  <Scale size={24} className="text-white group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-rocket-gray-100 transition-colors">Expert Consultation</h3>
                  <p className="text-rocket-gray-200 mt-1 group-hover:text-white/90 transition-colors">
                    Connect with qualified legal professionals
                  </p>
                </div>
              </div>
              
              <Link to="/service" className="flex items-center gap-2 text-white hover:text-rocket-gray-200 transition-colors group">
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

export default Hero;
