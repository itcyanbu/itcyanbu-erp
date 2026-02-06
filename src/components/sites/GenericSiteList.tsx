import { Plus, Search, MoreHorizontal, Filter, ArrowUpRight } from 'lucide-react';
import type { SiteItem } from '../../data/mockSitesData';

interface GenericSiteListProps {
    title: string;
    items: SiteItem[];
    newItemLabel: string;
    icon?: any;
    onNewItem?: () => void;
}

const GenericSiteList = ({ title, items, newItemLabel, icon: Icon, onNewItem }: GenericSiteListProps) => {
    return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200 animate-in fade-in duration-300">
            {/* Toolbar */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder={`Search ${title}`}
                            className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-64"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                        <Filter size={16} />
                        Filter
                    </button>
                </div>
                <div>
                    <button
                        onClick={onNewItem}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 shadow-sm"
                    >
                        <Plus size={16} />
                        {newItemLabel}
                    </button>
                </div>
            </div>

            {/* List Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase">
                <div className="col-span-5">Name</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-3">Stats</div>
                <div className="col-span-2 text-right">Last Updated</div>
            </div>

            {/* List Body */}
            <div className="flex-1 overflow-y-auto">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                        <div className="bg-gray-100 p-4 rounded-full mb-4">
                            {Icon && <Icon size={32} className="text-gray-400" />}
                        </div>
                        <p>No {title.toLowerCase()} found</p>
                    </div>
                ) : (
                    items.map((item) => (
                        <div key={item.id} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors items-center group">
                            <div className="col-span-5 relative">
                                <div className="font-medium text-gray-900 group-hover:text-blue-600 cursor-pointer flex items-center gap-2">
                                    {Icon && <Icon size={16} className="text-gray-400 group-hover:text-blue-500" />}
                                    {item.name}
                                    {item.url && (
                                        <a href={item.url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-gray-400 hover:text-blue-600 ml-1">
                                            <ArrowUpRight size={14} />
                                        </a>
                                    )}
                                </div>
                                {item.type && <div className="text-xs text-gray-500 mt-1 ml-6">{item.type}</div>}
                            </div>
                            <div className="col-span-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'Active' ? 'bg-green-100 text-green-700' :
                                    item.status === 'Draft' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-gray-100 text-gray-600'
                                    }`}>
                                    {item.status}
                                </span>
                            </div>
                            <div className="col-span-3 text-sm text-gray-600">
                                {item.stats}
                            </div>
                            <div className="col-span-2 text-right flex items-center justify-end gap-2">
                                <span className="text-sm text-gray-500 mr-2">{item.lastUpdated}</span>
                                <button className="p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MoreHorizontal size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default GenericSiteList;
