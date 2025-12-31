import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, FileText, RefreshCw } from 'lucide-react';

export type PolicyType = 'Privacy Policy' | 'Terms and Conditions' | 'Refund Policy';

interface PolicyModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: PolicyType | null;
}

const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose, title }) => {
    const getIcon = () => {
        switch (title) {
            case 'Privacy Policy': return <Shield size={24} />;
            case 'Terms and Conditions': return <FileText size={24} />;
            case 'Refund Policy': return <RefreshCw size={24} />;
            default: return <FileText size={24} />;
        }
    }

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
                        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden"
                    >
                        <div className="bg-[#112D4E] p-6 text-white flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    {getIcon()}
                                </div>
                                <h2 className="text-xl font-bold">{title}</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-8 overflow-y-auto">
                            <div className="prose prose-sm max-w-none text-gray-600 space-y-4">
                                <p><strong>Effective Date:</strong> January 1, 2024</p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                                <h3 className="text-[#112D4E] font-bold text-lg">1. Introduction</h3>
                                <p>
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                                <h3 className="text-[#112D4E] font-bold text-lg">2. Data Collection</h3>
                                <p>
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                                    eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                </p>
                                <h3 className="text-[#112D4E] font-bold text-lg">3. User Rights</h3>
                                <p>
                                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
                                    qui ratione voluptatem sequi nesciunt.
                                </p>
                                <p className="italic text-xs text-gray-400 mt-8 border-t pt-4">
                                    This is a placeholder policy document. Please contact support for official documentation.
                                </p>
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end shrink-0">
                            <button
                                onClick={onClose}
                                className="px-6 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PolicyModal;
