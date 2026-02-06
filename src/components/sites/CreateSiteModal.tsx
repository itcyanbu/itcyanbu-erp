import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface CreateSiteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (name: string) => void;
    type: string;
}

const CreateSiteModal = ({ isOpen, onClose, onCreate, type }: CreateSiteModalProps) => {
    const [name, setName] = useState('');
    const [step, setStep] = useState<'type-selection' | 'details' | 'migrate-details'>('type-selection');
    const [wpMode, setWpMode] = useState<'create' | 'migrate'>('create');

    if (!isOpen) return null;

    useEffect(() => {
        if (isOpen) {
            setStep(type === 'WordPress Site' || type === 'Website' || type === 'Funnel' ? 'type-selection' : 'details');
        }
    }, [isOpen, type]);

    const handleNext = (selection: 'blank' | 'template' | 'migrate') => {
        if (type === 'WordPress Site') {
            if (selection === 'migrate') {
                setWpMode('migrate');
                setStep('migrate-details');
                return;
            } else {
                setWpMode('create');
                // selection 'blank' or 'template' -> go to naming
                setStep('details');
                return;
            }
        }

        if (selection === 'template') {
            // In a real app, open template library
        }
        setStep('details');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            const finalName = wpMode === 'migrate' ? `${name} (Migrated)` : name;
            onCreate(finalName);
            handleClose();
        }
    };

    const handleClose = () => {
        setName('');
        setWpMode('create');
        setStep('type-selection');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className={`bg-white rounded-xl shadow-xl w-full ${step === 'type-selection' ? 'max-w-3xl' : 'max-w-md'} overflow-hidden animate-in zoom-in-95 duration-200`}>
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {step === 'type-selection' ? `New ${type}` :
                            step === 'migrate-details' ? 'Migrate WordPress Site' :
                                `Name Your ${type}`}
                    </h3>
                    <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {step === 'type-selection' ? (
                    <div className={`p-8 grid ${type === 'WordPress Site' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'} gap-6`}>
                        <button
                            onClick={() => handleNext('blank')}
                            className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
                        >
                            <div className="w-16 h-16 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <span className="text-2xl font-bold text-gray-400 group-hover:text-blue-500">+</span>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">From Blank</h4>
                            <p className="text-sm text-gray-500 text-center">Start from scratch and build your {type.toLowerCase()} exactly how you want.</p>
                        </button>

                        <button
                            onClick={() => handleNext('template')}
                            className="flex flex-col items-center justify-center p-8 border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all group bg-gray-50/50"
                        >
                            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <span className="text-2xl">🎨</span>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">From Templates</h4>
                            <p className="text-sm text-gray-500 text-center">Choose from professionally designed templates.</p>
                        </button>

                        {type === 'WordPress Site' && (
                            <button
                                onClick={() => handleNext('migrate')}
                                className="flex flex-col items-center justify-center p-8 border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all group bg-gray-50/50"
                            >
                                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="text-2xl">🚀</span>
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Migrate Site</h4>
                                <p className="text-sm text-gray-500 text-center">Import an existing WordPress site using our migration tool.</p>
                            </button>
                        )}
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-6">
                        {step === 'migrate-details' && (
                            <div className="mb-6 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm mb-6">
                                <p className="font-semibold mb-1">Migration Info:</p>
                                <p>You will need to install the <strong>LeadConnector Migrator Plugin</strong> on your existing WordPress site to complete the process after creation.</p>
                            </div>
                        )}

                        <div className="mb-6">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                {type} Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={`Enter ${type.toLowerCase()} name`}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                autoFocus
                            />
                        </div>

                        <div className="flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setStep('type-selection')}
                                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!name.trim()}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                            >
                                {wpMode === 'migrate' ? 'Start Migration' : `Create ${type}`}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CreateSiteModal;
