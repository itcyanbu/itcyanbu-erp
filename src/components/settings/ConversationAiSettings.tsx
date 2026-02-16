import React, { useState } from 'react';
import {
    Bot,
    Zap,
    Send,
    Info,
    ChevronRight,
    Globe,
    MessageSquare,
    X,
    Target,
    BookOpen,
    Settings,
    Check
} from 'lucide-react';
import clsx from 'clsx';

interface ConversationAiSettingsProps {
    settings: any;
    onUpdate: (path: string, value: any) => void;
}

const ConversationAiSettings: React.FC<ConversationAiSettingsProps> = ({ settings, onUpdate }) => {
    const [activeSubTab, setActiveSubTab] = useState('Bot Settings');
    const [activeTrainingTab, setActiveTrainingTab] = useState('Website');
    const [isChannelDropdownOpen, setIsChannelDropdownOpen] = useState(false);
    const aiSettings = settings.conversationAi || {};
    const currentChannels = aiSettings.channels || ['SMS', 'Chat Widget (SMS chat)']; // Default channels as shown in screenshot

    const ALL_CHANNELS = ["Instagram", "Facebook", "SMS", "GBP", "Chat Widget (SMS chat)", "Live Chat"];

    const toggleChannel = (channel: string) => {
        const newChannels = currentChannels.includes(channel)
            ? currentChannels.filter((c: string) => c !== channel)
            : [...currentChannels, channel];
        onUpdate('conversationAi.channels', newChannels);
    };

    const tabs = ['Bot Settings', 'Bot Trial', 'Bot Training', 'Configure Intents'];

    // Mock data for training sources
    const trainingSources = [
        { id: 1, type: 'Website', name: 'https://itcyanbu.com/services', status: 'Trained', date: 'Feb 12, 2026' },
        { id: 2, type: 'Website', name: 'https://itcyanbu.com/about', status: 'Trained', date: 'Feb 12, 2026' },
        { id: 3, type: 'File', name: 'Service_Catalog_2026.pdf', status: 'In Progress', date: 'Feb 15, 2026' },
        { id: 4, type: 'Q&A', name: 'What are your working hours?', status: 'Trained', date: 'Feb 10, 2026' },
    ];

    const trainingStats = [
        { label: 'Total Trained', value: '42' },
        { label: 'Web Crawlers', value: '18' },
        { label: 'Files', value: '12' },
        { label: 'Q&As', value: '12' },
    ];

    const renderBotTraining = () => (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Summary Box */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                {trainingStats.map((stat) => (
                    <div key={stat.label} className="space-y-1">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                        <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Sub Tabs and Add Data */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-1">
                <nav className="flex space-x-8">
                    {['Website', 'Files', 'Google Docs', 'Q&A'].map((t) => (
                        <button
                            key={t}
                            onClick={() => setActiveTrainingTab(t)}
                            className={clsx(
                                "pb-4 px-1 border-b-2 font-bold text-sm transition-all",
                                activeTrainingTab === t
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-400 hover:text-gray-600"
                            )}
                        >
                            {t}
                        </button>
                    ))}
                </nav>
                <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-sm">
                    <Zap size={16} />
                    Add Data
                </button>
            </div>

            {/* Sources List */}
            <div className="overflow-hidden border border-gray-100 rounded-2xl">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Source</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Type</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Date Added</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {trainingSources.map((source) => (
                            <tr key={source.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <span className="text-sm font-bold text-gray-900 truncate block max-w-md">{source.name}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        {source.type === 'Website' && <Globe size={14} className="text-blue-500" />}
                                        {source.type === 'File' && <BookOpen size={14} className="text-orange-500" />}
                                        {source.type === 'Q&A' && <MessageSquare size={14} className="text-purple-500" />}
                                        <span className="text-xs font-bold text-gray-600">{source.type}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={clsx(
                                        "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                        source.status === 'Trained'
                                            ? "bg-green-50 text-green-600 border border-green-100"
                                            : "bg-blue-50 text-blue-600 border border-blue-100 animate-pulse"
                                    )}>
                                        {source.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{source.date}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50/30 border border-blue-100/50 rounded-2xl p-6 flex gap-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl h-fit">
                    <Info size={20} />
                </div>
                <div className="space-y-1">
                    <h4 className="text-sm font-bold text-gray-900">Training Quality Tip</h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">
                        For better bot accuracy, ensure your training sources are up-to-date and formatted clearly.
                        FAQs should be concise "Question & Answer" pairs.
                    </p>
                </div>
            </div>
        </div>
    );

    const renderPreferences = () => (
        <div className="space-y-6">
            <h3 className="text-base font-semibold text-gray-900">Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* OFF Mode */}
                <div
                    onClick={() => onUpdate('conversationAi.mode', 'OFF')}
                    className={clsx(
                        "relative p-6 border-2 rounded-xl cursor-pointer transition-all h-full",
                        aiSettings.mode === 'OFF' ? "border-blue-500 bg-white" : "border-gray-100 bg-gray-50/50 hover:border-gray-200"
                    )}
                >
                    <div className="flex gap-4">
                        <div className={clsx(
                            "w-12 h-12 rounded-lg flex items-center justify-center shrink-0",
                            aiSettings.mode === 'OFF' ? "bg-blue-50 text-blue-500" : "bg-white text-gray-400 border border-gray-100 shadow-sm"
                        )}>
                            <Bot size={24} className={aiSettings.mode === 'OFF' ? "" : "opacity-50"} />
                        </div>
                        <div className="flex-1 pr-6">
                            <h4 className="font-bold text-gray-900 mb-1">Off</h4>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Turn off Conversations AI. You can still edit details
                            </p>
                        </div>
                    </div>
                    <div className="absolute top-4 right-4 focus:outline-none">
                        <div className={clsx(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                            aiSettings.mode === 'OFF' ? "border-blue-500" : "border-gray-200"
                        )}>
                            {aiSettings.mode === 'OFF' && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
                        </div>
                    </div>
                </div>

                {/* Suggestive Mode */}
                <div
                    onClick={() => onUpdate('conversationAi.mode', 'Suggestive')}
                    className={clsx(
                        "relative p-6 border-2 rounded-xl cursor-pointer transition-all h-full",
                        aiSettings.mode === 'Suggestive' ? "border-blue-500 bg-white" : "border-gray-100 bg-gray-50/50 hover:border-gray-200"
                    )}
                >
                    <div className="flex gap-4">
                        <div className={clsx(
                            "w-12 h-12 rounded-lg flex items-center justify-center shrink-0",
                            aiSettings.mode === 'Suggestive' ? "bg-blue-50 text-blue-500" : "bg-white text-gray-400 border border-gray-100 shadow-sm"
                        )}>
                            <Zap size={24} />
                        </div>
                        <div className="flex-1 pr-6">
                            <h4 className="font-bold text-gray-900 mb-1">Suggestive</h4>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Helps you within the chat window.
                            </p>
                        </div>
                    </div>
                    <div className="absolute top-4 right-4 focus:outline-none">
                        <div className={clsx(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                            aiSettings.mode === 'Suggestive' ? "border-blue-500" : "border-gray-200"
                        )}>
                            {aiSettings.mode === 'Suggestive' && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
                        </div>
                    </div>
                </div>

                {/* Auto Pilot Mode */}
                <div
                    onClick={() => onUpdate('conversationAi.mode', 'Auto-Pilot')}
                    className={clsx(
                        "relative p-6 border-2 rounded-xl cursor-pointer transition-all h-full",
                        aiSettings.mode === 'Auto-Pilot' ? "border-blue-500 bg-white shadow-sm" : "border-gray-100 bg-gray-50/50 hover:border-gray-200"
                    )}
                >
                    <div className="flex gap-4">
                        <div className={clsx(
                            "w-12 h-12 rounded-lg flex items-center justify-center shrink-0",
                            aiSettings.mode === 'Auto-Pilot' ? "bg-blue-50 text-blue-500" : "bg-white text-gray-400 border border-gray-100 shadow-sm"
                        )}>
                            <Send size={24} />
                        </div>
                        <div className="flex-1 pr-6">
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-bold text-gray-900">Auto Pilot</h4>
                                <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">beta</span>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Will send messages automatically
                            </p>
                        </div>
                    </div>
                    <div className="absolute top-4 right-4 focus:outline-none">
                        <div className={clsx(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                            aiSettings.mode === 'Auto-Pilot' ? "border-blue-500" : "border-gray-200"
                        )}>
                            {aiSettings.mode === 'Auto-Pilot' && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-full -m-8 p-8" onClick={() => setIsChannelDropdownOpen(false)}>
            <div className="max-w-6xl mx-auto space-y-8" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-gray-900">Conversation AI</h1>
                    <p className="text-sm text-gray-500">Unlock the power of automated conversations</p>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-12">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveSubTab(tab)}
                                className={clsx(
                                    "pb-4 px-1 border-b-2 font-medium text-sm transition-all",
                                    activeSubTab === tab
                                        ? "border-blue-500 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* White Container */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-10">
                    {/* Bot Settings Tab Content */}
                    {activeSubTab === 'Bot Settings' && (
                        <>
                            {renderPreferences()}

                            <div className="space-y-4">
                                <h3 className="text-base font-semibold text-gray-900 font-bold">Supported Channels</h3>
                                <div className="relative">
                                    <div
                                        onClick={() => setIsChannelDropdownOpen(!isChannelDropdownOpen)}
                                        className="w-full border border-gray-300 rounded-lg p-2.5 flex flex-wrap gap-2 items-center bg-white min-h-[44px] cursor-pointer hover:border-gray-400 transition-colors shadow-sm"
                                    >
                                        {(currentChannels).map((channel: string) => (
                                            <div
                                                key={channel}
                                                className="bg-white border border-gray-300 rounded px-3 py-1.5 flex items-center gap-2 text-sm text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleChannel(channel);
                                                }}
                                            >
                                                {channel}
                                                <X size={14} className="text-gray-400 cursor-pointer hover:text-red-500" />
                                            </div>
                                        ))}
                                        {(currentChannels).length === 0 && (
                                            <span className="text-gray-400 text-sm font-medium">Select channels...</span>
                                        )}
                                        <div className="ml-auto">
                                            <ChevronRight className={clsx("text-gray-400 transition-transform", isChannelDropdownOpen ? "-rotate-90" : "rotate-90")} size={18} />
                                        </div>
                                    </div>

                                    {/* Dropdown Menu */}
                                    {isChannelDropdownOpen && (
                                        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 max-h-72 overflow-y-auto">
                                            <div className="py-1">
                                                {ALL_CHANNELS.map((channel) => {
                                                    const isSelected = currentChannels.includes(channel);
                                                    return (
                                                        <div
                                                            key={channel}
                                                            onClick={() => toggleChannel(channel)}
                                                            className={clsx(
                                                                "px-6 py-3 text-sm font-bold cursor-pointer flex items-center justify-between transition-colors",
                                                                isSelected ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                                                            )}
                                                        >
                                                            {channel}
                                                            {isSelected && <Check size={18} className="text-blue-500" />}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Trial Banner */}
                            <div className="bg-[#f0f9ff]/50 border border-[#e0f2fe] rounded-lg p-5 flex items-start justify-between">
                                <div className="flex gap-4">
                                    <div className="mt-1 text-blue-500">
                                        <Info size={20} />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 text-blue-400">
                                                <Target size={16} />
                                            </div>
                                            <h4 className="text-sm font-bold text-blue-600">AI bot trial</h4>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            Your AI bot is ready for trial. Ask it question based on your training data
                                        </p>
                                    </div>
                                </div>
                                <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors">
                                    Go to bot trial
                                </button>
                            </div>

                            {/* Advanced Settings */}
                            <div className="space-y-6 pt-4">
                                <div>
                                    <h3 className="text-base font-bold text-gray-900 mb-4">Advanced settings</h3>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Business Name (default is the location name)</label>
                                        <input
                                            type="text"
                                            value={aiSettings.businessName}
                                            onChange={(e) => onUpdate('conversationAi.businessName', e.target.value)}
                                            placeholder="Business Name"
                                            className="w-full md:w-1/2 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400"
                                        />
                                    </div>
                                </div>

                                <div className="h-px bg-gray-100" />

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">Auto-pilot mode</h3>
                                    <p className="text-sm text-gray-500 font-medium mb-6">Configure settings for the auto-pilot mode based on your business needs</p>

                                    <div className="text-sm text-gray-400 flex items-center gap-2 bg-gray-50/50 p-8 rounded-xl border border-dashed border-gray-200 justify-center">
                                        <div className="animate-blink flex items-center gap-2 text-center flex-col">
                                            <div className="flex items-center gap-2 font-bold text-gray-500">
                                                <Settings className="animate-spin-slow" size={16} />
                                                ( Wait for Auto-Pilot mode activation to configure intents )
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Bot Training Tab Content */}
                    {activeSubTab === 'Bot Training' && renderBotTraining()}

                    {/* Placeholder for other tabs */}
                    {activeSubTab !== 'Bot Settings' && activeSubTab !== 'Bot Training' && (
                        <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                                <BookOpen size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">{activeSubTab} Content</h3>
                            <p className="text-gray-500 max-w-sm">This section is currently being configured based on your bot's training data.</p>
                            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
                                Learn More
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-4 pt-8 pb-10 border-t border-gray-100">
                    <button className="px-10 py-3 border border-gray-200 rounded-xl text-lg font-black text-gray-700 bg-white hover:bg-gray-50 transition-all shadow-sm">
                        Cancel
                    </button>
                    <button
                        onClick={() => onUpdate('conversationAi.lastSaved', new Date().toISOString())}
                        className="px-12 py-3 bg-blue-600 text-white rounded-xl text-lg font-black hover:bg-blue-700 transition-all shadow-md shadow-blue-200"
                    >
                        Save
                    </button>
                </div>

                <style>{`
                    @keyframes sharp-blink {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0; }
                    }
                    .animate-blink {
                        animation: sharp-blink 1s steps(1) infinite;
                    }
                `}</style>
            </div>
        </div>
    );
};

export default ConversationAiSettings;
