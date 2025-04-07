
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Set loaded after a small delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <div className={`w-full transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative">
          <Hero />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Features />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Testimonials />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <CTASection />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
