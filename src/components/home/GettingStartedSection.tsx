import { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, UserCheck, FileCheck } from "lucide-react";

const GettingStartedSection = () => {
  const [inView, setInView] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  
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

  // Automatic step highlighting
  useEffect(() => {
    if (inView) {
      let currentStep = 0;
      const interval = setInterval(() => {
        setActiveStep(currentStep);
        currentStep = (currentStep + 1) % 3;
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [inView]);

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
    <section id="getting-started" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="hidden lg:block absolute top-1/2 left-0 w-[80%] h-0.5 bg-gradient-to-r from-bright-orange-300/0 via-bright-orange-300 to-bright-orange-300/0 transform -translate-y-1/2 z-0"></div>
      <div className="absolute top-40 right-0 w-64 h-64 bg-bright-orange-100 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
      
      <div className="container-custom">
        <div className="text-center mb-16 relative z-10">
          <motion.span 
            className="inline-block bg-bright-orange-100 text-bright-orange-600 font-medium px-4 py-1 rounded-full text-sm mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Getting Started Is Easy
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-4 text-black"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-black">
              Three Simple Steps
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Creating your legal documents has never been easier
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default memo(GettingStartedSection);
