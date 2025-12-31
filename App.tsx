import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ToastProvider from './components/ui/Toast';
import {
  Phone, Mail, MapPin, MessageSquare, CheckCircle2, ArrowRight,
  Globe, Monitor, Database, Users, Terminal, ChevronRight,
  TrendingUp, ShieldCheck, MessageCircle, PlayCircle
} from 'lucide-react';
import { CONTACT_INFO, SERVICES, FEATURES } from './constants';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChoose from './components/WhyChoose';
import QuotationForm from './components/QuotationForm';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import ResellerModal from './components/ResellerModal';
import PolicyModal, { PolicyType } from './components/PolicyModal';
import ComingSoonModal from './components/ComingSoonModal';
import DashboardLayout from './layouts/DashboardLayout';
import SuperAdminHome from './pages/admin/SuperAdminHome';
import ResellerProfile from './pages/admin/ResellerProfile';
import LicenseManager from './pages/admin/LicenseManager';
import ReportsCenter from './pages/admin/ReportsCenter';
import Settings from './pages/admin/Settings';
import SoftwareLayout from './layouts/SoftwareLayout';
import UserDashboard from './pages/software/UserDashboard';
import ResellerDashboard from './pages/reseller/ResellerDashboard';
import ClientLoginModal from './components/ClientLoginModal';
import ERPSystem from './pages/software/ERPSystem';
import HRMSystem from './pages/software/HRMSystem';
import CRMLayout from './layouts/CRMLayout';
import CRMDashboard from './pages/crm/Dashboard';
import Master from './pages/crm/Master';
import Leads from './pages/crm/Leads';
import Tickets from './pages/crm/Tickets';
import Tasks from './pages/crm/Tasks';
import Sales from './pages/crm/Sales';
import Quotations from './pages/crm/Quotations';
import SaleOrders from './pages/crm/SaleOrders';
import CRMUsers from './pages/crm/Users';
import HR from './pages/crm/HR';
import Billing from './pages/crm/Billing';
import GeneralSettings from './pages/crm/GeneralSettings';
import QuickLinks from './pages/crm/QuickLinks';
import ProtectedRoute from './components/ProtectedRoute';

