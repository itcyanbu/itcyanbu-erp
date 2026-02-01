import { useState } from 'react';
import {
    Folder,
    File,
    Image as ImageIcon,
    Video as VideoIcon,
    FileText,
    Plus,
    Search,
    ChevronRight,
    MoreHorizontal,
    Grid,
    List,
    Upload,
    Download,
    Trash2,
    Edit2
} from 'lucide-react';

const MediaLibraryPage = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [currentPath, setCurrentPath] = useState(['Home']);

    const tabs = ['All', 'Images', 'Videos', 'Documents'];

    const mediaItems = [
        { id: 1, name: 'Marketing Assets', type: 'folder', items: 12, size: '-', date: '2024-01-20' },
        { id: 2, name: 'Client Project A', type: 'folder', items: 8, size: '-', date: '2024-01-18' },
        { id: 3, name: 'logo-vertical.png', type: 'image', size: '1.2 MB', date: '2024-01-22', url: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=200&h=200&auto=format&fit=crop' },
        { id: 4, name: 'testimonial-clip.mp4', type: 'video', size: '45.8 MB', date: '2024-01-15' },
        { id: 5, name: 'agency-brochure.pdf', type: 'document', size: '2.4 MB', date: '2024-01-10' },
        { id: 6, name: 'banner-hero.jpg', type: 'image', size: '3.5 MB', date: '2024-01-21', url: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=200&h=200&auto=format&fit=crop' },
        { id: 7, name: 'social-post-01.png', type: 'image', size: '850 KB', date: '2024-01-19', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=200&h=200&auto=format&fit=crop' },
        { id: 8, name: 'contract-template.docx', type: 'document', size: '45 KB', date: '2024-01-05' },
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case 'folder': return <Folder className="text-blue-500 fill-blue-500/10" size={24} />;
            case 'image': return <ImageIcon className="text-purple-500" size={24} />;
            case 'video': return <VideoIcon className="text-red-500" size={24} />;
            case 'document': return <FileText className="text-orange-500" size={24} />;
            default: return <File className="text-gray-400" size={24} />;
        }
    };

    return (
        <div className="h-full flex flex-col bg-gray-50 overflow-hidden text-ghl-text">
            {/* Header */}
            <header className="px-8 py-6 bg-white border-b border-gray-200 shrink-0">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
                        <p className="text-gray-500 mt-1">Upload and manage your images, videos, and documents.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
                            <Plus size={16} />
                            New Folder
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2 shadow-sm">
                            <Upload size={16} />
                            Upload File
                        </button>
                    </div>
                </div>

                {/* Breadcrumbs and Actions row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 overflow-x-auto pb-2 md:pb-0">
                        {currentPath.map((item, index) => (
                            <div key={index} className="flex items-center gap-2 shrink-0">
                                <button
                                    className={`hover:text-blue-600 transition-colors ${index === currentPath.length - 1 ? 'font-semibold text-gray-900' : ''}`}
                                    onClick={() => setCurrentPath(currentPath.slice(0, index + 1))}
                                >
                                    {item}
                                </button>
                                {index < currentPath.length - 1 && <ChevronRight size={14} />}
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search media..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>
                        <div className="flex border border-gray-300 rounded-lg bg-white overflow-hidden shrink-0">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-gray-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                <Grid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 border-l border-gray-300 transition-colors ${viewMode === 'list' ? 'bg-gray-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                <List size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 border-b border-gray-200 mt-6 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">

                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                        {mediaItems.filter(item => activeTab === 'All' || activeTab.toLowerCase().includes(item.type)).map((item) => (
                            <div key={item.id} className="group bg-white rounded-xl border border-gray-200 p-3 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer relative overflow-hidden">
                                <div className="aspect-square bg-gray-50 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                                    {item.type === 'image' && item.url ? (
                                        <img src={item.url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    ) : (
                                        getIcon(item.type)
                                    )}

                                    {/* Overlay Actions */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40"><Download size={16} /></button>
                                        <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40"><Trash2 size={16} /></button>
                                    </div>
                                </div>

                                <div className="flex items-start justify-between">
                                    <div className="min-w-0 pr-2">
                                        <p className="font-medium text-sm text-gray-900 truncate" title={item.name}>{item.name}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{item.type === 'folder' ? `${item.items} items` : item.size}</p>
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-600 shrink-0">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <table className="w-full text-left text-sm text-gray-500">
                            <thead className="bg-gray-50 text-gray-700 uppercase font-medium">
                                <tr>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Size</th>
                                    <th className="px-6 py-4">Modified</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {mediaItems.filter(item => activeTab === 'All' || activeTab.toLowerCase().includes(item.type)).map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {getIcon(item.type)}
                                                <span className="font-medium text-gray-900">{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 capitalize">{item.type}</td>
                                        <td className="px-6 py-4">{item.size}</td>
                                        <td className="px-6 py-4">{item.date}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16} /></button>
                                                <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"><Download size={16} /></button>
                                                <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {mediaItems.filter(item => activeTab === 'All' || activeTab.toLowerCase().includes(item.type)).length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <File size={64} className="mb-4 opacity-20" />
                        <p className="text-lg">No {activeTab.toLowerCase()} files found here.</p>
                        <button className="mt-4 text-blue-600 hover:underline">Upload your first file</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MediaLibraryPage;
