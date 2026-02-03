import React from 'react';

interface BusinessProfileCardProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    onSave?: () => void;
}

const BusinessProfileCard: React.FC<BusinessProfileCardProps> = ({ title, description, children, onSave }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
                </div>
                {onSave && (
                    <button
                        onClick={onSave}
                        className="bg-ghl-blue text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                        Update Information
                    </button>
                )}
            </div>
            <div className="p-6">
                {children}
            </div>
        </div>
    );
};

export default BusinessProfileCard;
