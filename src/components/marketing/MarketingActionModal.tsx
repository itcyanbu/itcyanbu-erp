import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';

type ModalType = 'social-post' | 'email-campaign' | 'template' | 'trigger-link';

interface MarketingActionModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: ModalType | null;
}

const MarketingActionModal = ({ isOpen, onClose, type }: MarketingActionModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<any>({});

    if (!isOpen || !type) return null;

    const getTitle = () => {
        switch (type) {
            case 'social-post': return 'Create Social Post';
            case 'email-campaign': return 'New Email Campaign';
            case 'template': return 'Create Template';
            case 'trigger-link': return 'Add Trigger Link';
            default: return 'Create New';
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Saved:', type, formData);
            setIsLoading(false);
            onClose();
            // In a real app, we would trigger a refresh or update context here
            alert(`${getTitle()} saved successfully! (Mock Action)`);
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">{getTitle()}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSave} className="p-6 space-y-4">
                    {type === 'social-post' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Post Content</label>
                                <textarea
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
                                    placeholder="What's on your mind?"
                                    required
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Platforms</label>
                                <div className="flex gap-2">
                                    {['Facebook', 'Instagram', 'LinkedIn', 'Twitter'].map(platform => (
                                        <label key={platform} className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                                            <input type="checkbox" className="rounded text-blue-600" />
                                            <span className="text-sm">{platform}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {type === 'email-campaign' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g. Weekly Newsletter"
                                    required
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject Line</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter email subject"
                                    required
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                />
                            </div>
                        </>
                    )}

                    {type === 'template' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g. Welcome Email"
                                    required
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Template Type</label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    onChange={(e) => setFormData({ ...formData, templateType: e.target.value })}
                                >
                                    <option value="email">Email Template</option>
                                    <option value="sms">SMS Template</option>
                                </select>
                            </div>
                        </>
                    )}

                    {type === 'trigger-link' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Link Name</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g. Summer Promo"
                                    required
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Destination URL</label>
                                <input
                                    type="url"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="https://..."
                                    required
                                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                />
                            </div>
                        </>
                    )}

                    <div className="flex items-center justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isLoading ? <Loader2 size={16} className="animate-spin" /> : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MarketingActionModal;
