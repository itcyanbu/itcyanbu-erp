import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Rocket, Smartphone } from 'lucide-react';

interface ComingSoonModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ComingSoonModal: React.FC<ComingSoonModalProps> = ({ isOpen, onClose }) => {
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
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative bg-white rounded-2xl shadow-2xl p-8 text-center max-w-sm w-full overflow-hidden"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                        >
                            <X size={20} />
                        </button>

                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Rocket className="text-[#112D4E]" size={40} />
                        </div>

                        <h2 className="text-2xl font-black text-[#112D4E] mb-2">Coming Soon!</h2>
                        <p className="text-gray-500 text-sm mb-6">
                            We are working hard to bring our mobile apps to your favorite store. Stay tuned for updates!
                        </p>

                        <button
                            onClick={onClose}
                            className="bg-[#A7D129] text-[#112D4E] font-bold py-3 px-8 rounded-full hover:bg-[#96bc25] transition-all transform hover:scale-105"
                        >
                            Notify Me
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ComingSoonModal;
