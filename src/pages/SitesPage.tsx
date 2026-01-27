import { useState } from 'react';
import { Layout, Globe, FileText, FormInput, MessageSquare, PenTool, Tv } from 'lucide-react';
import FunnelsTab from '../components/sites/FunnelsTab';

type SiteTab = 'funnels' | 'websites' | 'blogs' | 'wordpress' | 'forms' | 'surveys' | 'chat_widget' | 'media';

const SitesPage = () => {
    const [activeTab, setActiveTab] = useState<SiteTab>('funnels');

    const tabs: { id: SiteTab; label: string; icon: any }[] = [
        { id: 'funnels', label: 'Funnels', icon: Layout },
        { id: 'websites', label: 'Websites', icon: Globe },
        { id: 'blogs', label: 'Blogs', icon: PenTool },
        { id: 'wordpress', label: 'WordPress', icon: FileText },
        { id: 'forms', label: 'Forms', icon: FormInput },
        { id: 'surveys', label: 'Surveys', icon: FormInput },
        { id: 'chat_widget', label: 'Chat Widget', icon: MessageSquare },
        { id: 'media', label: 'Media', icon: Tv },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'funnels':
                return <FunnelsTab />;
            case 'websites':
                return (
                    <div className="text-center py-20">
                        <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                            <Globe size={40} className="text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Websites Yet</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">Build professional websites with our drag-and-drop builder. Secure, fast, and SEO-ready.</p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium">
                            + New Website
                        </button>
                    </div>
                );
            case 'blogs':
                return (
                    <div className="text-center py-20">
                        <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                            <PenTool size={40} className="text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Blogging</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">Share your expertise and grow your audience with our integrated blogging platform.</p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium">
                            + Create Blog Post
                        </button>
                    </div>
                );
            case 'wordpress':
                return (
                    <div className="text-center py-20">
                        <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                            <FileText size={40} className="text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">WordPress Hosting</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">Powered by Google Cloud Platform. Secure, fast, and managed WordPress hosting.</p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium">
                            Get Started
                        </button>
                    </div>
                );
            case 'forms':
                return (
                    <div className="text-center py-20">
                        <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                            <FormInput size={40} className="text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Forms Builder</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">Create custom forms to capture leads, collect feedback, and more.</p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium">
                            + Create Form
                        </button>
                    </div>
                );
            case 'surveys':
                return (
                    <div className="text-center py-20">
                        <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                            <FormInput size={40} className="text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Surveys Builder</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">Gather valuable insights from your audience with our easy-to-use survey builder.</p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium">
                            + Create Survey
                        </button>
                    </div>
                );
            case 'chat_widget':
                return (
                    <div className="text-center py-20">
                        <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                            <MessageSquare size={40} className="text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Chat Widget</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">Engage with visitors in real-time. Customize your chat widget to match your brand.</p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium">
                            Configure Widget
                        </button>
                    </div>
                );
            case 'media':
                return (
                    <div className="text-center py-20">
                        <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                            <Tv size={40} className="text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Media Library</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">Manage all your images, videos, and documents in one place.</p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium">
                            Open Media Library
                        </button>
                    </div>
                );
            default:
                return <div>Select a tab</div>;
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Header / Sub-navigation */}
            <div className="bg-white border-b border-gray-200 px-6 pt-4">
                <h1 className="text-2xl font-semibold text-gray-900 mb-4">Sites</h1>
                <div className="flex items-center gap-6 overflow-x-auto custom-scrollbar no-scrollbar-buttons">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 pb-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {/* <tab.icon size={16} />  -- Optional: hide icons in tabs if preferred for cleaner look, GHL usually has text tabs here */}
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
                {renderContent()}
            </div>
        </div>
    );
};

export default SitesPage;
