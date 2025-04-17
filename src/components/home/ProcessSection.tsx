
import { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Fingerprint,
  FileText,
  MessageSquare,
  ArrowRight
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
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300 + (delay * 150));
    
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`bg-white dark:bg-rocket-gray-800 rounded-lg shadow-lg border border-rocket-gray-200 dark:border-rocket-gray-700 p-6 md:p-8 transition-all duration-700 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <div className="flex items-start gap-4 md:gap-6">
        <div className="bg-[#FDE1D3] rounded-lg p-4 md:p-5">
          <Icon className="h-6 w-6 text-[#F18F01]" />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl md:text-2xl font-bold text-black">{title}</h3>
            <span className="bg-primary text-white text-lg font-bold rounded-full w-8 h-8 flex items-center justify-center">
              {step}
            </span>
          </div>
          
          <p className="text-black mb-4">{description}</p>
          
          <Link to="/how-it-works" className="text-[#F18F01] hover:text-[#D17701] inline-flex items-center font-medium">
            Learn more <ArrowRight className="ml-1 h-4 w-4" />
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
      icon: MessageSquare,
      title: "Expert Review (Optional)",
      description: "Have an attorney review your document for additional peace of mind.",
      step: 3
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-rocket-blue-500 font-medium mb-2 block text-black">Our Process</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            How Legal Gram Works
          </h2>
          <p className="text-lg text-black max-w-3xl mx-auto">
            Creating legal documents has never been easier. Follow our simple process.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {processes.map((process, index) => (
            <ProcessCard
              key={index}
              icon={process.icon}
              title={process.title}
              description={process.description}
              step={process.step}
              delay={index}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/signup">
            <Button variant="orange" size="lg" className="px-8 shadow-md">
              Get started today
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default memo(ProcessSection);
