import React from 'react';

interface ModulePlaceholderProps {
    name: string;
}

const ModulePlaceholder: React.FC<ModulePlaceholderProps> = ({ name }) => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-8 text-center h-full">
            <div className="max-w-md bg-white p-12 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-6">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{name}</h2>
                    <p className="text-gray-500 max-w-xs mx-auto">
                        This module is currently in development. Our team is working hard to bring you the best {name.toLowerCase()} experience.
                    </p>
                </div>
                <div className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium animate-pulse">
                    Coming Soon
                </div>
            </div>
        </div>
    );
};

export default ModulePlaceholder;
