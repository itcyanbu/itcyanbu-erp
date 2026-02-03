import React from 'react';
import clsx from 'clsx';

interface BusinessProfileCardProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    onSave?: () => void;
    isLoading?: boolean;
}

const BusinessProfileCard: React.FC<BusinessProfileCardProps> = ({ title, description, children, onSave, isLoading }) => {
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
                        disabled={isLoading}
                        className={clsx(
                            "text-white px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                            isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-ghl-blue hover:bg-blue-700"
                        )}
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Updating...
                            </>
                        ) : 'Update Information'}
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
