
import { memo, useState, useEffect } from "react";
import { Users, FileText, MessageSquare, Clock } from "lucide-react";

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { 
      icon: Users, 
      value: "20M+", 
      label: "Customers", 
      description: "People who trust our services"
    },
    { 
      icon: FileText, 
      value: "10M+", 
      label: "Documents", 
      description: "Legal documents created" 
    },
    { 
      icon: MessageSquare, 
      value: "500K+", 
      label: "Consultations", 
      description: "Legal advice sessions provided" 
    },
    { 
      icon: Clock, 
      value: "15+", 
      label: "Years", 
      description: "Of legal service experience" 
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-primary text-white relative">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-bright-orange-300 font-medium mb-2 block">Our Impact</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Millions Nationwide
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Our track record speaks for itself - millions of satisfied customers and counting.
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className={`text-center transition-all duration-1000 transform ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="mx-auto bg-white/10 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-8 w-8 text-bright-orange-400" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</h3>
                <p className="text-lg font-medium mb-1">{stat.label}</p>
                <p className="text-sm text-white/70">{stat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default memo(StatsSection);
