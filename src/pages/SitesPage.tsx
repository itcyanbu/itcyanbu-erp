import { useState } from 'react';
import { LayoutTemplate, Globe, FileText, FormInput, MessageSquare, PenTool, Tv } from 'lucide-react';
import FunnelsTab from '../components/sites/FunnelsTab';
import GenericSiteList from '../components/sites/GenericSiteList';
import { mockWebsites, mockBlogs, mockForms, mockSurveys, mockChatWidgets, mockWordPress } from '../data/mockSitesData';


type SiteTab = 'funnels' | 'websites' | 'blogs' | 'wordpress' | 'forms' | 'surveys' | 'chat_widget' | 'media';

const SitesPage = () => {
    const [activeTab, setActiveTab] = useState<SiteTab>('funnels');

    const tabs: { id: SiteTab; label: string; icon: any }[] = [
        { id: 'funnels', label: 'Funnels', icon: LayoutTemplate },
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
                    <GenericSiteList
                        title="Websites"
                        items={mockWebsites}
                        newItemLabel="New Website"
                        icon={Globe}
                    />
                );
            case 'blogs':
                return (
                    <GenericSiteList
                        title="Blogs"
                        items={mockBlogs}
                        newItemLabel="Create Blog Post"
                        icon={PenTool}
                    />
                );
            case 'wordpress':
                return (
                    <GenericSiteList
                        title="WordPress Sites"
                        items={mockWordPress}
                        newItemLabel="Create WordPress Site"
                        icon={FileText}
                    />
                );
            case 'forms':
                return (
                    <GenericSiteList
                        title="Forms"
                        items={mockForms}
                        newItemLabel="Create Form"
                        icon={FormInput}
                    />
                );
            case 'surveys':
                return (
                    <GenericSiteList
                        title="Surveys"
                        items={mockSurveys}
                        newItemLabel="Create Survey"
                        icon={FormInput}
                    />
                );
            case 'chat_widget':
                return (
                    <GenericSiteList
                        title="Chat Widgets"
                        items={mockChatWidgets}
                        newItemLabel="Configure Widget"
                        icon={MessageSquare}
                    />
                );
            case 'media':
                return (
                    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Media Library</h3>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2">
                                <Tv size={16} />
                                Upload File
                            </button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 hover:border-blue-500 cursor-pointer transition-colors group relative">
                                    <Tv className="text-gray-400 group-hover:text-blue-500" size={32} />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors rounded-lg" />
                                </div>
                            ))}
                        </div>
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
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-semibold text-gray-900">Sites</h1>
                    <a
                        href="https://help.gohighlevel.com/support/home"
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                    >
                        Need Help?
                    </a>
                </div>
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
                            <tab.icon size={16} />
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
