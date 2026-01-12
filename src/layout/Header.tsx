import React from 'react';
import { Search, Bell, HelpCircle, User } from 'lucide-react';

const Header = () => {
    return (
        <header className="h-16 bg-white border-b border-ghl-border flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-4 flex-1">
                <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-md border-transparent focus:border-ghl-blue focus:bg-white focus:ring-0 text-sm transition-all"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <span className="text-xs text-gray-400 border border-gray-300 rounded px-1">Ctrl K</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="text-gray-500 hover:text-gray-700">
                    <HelpCircle size={20} />
                </button>
                <button className="relative text-gray-500 hover:text-gray-700">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="w-8 h-8 bg-ghl-blue/10 text-ghl-blue rounded-full flex items-center justify-center font-medium text-sm">
                    ITC
                </div>
            </div>
        </header>
    );
};

export default Header;
