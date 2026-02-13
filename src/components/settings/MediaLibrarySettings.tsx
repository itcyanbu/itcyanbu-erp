import React from 'react';
import { Image, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

const MediaLibrarySettings = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">Media Library</h2>
                    <p className="text-sm text-gray-500">Global settings for your media assets</p>
                </div>
                <Link to="/media-library" className="flex items-center gap-2 px-4 py-2 bg-ghl-blue text-white rounded-md hover:bg-blue-600 transition-colors font-medium">
                    Open Media Library
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Image className="text-ghl-blue" size={32} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Usage Summary</h3>
                <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mt-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <span className="block text-2xl font-bold text-gray-900">125</span>
                        <span className="text-xs text-gray-500">Images</span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <span className="block text-2xl font-bold text-gray-900">12</span>
                        <span className="text-xs text-gray-500">Videos</span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <span className="block text-2xl font-bold text-gray-900">450MB</span>
                        <span className="text-xs text-gray-500">Used Storage</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaLibrarySettings;
