import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, Scale, ChevronRight, Award } from "lucide-react";

interface HeroSectionProps {
  isAuthenticated: boolean;
}

const HeroSection = ({ isAuthenticated }: HeroSectionProps) => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/97408c62-dad7-4243-bb40-15c826e9ba0a.png" 
          alt="Legal document background" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/80"></div>
      </div>
      
      <div className="container-custom relative z-10 py-20 md:py-28">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-[#F97316]/90 to-[#FFBB66]/90 px-5 py-2 rounded-full mb-6 text-white text-sm font-semibold shadow-lg transform hover:scale-105 transition-all duration-300">
            <Shield className="h-4 w-4 mr-2" />
            ATTORNEY-APPROVED LEGAL TEMPLATES
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight tracking-tight animate-fade-in">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-200">Professional</span> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F97316] to-[#FFBB66] px-3">Legal</span> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-200">Documents</span>
          </h1>
          
          <div className="h-1.5 w-32 bg-gradient-to-r from-[#F97316] to-[#FFBB66] mx-auto my-8 rounded-full shadow-glow"></div>
          
          <p className="text-xl leading-relaxed text-white/90 max-w-3xl mx-auto mb-8 animate-fade-in delay-100">
            Browse our comprehensive collection of attorney-drafted legal templates designed to protect 
            your interests. Customize, download, and use within minutes.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center px-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 text-white">
              <Award className="h-5 w-5 mr-3 text-[#F97316]" />
              <span className="font-medium text-white">Attorney-reviewed</span>
            </div>
            <div className="flex items-center px-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 text-white">
              <CheckCircle className="h-5 w-5 mr-3 text-[#F97316]" />
              <span className="font-medium text-white">Easy customization</span>
            </div>
            <div className="flex items-center px-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 text-white">
              <Scale className="h-5 w-5 mr-3 text-[#F97316]" />
              <span className="font-medium text-white">Legal compliance</span>
            </div>
          </div>
          
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Link to="/login">
                <Button size="lg" className="w-full sm:w-auto bg-[#F97316] hover:bg-[#D15316] text-white shadow-xl shadow-[#F97316]/20 border border-[#F97316] px-8 group">
                  <span>Get Started Now</span>
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/signup">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto border-white/70 text-white hover:bg-white/30 px-8 font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <span>Sign up for Free</span>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default HeroSection;
