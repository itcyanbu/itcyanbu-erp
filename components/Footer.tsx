import React from 'react';
import { Phone, Mail, MapPin, Apple, Play } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { PolicyType } from './PolicyModal';
import logo from '../assets/logo.jpg';

interface FooterProps {
  scrollToSection: (id: string) => void;
  openReseller: () => void;
  openPolicy: (type: PolicyType) => void;
  openDownload: () => void;
}

const Footer: React.FC<FooterProps> = ({ scrollToSection, openReseller, openPolicy, openDownload }) => {
  return (
    <footer className="bg-[#0A192F] pt-20 pb-6 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img src={logo} alt="itc yanbu" className="h-16 w-auto object-contain bg-white/5 rounded-lg p-1" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Information is the only thing which is necessary in all fields and the foremost important thing is that the storage of information.
            </p>
            <div className="space-y-4">
              <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center gap-3 text-gray-300 hover:text-[#A7D129] transition-colors text-sm">
                <Phone size={18} /> {CONTACT_INFO.phone}
              </a>
              <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-3 text-gray-300 hover:text-[#A7D129] transition-colors text-sm">
                <Mail size={18} /> {CONTACT_INFO.email}
              </a>
              <div className="flex gap-3 text-gray-300 text-sm leading-snug">
                <MapPin size={32} className="flex-shrink-0" />
                <span>{CONTACT_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8 relative inline-block">
              About
              <span className="absolute bottom-[-10px] left-0 w-8 h-1 bg-[#A7D129] rounded-full"></span>
            </h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><button onClick={() => scrollToSection('about')} className="hover:text-[#A7D129] transition-colors text-left">About Us</button></li>
              <li><button onClick={() => scrollToSection('features')} className="hover:text-[#A7D129] transition-colors text-left">Features</button></li>
              <li><button onClick={() => scrollToSection('pricing')} className="hover:text-[#A7D129] transition-colors text-left">Pricing</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="hover:text-[#A7D129] transition-colors text-left">Contact Us</button></li>
              <li><button onClick={openReseller} className="hover:text-[#A7D129] transition-colors text-left">Reseller Registration</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="hover:text-[#A7D129] transition-colors text-left">Customer Registration</button></li>
            </ul>
          </div>

          {/* Software Features */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8 relative inline-block">
              itcyanbu Includes
              <span className="absolute bottom-[-10px] left-0 w-8 h-1 bg-[#A7D129] rounded-full"></span>
            </h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li>E-commerce / Company Website</li>
              <li>Billing & Accounting</li>
              <li>CRM & HRM</li>
              <li>Mobile Application</li>
              <li>Domain & Server</li>
              <li>One Year Free Support</li>
            </ul>
          </div>

          {/* Company Policy */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8 relative inline-block">
              Company Policy
              <span className="absolute bottom-[-10px] left-0 w-8 h-1 bg-[#A7D129] rounded-full"></span>
            </h3>
            <ul className="space-y-4 text-gray-400 text-sm mb-8">
              <li><button onClick={() => openPolicy('Privacy Policy')} className="hover:text-[#A7D129] transition-colors text-left">Privacy Policy</button></li>
              <li><button onClick={() => openPolicy('Terms and Conditions')} className="hover:text-[#A7D129] transition-colors text-left">Terms and Conditions</button></li>
              <li><button onClick={() => openPolicy('Refund Policy')} className="hover:text-[#A7D129] transition-colors text-left">Refund Policy</button></li>
            </ul>

            <h4 className="text-white font-bold text-sm mb-4">Download Apps</h4>
            <div className="flex flex-col gap-3">
              <button onClick={openDownload} className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-lg p-2 hover:bg-black/60 transition-all text-left">
                <div className="bg-[#4ECCA3] p-1.5 rounded"><Play className="w-5 h-5 fill-white text-white" /></div>
                <div>
                  <p className="text-[10px] text-gray-400 leading-none">Download for</p>
                  <p className="text-xs font-bold text-white leading-tight">Android</p>
                </div>
              </button>
              <button onClick={openDownload} className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-lg p-2 hover:bg-black/60 transition-all text-left">
                <div className="bg-[#56C5F0] p-1.5 rounded"><Apple className="w-5 h-5 fill-white text-white" /></div>
                <div>
                  <p className="text-[10px] text-gray-400 leading-none">Download for</p>
                  <p className="text-xs font-bold text-white leading-tight">iOS</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center text-gray-500 text-xs">
          Copyright © {new Date().getFullYear()} <span className="text-[#A7D129]">itcyanbu</span>. All right reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
