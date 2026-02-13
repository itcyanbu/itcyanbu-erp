import React from 'react';
import { Star, Link as LinkIcon, Send } from 'lucide-react';

const ReputationSettings = () => {
    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <h2 className="text-xl font-semibold text-gray-900">Reputation Management</h2>
                <p className="text-sm text-gray-500">Manage review requests and display widgets</p>
            </div>

            {/* Review Link Generation */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <LinkIcon size={20} className="text-gray-400" />
                    Review Link
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Google Review Link</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            readOnly
                            value="https://g.page/r/CbG9..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Facebook Review Link</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            readOnly
                            value="https://facebook.com/pg/..."
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <button className="text-ghl-blue text-sm font-medium hover:underline">
                        Generate new link
                    </button>
                </div>
            </div>

            {/* Request Behavior */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Review Request Behavior</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                        <div>
                            <h4 className="text-sm font-medium text-gray-900">Send Review Request Immediately</h4>
                            <p className="text-xs text-gray-500">When an opportunity is marked as 'Won'</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ghl-blue"></div>
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Customize SMS Message</label>
                        <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            rows={3}
                            defaultValue="Hi {contact.first_name}, thanks for your business! Would you mind taking a moment to leave us a review? {location.review_link}"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReputationSettings;
