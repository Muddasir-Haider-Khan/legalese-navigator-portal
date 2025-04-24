
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
    <section id="why-choose-us" className="py-20 md:py-28 bg-gradient-to-b from-white to-[#F8F9FF]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="inline-block bg-bright-orange-100 text-bright-orange-600 font-medium px-4 py-1 rounded-full text-sm mb-3">
            Why Choose Legal Gram
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">
            The Smart Choice for Legal Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience the difference with our customer-focused approach to legal services
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 group"
            >
              <div className="mb-6">
                <div className="w-16 h-16 rounded-full bg-bright-orange-50 flex items-center justify-center group-hover:bg-bright-orange-100 transition-colors">
                  <reason.icon className="h-8 w-8 text-bright-orange-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-black group-hover:text-bright-orange-500 transition-colors">
                {reason.title}
              </h3>
              <p className="text-gray-600">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-rocket-blue-500 to-rocket-blue-700 rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-bright-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-rocket-blue-300/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center md:text-left md:flex items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Ready for professional legal help?
              </h3>
              <p className="text-white/80 text-lg">
                Get started today with our easy-to-use legal services.
              </p>
            </div>
            <a href="/signup" className="inline-block px-8 py-4 bg-white text-rocket-blue-600 rounded-lg font-medium hover:bg-bright-orange-50 transition-colors shadow-lg">
              Create an Account
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(WhyChooseUsSection);
