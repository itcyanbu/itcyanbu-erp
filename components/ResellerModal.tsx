import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Building2, User, Mail, MessageSquare } from 'lucide-react';

interface ResellerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ResellerModal: React.FC<ResellerModalProps> = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
                    >
                        <div className="bg-[#112D4E] p-6 text-white flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold">Become a Reseller</h2>
                                <p className="text-blue-200 text-xs mt-1">Join our network and grow with us</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full bg-gray-50 pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#112D4E] focus:ring-1 focus:ring-[#112D4E] transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                                    <input
                                        type="email"
                                        placeholder="name@company.com"
                                        className="w-full bg-gray-50 pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#112D4E] focus:ring-1 focus:ring-[#112D4E] transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Company Name</label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-3 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Your Company Details"
                                        className="w-full bg-gray-50 pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#112D4E] focus:ring-1 focus:ring-[#112D4E] transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Message</label>
                                <div className="relative">
                                    <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
                                    <textarea
                                        rows={4}
                                        placeholder="Tell us about yourself..."
                                        className="w-full bg-gray-50 pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#112D4E] focus:ring-1 focus:ring-[#112D4E] transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#112D4E] text-white font-bold py-3 rounded-lg hover:bg-[#0d233d] transition-colors flex items-center justify-center gap-2 mt-4"
                            >
                                <Send size={18} /> Submit Application
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ResellerModal;
