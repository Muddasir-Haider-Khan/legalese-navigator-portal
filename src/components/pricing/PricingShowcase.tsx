
import React from 'react';
import { motion } from 'framer-motion';

const PricingShowcase = () => {
  return (
    <div className="bg-gradient-to-b from-white to-soft-peach-50 py-20">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-bright-orange-700 to-bright-orange-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Why Choose Our Legal Services?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Image Grid */}
          <motion.div 
            className="relative rounded-2xl overflow-hidden h-[400px] shadow-xl group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <img 
              src="/lovable-uploads/1f8a96c9-355f-497b-920e-316d33ebd70f.png"
              alt="Legal consultation"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
              <h3 className="text-white text-xl font-semibold">Expert Legal Consultation</h3>
            </div>
          </motion.div>

          <motion.div 
            className="relative rounded-2xl overflow-hidden h-[400px] shadow-xl group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <img 
              src="/lovable-uploads/a15560ff-00a1-40c0-a5de-5cafe5b99ddf.png"
              alt="Document review"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
              <h3 className="text-white text-xl font-semibold">Professional Document Review</h3>
            </div>
          </motion.div>

          <motion.div 
            className="relative rounded-2xl overflow-hidden h-[400px] shadow-xl group lg:col-span-1 md:col-span-2 lg:col-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <img 
              src="/lovable-uploads/f496de89-a48d-4b46-9988-c8eceaf8c789.png"
              alt="Legal advice"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
              <h3 className="text-white text-xl font-semibold">Personalized Legal Advice</h3>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PricingShowcase;
