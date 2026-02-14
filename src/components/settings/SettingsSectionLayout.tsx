import { useEffect, useState, type ReactNode } from 'react';
import { Plus, Search } from 'lucide-react';

interface SettingsSectionLayoutProps {
    title: string;
    description: string;
    actionButtonText?: string;
    onAction?: () => void;
    children: ReactNode;
    showSearch?: boolean;
    onSearch?: (term: string) => void;
    tabs?: { id: string; label: string }[];
    activeTab?: string;
    onTabChange?: (tabId: string) => void;
}

const SettingsSectionLayout = ({
    title,
    description,
    actionButtonText,
    onAction,
    children,
    showSearch = true,
    onSearch,
    tabs,
    activeTab,
    onTabChange,
}: SettingsSectionLayoutProps) => {
    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                    <p className="text-sm text-gray-500">{description}</p>
                </div>
                {actionButtonText && onAction && (
                    <button
                        onClick={onAction}
                        className="flex items-center gap-2 px-4 py-2 bg-ghl-blue text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
                    >
                        <Plus size={18} />
                        {actionButtonText}
                    </button>
                )}
            </div>

            {tabs && tabs.length > 0 && (
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (onTabChange) onTabChange(tab.id);
                                }}
                                className={`
                  whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm focus:outline-none cursor-pointer rounded-t-md transition-colors duration-200
                  ${activeTab === tab.id
                                        ? 'bg-blue-600 border-blue-600 text-white'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                                    }
                `}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {showSearch && (
                    <div className="p-4 border-b border-gray-200">
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder={`Search ${title.toLowerCase()}...`}
                                onChange={(e) => onSearch?.(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-600 outline-none"
                            />
                        </div>
                    </div>
                )}

                {children}
            </div>
        </div>
    );
};

export default SettingsSectionLayout;
