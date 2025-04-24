
import { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, UserCheck, FileCheck } from "lucide-react";

const GettingStartedSection = () => {
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const section = document.getElementById("getting-started");
    if (section) observer.observe(section);
    
    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      icon: UserCheck,
      title: "Create Your Account",
      description: "Sign up in less than 2 minutes with your email or social accounts",
      linkText: "Sign up now",
      linkTo: "/signup"
    },
    {
      icon: FileText,
      title: "Select Your Document",
      description: "Browse our library of professional legal documents and templates",
      linkText: "Browse documents",
      linkTo: "/documents"
    },
    {
      icon: FileCheck,
      title: "Complete & Download",
      description: "Answer a few questions and your document is ready to use",
      linkText: "See how it works",
      linkTo: "/how-it-works"
    }
  ];

  return (
    <section id="getting-started" className="py-20 md:py-28 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="inline-block bg-bright-orange-100 text-bright-orange-600 font-medium px-4 py-1 rounded-full text-sm mb-3">
            Getting Started Is Easy
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">
            Three Simple Steps
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Creating your legal documents has never been easier
          </p>
        </div>
        
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-bright-orange-300/0 via-bright-orange-300 to-bright-orange-300/0 transform -translate-y-1/2 z-0"></div>
          
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all"
              >
                <div className="mb-6 relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-bright-orange-500 to-bright-orange-600 flex items-center justify-center mx-auto shadow-lg">
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-4 -right-4 bg-rocket-blue-600 text-white h-8 w-8 rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">{step.title}</h3>
                <p className="text-gray-600 mb-6">{step.description}</p>
                <Link 
                  to={step.linkTo} 
                  className="inline-flex items-center text-bright-orange-500 hover:text-bright-orange-600 font-medium group"
                >
                  <span>{step.linkText}</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <img 
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2000&auto=format&fit=crop" 
            alt="Professional signing documents" 
            className="w-full h-80 object-cover rounded-xl shadow-lg mb-8"
          />
          <Link 
            to="/documents" 
            className="inline-flex items-center justify-center bg-bright-orange-500 text-white px-8 py-4 rounded-lg font-medium hover:bg-bright-orange-600 transition-colors shadow-md"
          >
            <span>Get started with your document</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default memo(GettingStartedSection);
