import { useState } from 'react';
import {
    Folder,
    File,
    Image as ImageIcon,
    Video as VideoIcon,
    FileText,
    Search,
    ChevronRight,
    MoreVertical,
    Grid,
    List,
    Upload,
    Download,
    Trash2,
    ArrowUpAz,
    HardDrive,
    Share2,
    Copy,
    FolderPlus,
    X
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

const MediaLibraryPage = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [currentPath, setCurrentPath] = useState(['Home']);
    const [searchQuery, setSearchQuery] = useState('');
    const [showNewFolderModal, setShowNewFolderModal] = useState(false);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const tabs = [
        { id: 'all', label: t('common.all') || 'All' },
        { id: 'image', label: t('ai_solutions.cctv_ai') || 'Images' },
        { id: 'video', label: 'Videos' },
        { id: 'document', label: t('help_tab.pdf') || 'Documents' }
    ];

    const mediaItems = [
        { id: 1, name: 'Marketing Assets', type: 'folder', items: 12, size: '-', date: '2024-01-20', updatedBy: 'Admin' },
        { id: 2, name: 'Client Project A', type: 'folder', items: 8, size: '-', date: '2024-01-18', updatedBy: 'Admin' },
        { id: 3, name: 'logo-vertical.png', type: 'image', size: '1.2 MB', date: '2024-01-22', url: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=400&h=400&auto=format&fit=crop', updatedBy: 'System' },
        { id: 4, name: 'testimonial-clip.mp4', type: 'video', size: '45.8 MB', date: '2024-01-15', updatedBy: 'System' },
        { id: 5, name: 'agency-brochure.pdf', type: 'document', size: '2.4 MB', date: '2024-01-10', updatedBy: 'Admin' },
        { id: 6, name: 'banner-hero.jpg', type: 'image', size: '3.5 MB', date: '2024-01-21', url: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=400&h=400&auto=format&fit=crop', updatedBy: 'Admin' },
        { id: 7, name: 'social-post-01.png', type: 'image', size: '850 KB', date: '2024-01-19', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&h=400&auto=format&fit=crop', updatedBy: 'Admin' },
        { id: 8, name: 'contract-template.docx', type: 'document', size: '45 KB', date: '2024-01-05', updatedBy: 'Admin' },
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case 'folder': return <Folder className="text-amber-500 fill-amber-500/10" size={24} />;
            case 'image': return <ImageIcon className="text-purple-500" size={24} />;
            case 'video': return <VideoIcon className="text-rose-500" size={24} />;
            case 'document': return <FileText className="text-blue-500" size={24} />;
            default: return <File className="text-slate-400" size={24} />;
        }
    };

    const toggleItemSelection = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const filteredItems = mediaItems
        .filter(item => activeTab === 'all' || item.type === activeTab)
        .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="h-full flex flex-col bg-[#f8fafc] overflow-hidden">
            {/* Header Section */}
            <div className="bg-white border-b border-slate-200 px-8 py-6 shrink-0 z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 leading-tight">
                            {t('sidebar.media_library') || 'Media Library'}
                        </h1>
                        <p className="text-slate-500 mt-1 text-sm font-medium">
                            Centralized asset management for your digital workspace
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowNewFolderModal(true)}
                            className="bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 text-slate-700 font-semibold py-2 px-4 rounded-xl text-sm transition-all flex items-center gap-2 shadow-sm active:scale-95"
                        >
                            <FolderPlus size={18} />
                            New Folder
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl text-sm transition-all flex items-center gap-2 shadow-md shadow-blue-100 active:scale-95">
                            <Upload size={18} />
                            Upload
                        </button>
                    </div>
                </div>

                {/* Sub-Header / Toolbar */}
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pt-2">
                    {/* Left: Breadcrumbs & Tabs */}
                    <div className="flex flex-col gap-4">
                        <nav className="flex items-center gap-2 text-sm">
                            {currentPath.map((folder, idx) => (
                                <div key={idx} className="flex items-center gap-2 group">
                                    <button
                                        className={clsx(
                                            "hover:text-blue-600 transition-colors font-semibold",
                                            idx === currentPath.length - 1 ? "text-slate-900" : "text-slate-400"
                                        )}
                                        onClick={() => setCurrentPath(currentPath.slice(0, idx + 1))}
                                    >
                                        {folder}
                                    </button>
                                    {idx < currentPath.length - 1 && <ChevronRight size={14} className="text-slate-300" />}
                                </div>
                            ))}
                        </nav>

                        <div className="flex items-center gap-1 bg-slate-100/50 p-1 rounded-xl w-fit">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={clsx(
                                        "px-4 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap",
                                        activeTab === tab.id
                                            ? "bg-white text-blue-600 shadow-sm"
                                            : "text-slate-500 hover:text-slate-700"
                                    )}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Search, Filter, Views */}
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative group min-w-[300px]">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search by filename..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-2.5 bg-slate-100 border-transparent focus:bg-white focus:border-blue-400 rounded-xl text-sm outline-none transition-all border shadow-inner"
                            />
                        </div>

                        <div className="flex items-center gap-1 border border-slate-200 rounded-xl p-1 bg-white shadow-sm">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={clsx(
                                    "p-2 rounded-lg transition-all",
                                    viewMode === 'grid' ? "bg-slate-100 text-blue-600" : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                <Grid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={clsx(
                                    "p-2 rounded-lg transition-all",
                                    viewMode === 'list' ? "bg-slate-100 text-blue-600" : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                <List size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                {filteredItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <HardDrive size={32} className="text-slate-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">No assets found</h3>
                        <p className="text-slate-500 mt-1 max-w-xs mx-auto text-sm">
                            Start by uploading files or creating folders to organize your media.
                        </p>
                    </div>
                ) : (
                    viewMode === 'grid' ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-7 gap-6">
                            {filteredItems.map(item => (
                                <div
                                    key={item.id}
                                    className={clsx(
                                        "group bg-white rounded-2xl border transition-all cursor-pointer relative flex flex-col p-2",
                                        selectedItems.includes(item.id)
                                            ? "border-blue-500 ring-2 ring-blue-500/10 shadow-lg"
                                            : "border-slate-100 hover:border-blue-200 hover:shadow-xl hover:-translate-y-1 shadow-sm"
                                    )}
                                >
                                    {/* Select Checkbox */}
                                    <div
                                        onClick={(e) => toggleItemSelection(item.id, e)}
                                        className={clsx(
                                            "absolute top-3 left-3 z-10 w-5 h-5 rounded border transition-all flex items-center justify-center",
                                            selectedItems.includes(item.id)
                                                ? "bg-blue-600 border-blue-600 scale-110"
                                                : "bg-white/80 border-slate-300 opacity-0 group-hover:opacity-100"
                                        )}
                                    >
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>

                                    {/* Preview Block */}
                                    <div className="aspect-[4/3] rounded-xl bg-slate-50 mb-3 flex items-center justify-center relative overflow-hidden group/preview">
                                        {item.type === 'image' && item.url ? (
                                            <img src={item.url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        ) : (
                                            <div className="scale-150">{getIcon(item.type)}</div>
                                        )}

                                        {/* Quick Actions Overlay */}
                                        <div className="absolute inset-x-0 bottom-0 p-2 transform translate-y-full group-hover:translate-y-0 transition-transform bg-gradient-to-t from-black/20 to-transparent flex justify-center gap-1.5 backdrop-blur-[2px]">
                                            <button className="p-1.5 bg-white rounded-lg text-slate-700 hover:bg-blue-600 hover:text-white transition-colors shadow-sm"><Download size={14} /></button>
                                            <button className="p-1.5 bg-white rounded-lg text-slate-700 hover:bg-blue-600 hover:text-white transition-colors shadow-sm"><Share2 size={14} /></button>
                                            <button className="p-1.5 bg-white rounded-lg text-slate-700 hover:bg-red-600 hover:text-white transition-colors shadow-sm"><Trash2 size={14} /></button>
                                        </div>
                                    </div>

                                    <div className="px-2 pb-1.5 flex items-start justify-between">
                                        <div className="min-w-0 pr-2">
                                            <p className="font-bold text-xs text-slate-900 truncate tracking-tight">{item.name}</p>
                                            <p className="text-[10px] font-semibold text-slate-400 mt-0.5 uppercase tracking-wider">
                                                {item.type === 'folder' ? `${item.items} Items` : item.size}
                                            </p>
                                        </div>
                                        <button className="text-slate-300 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors">
                                            <MoreVertical size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Name</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Modified</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Size</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Owner</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {filteredItems.map(item => (
                                        <tr key={item.id} className="hover:bg-blue-50/30 group transition-colors cursor-pointer">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        onClick={(e) => toggleItemSelection(item.id, e)}
                                                        className={clsx(
                                                            "w-4 h-4 rounded border transition-all flex items-center justify-center",
                                                            selectedItems.includes(item.id) ? "bg-blue-600 border-blue-600" : "border-slate-300 bg-white"
                                                        )}
                                                    >
                                                        {selectedItems.includes(item.id) && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                                                    </div>
                                                    {getIcon(item.type)}
                                                    <span className="font-bold text-sm text-slate-900">{item.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500 font-medium">{item.date}</td>
                                            <td className="px-6 py-4 text-sm text-slate-500 font-medium">{item.size}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 border border-slate-200 uppercase">
                                                        {item.updatedBy[0]}
                                                    </div>
                                                    <span className="text-xs font-bold text-slate-600">{item.updatedBy}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-xl transition-all shadow-sm"><Download size={16} /></button>
                                                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-xl transition-all shadow-sm"><Copy size={16} /></button>
                                                    <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-xl transition-all shadow-sm"><Trash2 size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                )}
            </div>

            {/* Bottom Info Bar */}
            {selectedItems.length > 0 && (
                <div className="bg-slate-900 border-t border-slate-800 px-8 py-3 flex items-center justify-between text-white animate-in slide-in-from-bottom duration-300">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-bold">{selectedItems.length} items selected</span>
                        <div className="h-4 w-px bg-slate-700"></div>
                        <button
                            onClick={() => setSelectedItems([])}
                            className="text-slate-400 hover:text-white transition-colors"
                        >
                            Clear selection
                        </button>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2 hover:bg-slate-800 rounded-xl transition-all text-slate-300 hover:text-white flex items-center gap-2 text-xs font-bold">
                            <Download size={16} /> Download
                        </button>
                        <button className="p-2 hover:bg-slate-800 rounded-xl transition-all text-slate-300 hover:text-white flex items-center gap-2 text-xs font-bold">
                            <ArrowUpAz size={16} /> Move
                        </button>
                        <button className="p-2 hover:bg-red-500/20 rounded-xl transition-all text-rose-400 hover:text-rose-300 flex items-center gap-2 text-xs font-bold">
                            <Trash2 size={16} /> Delete
                        </button>
                    </div>
                </div>
            )}

            {/* New Folder Modal */}
            {showNewFolderModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-8 pt-8 pb-4 flex justify-between items-start">
                            <div className="bg-amber-50 p-3 rounded-2xl">
                                <Folder className="text-amber-500" size={28} />
                            </div>
                            <button
                                onClick={() => setShowNewFolderModal(false)}
                                className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="px-8 py-2">
                            <h2 className="text-2xl font-bold text-slate-900">Create New Folder</h2>
                            <p className="text-slate-500 mt-1 text-sm font-medium">Keep your media assets organized and easy to find.</p>
                        </div>
                        <div className="p-8 space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Folder Name</label>
                                <input
                                    type="text"
                                    autoFocus
                                    placeholder="e.g. Social Media Assets"
                                    className="w-full px-5 py-3.5 bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 rounded-2xl outline-none text-slate-900 placeholder:text-slate-300 transition-all border font-medium"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() => setShowNewFolderModal(false)}
                                    className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => setShowNewFolderModal(false)}
                                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-100 transition-all"
                                >
                                    Create Folder
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MediaLibraryPage;

