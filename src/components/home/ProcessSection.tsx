
import { memo, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Fingerprint,
  MessageSquare,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const ProcessCard = memo(({ 
  icon: Icon, 
  title, 
  description, 
  step,
  delay 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  step: number;
  delay: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div 
      ref={cardRef}
      className={`relative bg-gradient-to-br from-white to-gray-50 dark:from-rocket-gray-800 dark:to-rocket-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-rocket-gray-700 p-8 md:p-10 transition-all duration-700 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      } hover:-translate-y-2`}
    >
      <div className="absolute top-0 right-0 w-20 h-20 flex items-center justify-center rotate-12 -mt-4 -mr-4">
        <div className="relative">
          <div className="absolute inset-0 bg-bright-orange-400 rounded-full animate-ping opacity-20"></div>
          <div className="relative bg-bright-orange-500 text-white text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
            {step}
          </div>
        </div>
      </div>
      
      <div className="flex flex-col">
        <div className="bg-[#FDE1D3] rounded-xl p-5 mb-6 w-16 h-16 flex items-center justify-center">
          <Icon className="h-8 w-8 text-[#F18F01]" />
        </div>
        
        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-black dark:text-white">{title}</h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
        
        <div className="mt-auto">
          <Link to="/how-it-works" className="inline-flex items-center text-bright-orange-500 hover:text-bright-orange-600 font-medium group">
            Learn more <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
});

ProcessCard.displayName = 'ProcessCard';

const ProcessSection = () => {
  const processes = [
    {
      icon: FileText,
      title: "Select Your Document",
      description: "Browse our extensive library of legal documents and select the one that fits your needs.",
      step: 1
    },
    {
      icon: Fingerprint,
      title: "Personalize & Complete",
      description: "Fill in your information and answer simple questions to customize your document.",
      step: 2
    },
    {
      icon: CheckCircle,
      title: "Sign & Download",
      description: "Review your document, sign it electronically, and download the final version instantly.",
      step: 3
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-rocket-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="inline-block bg-bright-orange-100 text-bright-orange-600 font-medium px-4 py-1 rounded-full text-sm mb-3">Our Process</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">
            How Legal Gram Works
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Creating legal documents has never been easier. Follow our simple three-step process.
          </p>
        </div>
        
        <div className="relative">
          {/* Connecting line between process steps */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-bright-orange-300 to-bright-orange-500 hidden lg:block -translate-y-1/2 z-0"></div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative z-10">
            {processes.map((process, index) => (
              <ProcessCard
                key={index}
                icon={process.icon}
                title={process.title}
                description={process.description}
                step={process.step}
                delay={index * 200}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center mt-16">
          <Link to="/signup">
            <Button variant="orange" size="lg" className="px-10 py-7 h-auto text-lg shadow-lg hover:shadow-xl hover:transform hover:scale-105 transition-all">
              Get started today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default memo(ProcessSection);
