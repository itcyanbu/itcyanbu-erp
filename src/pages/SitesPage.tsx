import { useState } from 'react';
import { LayoutTemplate, Globe, FileText, FormInput, MessageSquare, PenTool, Tv } from 'lucide-react';
import FunnelsTab from '../components/sites/FunnelsTab';
import GenericSiteList from '../components/sites/GenericSiteList';
import CreateSiteModal from '../components/sites/CreateSiteModal';
import { mockWebsites, mockBlogs, mockForms, mockSurveys, mockChatWidgets, mockWordPress, type SiteItem } from '../data/mockSitesData';
import { mockFunnels, type Funnel } from '../data/mockFunnels';


type SiteTab = 'funnels' | 'websites' | 'blogs' | 'wordpress' | 'forms' | 'surveys' | 'chat_widget' | 'media';

const SitesPage = () => {
    const [activeTab, setActiveTab] = useState<SiteTab>('funnels');

    // State for lists
    const [funnels, setFunnels] = useState<Funnel[]>(mockFunnels);
    const [websites, setWebsites] = useState<SiteItem[]>(mockWebsites);
    const [blogs, setBlogs] = useState<SiteItem[]>(mockBlogs);
    const [forms, setForms] = useState<SiteItem[]>(mockForms);
    const [surveys, setSurveys] = useState<SiteItem[]>(mockSurveys);
    const [chatWidgets, setChatWidgets] = useState<SiteItem[]>(mockChatWidgets);
    const [wordPressSites, setWordPressSites] = useState<SiteItem[]>(mockWordPress);

    // Modal State
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [createType, setCreateType] = useState('');

    const openCreateModal = (type: string) => {
        setCreateType(type);
        setIsCreateModalOpen(true);
    };

    const handleCreate = (name: string) => {
        const newItemBase = {
            id: Date.now().toString(),
            name,
            status: 'Draft' as const,
            lastUpdated: 'Just now',
        };

        switch (createType) {
            case 'Funnel':
                setFunnels([{ ...newItemBase, steps: 0, type: 'Sales' } as Funnel, ...funnels]);
                break;
            case 'Website':
                setWebsites([{ ...newItemBase, stats: '0 Pages', type: 'Business' }, ...websites]);
                break;
            case 'Blog':
                setBlogs([{ ...newItemBase, stats: '0 Posts', type: 'General' }, ...blogs]);
                break;
            case 'WordPress Site':
                setWordPressSites([{ ...newItemBase, stats: 'v6.4', type: 'Managed' }, ...wordPressSites]);
                break;
            case 'Form':
                setForms([{ ...newItemBase, stats: '0 Submissions' }, ...forms]);
                break;
            case 'Survey':
                setSurveys([{ ...newItemBase, stats: '0 Responses' }, ...surveys]);
                break;
            case 'Chat Widget':
                setChatWidgets([{ ...newItemBase, stats: 'Default Theme' }, ...chatWidgets]);
                break;
            default:
                break;
        }
    };

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
                return <FunnelsTab items={funnels} onCreate={() => openCreateModal('Funnel')} />;
            case 'websites':
                return (
                    <GenericSiteList
                        title="Websites"
                        items={websites}
                        newItemLabel="New Website"
                        icon={Globe}
                        onNewItem={() => openCreateModal('Website')}
                    />
                );
            case 'blogs':
                return (
                    <GenericSiteList
                        title="Blogs"
                        items={blogs}
                        newItemLabel="Create Blog Post"
                        icon={PenTool}
                        onNewItem={() => openCreateModal('Blog')}
                    />
                );
            case 'wordpress':
                return (
                    <GenericSiteList
                        title="WordPress Sites"
                        items={wordPressSites}
                        newItemLabel="Create WordPress Site"
                        icon={FileText}
                        onNewItem={() => openCreateModal('WordPress Site')}
                    />
                );
            case 'forms':
                return (
                    <GenericSiteList
                        title="Forms"
                        items={forms}
                        newItemLabel="Create Form"
                        icon={FormInput}
                        onNewItem={() => openCreateModal('Form')}
                    />
                );
            case 'surveys':
                return (
                    <GenericSiteList
                        title="Surveys"
                        items={surveys}
                        newItemLabel="Create Survey"
                        icon={FormInput}
                        onNewItem={() => openCreateModal('Survey')}
                    />
                );
            case 'chat_widget':
                return (
                    <GenericSiteList
                        title="Chat Widgets"
                        items={chatWidgets}
                        newItemLabel="Configure Widget"
                        icon={MessageSquare}
                        onNewItem={() => openCreateModal('Chat Widget')}
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

            <CreateSiteModal
                key={isCreateModalOpen ? 'open' : 'closed'}
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreate}
                type={createType}
            />
        </div>
    );
};

export default SitesPage;