// --- Landing Page Component ---
const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeModal, setActiveModal] = useState<'Register' | 'Super Admin Login' | 'Software Login' | 'CRM Login' | null>(null);
  const [showResellerModal, setShowResellerModal] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-[#112D4E] text-white text-xs py-2 px-4 hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center gap-1 hover:text-green-400 transition-colors">
              <Phone size={14} /> {CONTACT_INFO.phone}
            </a>
            <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-1 hover:text-green-400 transition-colors">
              <Mail size={14} /> {CONTACT_INFO.email}
            </a>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setActiveModal('Register')} className="hover:text-green-400 cursor-pointer">Register</button>
            <span className="text-gray-500">|</span>
            <button
              onClick={() => {
                console.log('Clicked Super Admin Button');
                // alert('Button Clicked: Super Admin'); // Uncomment for prod debug
                setActiveModal('Super Admin Login');
              }}
              className="hover:text-green-400 cursor-pointer"
            >
              Super Admin Login
            </button>
            <span className="text-gray-500">|</span>
            <button onClick={() => setActiveModal('Software Login')} className="hover:text-green-400 cursor-pointer">Software Login</button>
            <span className="text-gray-500">|</span>
            <button onClick={() => setActiveModal('CRM Login')} className="hover:text-green-400 cursor-pointer">CRM Login</button>
          </div>
        </div>
      </div>

      <Navbar isScrolled={isScrolled} />

      <main>
        <Hero setActiveModal={(modal) => setActiveModal(modal)} />

        {/* Help Section */}
        <section className="py-20 bg-gray-50" id="about">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-gray-500 font-semibold uppercase tracking-widest text-sm mb-2"
              >
                How Can I Help You
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-[#112D4E]"
              >
                We Help Your <span className="text-[#A7D129]">Business</span>
              </motion.h2>
              <div className="w-24 h-1 bg-[#A7D129] mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <img
                  src="https://picsum.photos/seed/dashboard/800/600"
                  alt="Software Dashboard"
                  className="rounded-xl shadow-2xl border-8 border-white"
                />
                <div className="absolute -bottom-6 -right-6 bg-[#A7D129] p-6 rounded-lg hidden lg:block">
                  <p className="text-[#112D4E] font-bold text-2xl">100%</p>
                  <p className="text-[#112D4E] text-sm">Customer Satisfaction</p>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: <Database className="text-blue-500" />, title: "All In One Software", desc: "Get all types of required software like ERP, CRM, HRMS, E-Commerce." },
                  { icon: <Globe className="text-green-500" />, title: "Any Where Any Time", desc: "Access your business from anywhere with our cloud-based system." },
                  { icon: <TrendingUp className="text-orange-500" />, title: "Increase Your Sales", desc: "Use our advanced CRM tools to increase sales and team productivity." },
                  { icon: <ShieldCheck className="text-purple-500" />, title: "Executive Control", desc: "Provide access to your team as per their responsibilities." }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                  >
                    <div className="mb-4">{item.icon}</div>
                    <h3 className="text-lg font-bold text-[#112D4E] mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-20 bg-[#112D4E] p-8 rounded-2xl text-white text-center italic text-lg"
            >
              "The world is moving very fast day by day and we should also take our business forward by using advance software like itcyanbu All in One Software Solution"
            </motion.div>
          </div>
        </section>

        <Services />
        <WhyChoose />

        {/* Pricing Section */}
        <section className="py-20 bg-gray-50" id="pricing">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-[#112D4E] mb-4">Flexible <span className="text-[#A7D129]">Pricing</span></h2>
              <div className="w-24 h-1 bg-[#A7D129] mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { name: 'Startup', price: '$49', features: ['Basic ERP', '5 Users', 'Email Support'] },
                { name: 'Business', price: '$99', features: ['Advanced ERP + CRM', '20 Users', 'Priority Support'] },
                { name: 'Enterprise', price: 'Custom', features: ['Full Suite', 'Unlimited Users', '24/7 Dedicated Support'] }
              ].map((plan, idx) => (
                <div key={idx} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:scale-105 transition-transform">
                  <h3 className="text-xl font-bold text-[#112D4E] mb-4">{plan.name}</h3>
                  <div className="text-4xl font-bold text-[#A7D129] mb-6">{plan.price}<span className="text-sm text-gray-400 font-normal">/mo</span></div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 size={16} className="text-green-500" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3 bg-[#112D4E] text-white rounded-lg font-bold hover:bg-[#1a4477]">Choose Plan</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white" id="reference">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#112D4E]">Trusted <span className="text-[#A7D129]">Clients</span></h2>
            </div>
            <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {['TechCorp', 'GlobalSolutions', 'FutureSystems', 'SmartSoft'].map((client, idx) => (
                <div key={idx} className="text-2xl font-black text-gray-300 pointer-events-none select-none">{client}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#112D4E] text-white" id="video">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">See It In <span className="text-[#A7D129]">Action</span></h2>
            <div className="max-w-4xl mx-auto aspect-video bg-black/30 rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl overflow-hidden group cursor-pointer relative">
              <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/tech/1200/800')] bg-cover bg-center opacity-50 group-hover:scale-105 transition-transform duration-700"></div>
              <div className="w-20 h-20 bg-[#A7D129] rounded-full flex items-center justify-center text-[#112D4E] z-10 group-hover:scale-110 transition-transform">
                <PlayCircle size={40} fill="currentColor" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#112D4E] text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-gray-300 font-semibold uppercase tracking-widest text-sm mb-2">Who We Are</p>
              <h2 className="text-4xl font-bold">Custom IT Solutions for Your <span className="text-[#A7D129]">Business</span></h2>
              <div className="w-24 h-1 bg-[#A7D129] mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                { icon: <MessageSquare className="w-12 h-12" />, title: "Understand Your Requirement", desc: "We listen carefully to your business needs to build the perfect roadmap." },
                { icon: <Terminal className="w-12 h-12" />, title: "Modify Software As per Need", desc: "Customization is our strength. We tailor everything to your workflow." },
                { icon: <CheckCircle2 className="w-12 h-12" />, title: "Deliver Complete Solution", desc: "End-to-end support from deployment to training and maintenance." }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.2 }}
                  className="text-center group"
                >
                  <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#A7D129] transition-colors duration-300">
                    <div className="text-white group-hover:text-[#112D4E]">{item.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <QuotationForm />
      </main>

      <Footer
        scrollToSection={scrollToSection}
        openReseller={() => setShowResellerModal(true)}
        openPolicy={setActivePolicy}
        openDownload={() => setShowDownloadModal(true)}
      />

      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 transition-all hover:scale-110"
        >
          <MessageCircle size={24} />
          <span className="hidden md:inline font-semibold">Live Support</span>
        </a>
      </div>

      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <button
          onClick={() => setShowResellerModal(true)}
          className="bg-[#112D4E] text-white py-4 px-2 rounded-l-md [writing-mode:vertical-lr] rotate-180 hover:bg-[#A7D129] hover:text-[#112D4E] transition-all font-bold"
        >
          Reseller Enquiry
        </button>
      </div>

      {(activeModal === 'Register' || activeModal === 'Super Admin Login') && (
        <LoginModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          type={activeModal}
        />
      )}
      <ResellerModal isOpen={showResellerModal} onClose={() => setShowResellerModal(false)} />
      <PolicyModal isOpen={!!activePolicy} onClose={() => setActivePolicy(null)} title={activePolicy} />
      <ComingSoonModal isOpen={showDownloadModal} onClose={() => setShowDownloadModal(false)} />
      <ClientLoginModal
        isOpen={activeModal === 'Software Login' || activeModal === 'CRM Login'}
        onClose={() => setActiveModal(null)}
        type={activeModal as 'Software Login' | 'CRM Login' | null}
      />
    </div>
  );
};

// --- Main App Component with Routing ---
function App() {
  return (
    <ToastProvider>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Admin Dashboard - Protected for Admin only */}
        <Route path="/admin" element={
          <ProtectedRoute requiredRole="admin">
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<SuperAdminHome />} />
          <Route path="resellers" element={<ResellerProfile />} />
          <Route path="kyc" element={<ResellerProfile />} />
          <Route path="licenses" element={<LicenseManager />} />
          <Route path="reports" element={<ReportsCenter />} />
          <Route path="settings" element={<Settings />} />
          <Route path="analytics" element={<ResellerDashboard />} />
        </Route>

        {/* Software/CRM Portal Routes - Protected with License check */}
        <Route path="/software" element={
          <ProtectedRoute checkLicense={true}>
            <SoftwareLayout />
          </ProtectedRoute>
        }>
          <Route index element={<UserDashboard />} />
          <Route path="erp" element={<ERPSystem />} />
          <Route path="hrms" element={<HRMSystem />} />
          <Route path="analytics" element={<div className="p-8">Analytics Module</div>} />
          <Route path="settings" element={<div className="p-8">Software Settings</div>} />
        </Route>

        <Route path="/crm" element={
          <ProtectedRoute checkLicense={true}>
            <CRMLayout />
          </ProtectedRoute>
        }>
          <Route index element={<QuickLinks />} />
          <Route path="quick-links" element={<QuickLinks />} />
          <Route path="dashboard" element={<CRMDashboard />} />
          <Route path="master" element={<Master />} />
          <Route path="master/*" element={<Master />} />
          <Route path="leads" element={<Leads />} />
          <Route path="leads/*" element={<Leads />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="tickets/*" element={<Tickets />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="tasks/*" element={<Tasks />} />
          <Route path="sales" element={<Sales />} />
          <Route path="sales/*" element={<Sales />} />
          <Route path="quotations" element={<Quotations />} />
          <Route path="quotations/*" element={<Quotations />} />
          <Route path="orders" element={<SaleOrders />} />
          <Route path="orders/*" element={<SaleOrders />} />
          <Route path="general" element={<GeneralSettings />} />
          <Route path="users" element={<CRMUsers />} />
          <Route path="hr" element={<HR />} />
          <Route path="billing" element={<Billing />} />
          <Route path="billing/*" element={<Billing />} />
        </Route>

        {/* Catch-all for undefined routes */}
        <Route path="*" element={
          <div className="h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">404 - Module Not Found</h1>
            <p className="text-slate-600 mb-8 overflow-hidden max-w-lg truncate">Path: {window.location.pathname}</p>
            <button onClick={() => window.location.href = '/'} className="px-6 py-2 bg-blue-600 text-white rounded-lg">Return Home</button>
          </div>
        } />
      </Routes>
    </ToastProvider>
  );
}

export default App;
