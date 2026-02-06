import { useState } from 'react';
import { X, Plus, LayoutTemplate, Share2, Globe, Link } from 'lucide-react';

interface CreateSiteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (name: string) => void;
    type: string;
}

const TYPES_WITH_SELECTION = ['WordPress Site', 'Website', 'Funnel', 'Form', 'Survey'];

const CreateSiteModal = ({ isOpen, onClose, onCreate, type }: CreateSiteModalProps) => {
    const [name, setName] = useState('');
    const [importUrl, setImportUrl] = useState('');
    const [step, setStep] = useState<'type-selection' | 'details' | 'migrate-details' | 'import-details'>(() => {
        // Initialize step based on type
        return TYPES_WITH_SELECTION.includes(type)
            ? 'type-selection'
            : 'details';
    });
    const [wpMode, setWpMode] = useState<'create' | 'migrate' | 'import'>('create');

    if (!isOpen) return null;

    // No useEffect needed as we force remount on open

    const handleNext = (selection: 'blank' | 'template' | 'migrate' | 'import') => {
        if (type === 'WordPress Site') {
            if (selection === 'migrate') {
                setWpMode('migrate');
                setStep('migrate-details');
                return;
            } else {
                setWpMode('create');
                setStep('details');
                return;
            }
        }

        if (selection === 'import') {
            setWpMode('import');
            setStep('import-details');
            return;
        }

        if (selection === 'template') {
            // In a real app, open template library
            setStep('details');
            return;
        }

        setWpMode('create');
        setStep('details');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            let finalName = name;
            if (wpMode === 'migrate') finalName = `${name} (Migrated)`;
            if (wpMode === 'import') finalName = `${name} (Imported)`;
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className={`bg-white rounded-xl shadow-xl w-full ${step === 'type-selection' ? 'max-w-3xl' : 'max-w-md'} overflow-hidden`}>
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {step === 'type-selection' ? `New ${type}` :
                            step === 'migrate-details' ? 'Migrate WordPress Site' :
                                step === 'import-details' ? `Import ${type}` :
                                    `Name Your ${type}`}
                    </h3>
                    <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {step === 'type-selection' ? (
                    <div className={`p-8 grid ${type === 'WordPress Site' || type === 'Funnel' || type === 'Website' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'} gap-6`}>
                        <button
                            onClick={() => handleNext('blank')}
                            className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50/50 transition-all group bg-white"
                        >
                            <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-300">
                                <Plus size={32} className="text-blue-600 group-hover:text-white transition-colors" />
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">From Blank</h4>
                            <p className="text-sm text-gray-500 text-center">Start from scratch using the drag and drop builder.</p>
                        </button>

                        <button
                            onClick={() => handleNext('template')}
                            className="flex flex-col items-center justify-center p-8 border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all group bg-white relative overflow-hidden"
                        >
                            <div className="w-16 h-16 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-indigo-600 transition-all duration-300">
                                <LayoutTemplate size={30} className="text-indigo-600 group-hover:text-white transition-colors" />
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">From Templates</h4>
                            <p className="text-sm text-gray-500 text-center">Choose from professionally designed templates.</p>
                        </button>

                        {(type === 'Funnel' || type === 'Website') && (
                            <button
                                onClick={() => handleNext('import')}
                                className="flex flex-col items-center justify-center p-8 border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all group bg-white"
                            >
                                <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-emerald-600 transition-all duration-300">
                                    <Link size={30} className="text-emerald-600 group-hover:text-white transition-colors" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Import from URL</h4>
                                <p className="text-sm text-gray-500 text-center">Clone an existing page by entering its public URL.</p>
                            </button>
                        )}

                        {type === 'WordPress Site' && (
                            <button
                                onClick={() => handleNext('migrate')}
                                className="flex flex-col items-center justify-center p-8 border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all group bg-white"
                            >
                                <div className="w-16 h-16 bg-orange-50 border border-orange-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-orange-600 transition-all duration-300">
                                    <Share2 size={30} className="text-orange-600 group-hover:text-white transition-colors" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Migrate Site</h4>
                                <p className="text-sm text-gray-500 text-center">Import an existing WordPress site using our migration tool.</p>
                            </button>
                        )}
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-6">
                        {step === 'migrate-details' && (
                            <div className="mb-6 p-4 bg-orange-50 text-orange-800 border border-orange-100 rounded-xl text-sm mb-6">
                                <p className="font-semibold mb-1 flex items-center gap-2">
                                    <Globe size={16} />
                                    WordPress Migration:
                                </p>
                                <p>You will need to install the <strong>LeadConnector Migrator Plugin</strong> on your existing WordPress site to complete the process.</p>
                            </div>
                        )}

                        {step === 'import-details' && (
                            <div className="mb-6 space-y-4">
                                <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl text-sm">
                                    <p className="font-semibold mb-1 flex items-center gap-2">
                                        <Link size={16} />
                                        Page URL:
                                    </p>
                                    <p>Enter the URL of the page you want to import. We'll attempt to clone the structure and style.</p>
                                </div>
                                <div>
                                    <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                                        URL to Import
                                    </label>
                                    <input
                                        type="url"
                                        id="url"
                                        value={importUrl}
                                        onChange={(e) => setImportUrl(e.target.value)}
                                        placeholder="https://example.com/page"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        required
                                    />
                                </div>
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
                            {TYPES_WITH_SELECTION.includes(type) && (
                                <button
                                    type="button"
                                    onClick={() => setStep('type-selection')}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    Back
                                </button>
                            )}
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
