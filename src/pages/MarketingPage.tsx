import { useState } from 'react';
import {
    LayoutGrid,
    Mail,
    FileText,
    Link as LinkIcon,
    Users,
    Plus,
    ChevronDown,
    PenTool
} from 'lucide-react';
import SocialPlannerTab from '../components/marketing/SocialPlannerTab';
import EmailsTab from '../components/marketing/EmailsTab';
import TemplatesTab from '../components/marketing/TemplatesTab';
import TriggerLinksTab from '../components/marketing/TriggerLinksTab';
import AffiliateManagerTab from '../components/marketing/AffiliateManagerTab';

const MarketingPage = () => {
    const [activeTab, setActiveTab] = useState('Social Planner');
    const [isCreateDropdownOpen, setIsCreateDropdownOpen] = useState(false);

    const tabs = [
        { id: 'Social Planner', label: 'Social Planner', icon: LayoutGrid },
        { id: 'Emails', label: 'Emails', icon: Mail },
        { id: 'Templates', label: 'Templates', icon: FileText },
        { id: 'Trigger Links', label: 'Trigger Links', icon: LinkIcon },
        { id: 'Affiliate Manager', label: 'Affiliate Manager', icon: Users },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Social Planner': return <SocialPlannerTab />;
            case 'Emails': return <EmailsTab />;
            case 'Templates': return <TemplatesTab />;
            case 'Trigger Links': return <TriggerLinksTab />;
            case 'Affiliate Manager': return <AffiliateManagerTab />;
            default: return <SocialPlannerTab />;
        }
    };

    return (
        <div className="h-full flex flex-col bg-gray-50 overflow-hidden" onClick={() => isCreateDropdownOpen && setIsCreateDropdownOpen(false)}>
            {/* Header */}
            <header className="px-8 py-6 bg-white border-b border-gray-200 shrink-0">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Marketing</h1>
                        <p className="text-gray-500 mt-1">Manage your social media, emails, and affiliate campaigns.</p>
                    </div>

                    {/* Create New Button & Dropdown */}
                    <div className="relative">
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsCreateDropdownOpen(!isCreateDropdownOpen); }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm shadow-blue-200"
                        >
                            <Plus size={16} />
                            Create New
                            <ChevronDown size={14} className={`transition-transform ${isCreateDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isCreateDropdownOpen && (
                            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                                <button className="w-full text-left px-3 py-2.5 hover:bg-gray-50 rounded-lg flex items-center gap-3 text-sm text-gray-700 font-medium transition-colors">
                                    <PenTool size={16} className="text-pink-500" />
                                    Social Post
                                </button>
                                <button className="w-full text-left px-3 py-2.5 hover:bg-gray-50 rounded-lg flex items-center gap-3 text-sm text-gray-700 font-medium transition-colors">
                                    <Mail size={16} className="text-blue-500" />
                                    Email Campaign
                                </button>
                                <button className="w-full text-left px-3 py-2.5 hover:bg-gray-50 rounded-lg flex items-center gap-3 text-sm text-gray-700 font-medium transition-colors">
                                    <FileText size={16} className="text-orange-500" />
                                    Template
                                </button>
                                <button className="w-full text-left px-3 py-2.5 hover:bg-gray-50 rounded-lg flex items-center gap-3 text-sm text-gray-700 font-medium transition-colors">
                                    <LinkIcon size={16} className="text-green-500" />
                                    Trigger Link
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default MarketingPage;
