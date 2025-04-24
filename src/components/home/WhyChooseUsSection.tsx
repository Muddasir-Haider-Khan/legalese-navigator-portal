
import { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  Clock, 
  BadgeCheck, 
  Scale, 
  Users,
  Award
} from "lucide-react";

const WhyChooseUsSection = () => {
  const [inView, setInView] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
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
    
    const section = document.getElementById("why-choose-us");
    if (section) observer.observe(section);
    
    return () => observer.disconnect();
  }, []);

  const reasons = [
    {
      icon: Shield,
      title: "Secure & Confidential",
      description: "Your legal information is protected with enterprise-grade security and encryption."
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "Create legal documents in minutes instead of hours with our streamlined process."
    },
    {
      icon: BadgeCheck,
      title: "Attorney-Reviewed",
      description: "All documents and services are created and reviewed by qualified attorneys."
    },
    {
      icon: Scale,
      title: "Legal Compliance",
      description: "Our documents are continuously updated to comply with current laws and regulations."
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Get help from our team of legal professionals whenever you need it."
    },
    {
      icon: Award,
      title: "Trusted by Millions",
      description: "Join the millions of individuals and businesses who trust us with their legal needs."
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 md:py-28 bg-gradient-to-b from-white to-[#F8F9FF] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-bright-orange-100 rounded-full opacity-30 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-40 left-0 w-96 h-96 bg-blue-100 rounded-full opacity-30 blur-3xl -translate-x-1/2"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            className="inline-block bg-bright-orange-100 text-bright-orange-600 font-medium px-4 py-1 rounded-full text-sm mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Why Choose Legal Gram
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-4 text-black"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="bg-gradient-to-r from-bright-orange-500 to-rocket-blue-600 bg-clip-text text-transparent">
              The Smart Choice
            </span> for Legal Solutions
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Experience the difference with our customer-focused approach to legal services
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative overflow-hidden bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Animated background gradient */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br from-bright-orange-50 via-white to-rocket-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>
              
              {/* Decorative circle */}
              <div 
                className={`absolute -right-12 -bottom-12 w-40 h-40 rounded-full bg-gradient-to-br from-bright-orange-100 to-bright-orange-200 opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
              ></div>
              
              <div className="relative z-10">
                <div className="mb-6 transform transition-transform duration-300 group-hover:scale-110">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-bright-orange-500 to-bright-orange-600 flex items-center justify-center shadow-lg">
                    <reason.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-black group-hover:text-bright-orange-600 transition-colors">
                  {reason.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                  {reason.description}
                </p>
                
                {/* Animated border on hover */}
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-bright-orange-500 to-bright-orange-300 transition-all duration-300 ${hoveredIndex === index ? 'w-full' : 'w-0'}`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="bg-gradient-to-r from-rocket-blue-600 to-rocket-blue-800 rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-bright-orange-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-rocket-blue-300/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-white/5 rotate-45 blur-xl"></div>
            
            <div className="relative z-10 text-center md:text-left md:flex items-center justify-between">
              <div className="mb-6 md:mb-0 md:max-w-md">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Ready for professional legal help?
                </h3>
                <p className="text-white/80 text-lg">
                  Get started today with our easy-to-use legal services.
                </p>
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-bright-orange-500 to-bright-orange-300 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <a 
                  href="/signup" 
                  className="relative flex items-center gap-2 px-8 py-4 bg-white text-rocket-blue-600 rounded-lg font-medium hover:bg-bright-orange-50 transition-colors shadow-lg group-hover:shadow-xl"
                >
                  <span>Create an Account</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(WhyChooseUsSection);
