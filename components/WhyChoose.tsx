
import React from 'react';
import { motion } from 'framer-motion';
import { FEATURES } from '../constants';

const WhyChoose: React.FC = () => {
  return (
    <section className="py-24 bg-white" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#112D4E] mb-4">Why Choose <span className="text-[#A7D129]">itcyanbu</span></h2>
          <div className="w-24 h-1 bg-[#A7D129] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {FEATURES.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="p-8 border-r border-b border-gray-100 last:border-r-0 group hover:bg-[#112D4E] transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:z-10"
            >
              <div className="mb-6 text-[#112D4E] group-hover:text-[#A7D129] transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-[#112D4E] group-hover:text-white mb-4 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-500 group-hover:text-gray-300 text-sm leading-relaxed transition-colors">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
