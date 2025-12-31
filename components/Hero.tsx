
import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, MousePointer2, FileText, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  setActiveModal: (modal: 'Register') => void;
}

const Hero: React.FC<HeroProps> = ({ setActiveModal }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white pt-20 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#112D4E] mb-4 tracking-tight">
            All In One Software Solutions
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold text-[#4ECCA3] italic mb-8">
            Easy, Efficient & Cost-effective
          </h2>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveModal('Register')}
              className="bg-[#112D4E] text-white px-8 py-4 rounded-md font-bold text-sm flex items-center gap-2 hover:bg-[#1a4477] transition-all transform hover:scale-105"
            >
              <MousePointer2 size={18} /> Sign Up - It's Free
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-[#A7D129] text-[#112D4E] px-8 py-4 rounded-md font-bold text-sm flex items-center gap-2 hover:bg-[#8eb323] transition-all transform hover:scale-105"
            >
              <FileText size={18} /> Request For Demo
            </button>
            <button
              onClick={() => scrollToSection('video')}
              className="bg-gray-600 text-white px-8 py-4 rounded-md font-bold text-sm flex items-center gap-2 hover:bg-gray-700 transition-all transform hover:scale-105"
            >
              <PlayCircle size={18} /> Video Demonstration
            </button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-xs font-bold text-[#112D4E] uppercase tracking-wider">
            <span className="flex items-center gap-2"><CheckCircle2 className="text-[#A7D129]" size={16} /> Billing & Accounting (ERP)</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="text-[#A7D129]" size={16} /> Inventory Management</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="text-[#A7D129]" size={16} /> CRM & HRM</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="text-[#A7D129]" size={16} /> Website & Mobile App</span>
          </div>
        </motion.div>
      </div>

      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A7D129] rounded-full blur-[120px] opacity-10 translate-x-1/2 translate-y-1/2"></div>
    </section>
  );
};

export default Hero;
