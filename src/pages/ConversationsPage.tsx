import { useState, useMemo } from 'react';
import { MessageSquare, Search, Send, Mail, MessageCircle, Phone, Star, User, Tag, CheckCheck, Filter, MoreHorizontal, ChevronDown, Plus, Eye, ThumbsUp, ThumbsDown, Trash2, ArrowRight, Smile, Image } from 'lucide-react';
import type { Conversation, Message, Channel } from '../types/conversations';
import { mockConversations } from '../data/mockConversations';

const ConversationsPage = () => {
    const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
    const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<'unread' | 'recents' | 'all' | 'starred'>('unread');
    const [newMessage, setNewMessage] = useState('');
    const [messageMode, setMessageMode] = useState<'reply' | 'internal'>('reply');
    const [visibleChannels, setVisibleChannels] = useState<Set<Channel>>(new Set(['sms', 'email', 'whatsapp', 'chat', 'internal']));

    const filteredConversations = useMemo(() => {
        let filtered = conversations;
        if (filter === 'unread') filtered = filtered.filter(c => c.unreadCount > 0);
        else if (filter === 'starred') filtered = filtered.filter(c => c.isStarred);
        // 'recents' and 'all' show all for now, sorted by time

        if (searchQuery) {
            filtered = filtered.filter(c =>
                c.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.lastMessage.body.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return filtered.sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime());
    }, [conversations, filter, searchQuery]);

    const getChannelIcon = (channel: Channel, size = 16) => {
        const icons = {
            email: <Mail size={size} className="text-blue-500" />,
            sms: <MessageCircle size={size} className="text-green-500" />,
            whatsapp: <Phone size={size} className="text-green-600" />,
            chat: <MessageSquare size={size} className="text-purple-500" />,
            internal: <MessageCircle size={size} className="text-gray-500" />
        };
        return icons[channel] || <MessageSquare size={size} className="text-gray-400" />;
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDateHeader = (date: Date) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) return 'Today';
        if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
        return date.toLocaleDateString();
    };

    const toggleChannelVisibility = (channel: Channel) => {
        setVisibleChannels(prev => {
            const newSet = new Set(prev);
            if (newSet.has(channel)) newSet.delete(channel);
            else newSet.add(channel);
            return newSet;
        });
    };

    const handleSendMessage = () => {
        if (!newMessage.trim() || !selectedConv) return;
        const message: Message = {
            id: `m_${Date.now()}`,
            conversationId: selectedConv.id,
            type: messageMode === 'internal' ? 'internal_comment' : 'message',
            from: 'user',
            userId: 'u1',
            userName: 'John Doe',
            body: newMessage,
            timestamp: new Date(),
            status: 'sent',
            channel: selectedConv.channel,
            isInternal: messageMode === 'internal'
        };

        const updatedConv = {
            ...selectedConv,
            messages: [...selectedConv.messages, message],
            lastMessage: message,
            lastUpdated: new Date()
        };

        setConversations(prev => prev.map(conv => conv.id === selectedConv.id ? updatedConv : conv));
        setSelectedConv(updatedConv);
        setNewMessage('');
    };

    const handleSelectConv = (conv: Conversation) => {
        setSelectedConv(conv);
        if (conv.unreadCount > 0) {
            setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, unreadCount: 0 } : c));
        }
    };

    // Group messages by date and filter by channel
    const groupedMessages = useMemo(() => {
        if (!selectedConv) return [];
        const filtered = selectedConv.messages.filter(msg => {
            if (msg.isInternal) return visibleChannels.has('internal');
            return visibleChannels.has(msg.channel);
        });

        const groups: { date: string; messages: Message[] }[] = [];
        filtered.forEach(msg => {
            const dateStr = formatDateHeader(msg.timestamp);
            const lastGroup = groups[groups.length - 1];
            if (lastGroup && lastGroup.date === dateStr) {
                lastGroup.messages.push(msg);
            } else {
                groups.push({ date: dateStr, messages: [msg] });
            }
        });
        return groups;
    }, [selectedConv, visibleChannels]);

    return (
        <div className="flex bg-gray-50 h-[calc(100vh-64px)] overflow-hidden">
            {/* Left Sidebar: Team Inbox */}
            <div className="w-80 flex flex-col border-r border-gray-200 bg-white">
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-gray-900">Team Inbox</h2>
                        <div className="flex gap-2">
                            <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded"><CheckCheck size={16} /></button>
                            <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded"><Filter size={16} /></button>
                            <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded"><ArrowRight size={16} /></button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex bg-gray-100 p-1 rounded-lg mb-4">
                        {(['unread', 'all', 'recents', 'starred'] as const).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setFilter(tab)}
                                className={`flex-1 py-1.5 text-xs font-medium text-center rounded-md capitalize ${filter === tab
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {filteredConversations.map((conv) => (
                        <div
                            key={conv.id}
                            onClick={() => handleSelectConv(conv)}
                            className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${selectedConv?.id === conv.id ? 'bg-blue-50 border-l-2 border-l-blue-500' : ''}`}
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-sm font-medium text-gray-600">
                                    {conv.contact.name.slice(0, 2).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className={`text-sm truncate ${conv.unreadCount > 0 ? 'font-bold text-gray-900' : 'text-gray-700'}`}>
                                            {conv.contact.name}
                                        </h3>
                                        <span className="text-xs text-gray-400">{formatTime(conv.lastUpdated)}</span>
                                    </div>
                                    <div className="flex items-center gap-1 mb-1">
                                        {getChannelIcon(conv.channel, 12)}
                                        <p className={`text-xs truncate ${conv.unreadCount > 0 ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                                            {conv.lastMessage.body}
                                        </p>
                                    </div>
                                </div>
                                {conv.unreadCount > 0 && (
                                    <span className="bg-gray-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                                        {conv.unreadCount}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Middle Panel: Message History */}
            <div className={`flex-1 flex flex-col bg-white border-r border-gray-200 ${!selectedConv ? 'items-center justify-center' : ''}`}>
                {!selectedConv ? (
                    <div className="text-center text-gray-500">
                        <MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
                        <p>Select a conversation to view messages</p>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="h-16 px-6 border-b border-gray-200 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900">{selectedConv.contact.name}</span>
                                <span className="text-gray-400 text-xs gap-1 flex items-center">
                                    {getChannelIcon(selectedConv.channel, 14)}
                                    {selectedConv.contact.phone || selectedConv.contact.email}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md flex items-center gap-1">
                                    <CheckCircleIcon />
                                    <ChevronDown size={14} />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"><Phone size={18} /></button>
                                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"><Star size={18} /></button>
                                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"><Mail size={18} /></button>
                                <div className="w-[1px] h-6 bg-gray-200 mx-1"></div>
                                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"><Trash2 size={18} /></button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                            {groupedMessages.map((group, groupIdx) => (
                                <div key={groupIdx}>
                                    <div className="flex justify-center mb-6">
                                        <span className="bg-white border border-gray-200 px-3 py-1 rounded-full text-xs text-gray-500 flex items-center gap-1 shadow-sm">
                                            {group.date}
                                        </span>
                                    </div>

                                    {group.messages.map((msg) => {
                                        const isInternal = msg.type === 'internal_comment';
                                        const isUser = msg.from === 'user';

                                        return (
                                            <div key={msg.id} className={`flex flex-col mb-6 ${isUser && !isInternal ? 'items-end' : 'items-start'}`}>
                                                <div className={`flex gap-3 max-w-[85%] ${isUser && !isInternal ? 'flex-row-reverse' : ''}`}>
                                                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-xs font-bold shrink-0">
                                                        {msg.userName ? msg.userName.charAt(0) : 'U'}
                                                    </div>

                                                    <div className="group">
                                                        {/* Meta line */}
                                                        <div className={`flex items-center gap-2 mb-1 text-xs text-gray-500 ${isUser && !isInternal ? 'justify-end' : ''}`}>
                                                            <span className="font-medium text-gray-900">{isUser ? 'You' : selectedConv.contact.name}</span>
                                                            {isInternal && <span className="text-yellow-600 bg-yellow-100 px-1 rounded text-[10px]">Internal Note</span>}
                                                            <span>{formatTime(msg.timestamp)}</span>
                                                        </div>

                                                        {/* Bubble */}
                                                        <div className={`
                                                            p-4 rounded-lg shadow-sm text-sm whitespace-pre-wrap
                                                            ${isInternal
                                                                ? 'bg-yellow-50 border border-yellow-200 text-gray-800'
                                                                : isUser
                                                                    ? 'bg-blue-600 text-white'
                                                                    : 'bg-white border border-gray-200 text-gray-800'}
                                                        `}>
                                                            {msg.body}
                                                        </div>

                                                        {/* Actions */}
                                                        <div className={`flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${isUser && !isInternal ? 'justify-end' : ''}`}>
                                                            <button className="text-gray-400 hover:text-gray-600"><Tag size={14} /></button>
                                                            <button className="text-gray-400 hover:text-gray-600"><ThumbsUp size={14} /></button>
                                                            <button className="text-gray-400 hover:text-gray-600"><ThumbsDown size={14} /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className={`p-4 border-t border-gray-200 ${messageMode === 'internal' ? 'bg-yellow-50' : 'bg-white'}`}>
                            {messageMode === 'internal' && (
                                <div className="text-xs text-yellow-700 font-medium mb-2 px-1">
                                    Internal Note - visible only to your team
                                </div>
                            )}
                            <div className="relative">
                                <textarea
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder={messageMode === 'internal' ? "@ to tag users" : "Type a message..."}
                                    className={`w-full p-4 pr-12 rounded-lg border focus:ring-1 focus:outline-none resize-none h-24 ${messageMode === 'internal'
                                        ? 'bg-white border-yellow-300 focus:border-yellow-400 focus:ring-yellow-400'
                                        : 'bg-white border-gray-200 focus:border-blue-400 focus:ring-blue-400'
                                        }`}
                                />
                                <div className="absolute bottom-3 left-3 flex items-center gap-3">
                                    <button
                                        onClick={() => setMessageMode(prev => prev === 'reply' ? 'internal' : 'reply')}
                                        className={`flex items-center gap-1 text-sm font-medium transition-colors ${messageMode === 'internal' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                        title="Toggle Internal Note"
                                    >
                                        <Eye size={18} className={messageMode === 'internal' ? 'text-blue-600' : 'text-gray-500'} />
                                        <ChevronDown size={14} />
                                    </button>
                                    <button className="text-gray-400 hover:text-gray-600"><Smile size={20} /></button>
                                    <button className="text-gray-400 hover:text-gray-600"><Image size={20} /></button>
                                </div>
                                <div className="absolute bottom-3 right-3">
                                    <button
                                        onClick={handleSendMessage}
                                        className={`p-2 rounded-lg text-white transition-colors ${messageMode === 'internal' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                                    >
                                        <Send size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Right Sidebar: Contact Details */}
            {selectedConv && (
                <div className="w-80 bg-gray-50 border-l border-gray-200 flex flex-col h-full overflow-hidden">
                    <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
                        <h3 className="font-semibold text-gray-800">Contact Details</h3>
                        <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={18} /></button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-6">
                        {/* Profile Header */}
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 mb-2">
                                {selectedConv.contact.name.slice(0, 2).toUpperCase()}
                            </div>
                            <h2 className="font-bold text-gray-900 text-lg">{selectedConv.contact.name}</h2>
                            {selectedConv.contact.company && <p className="text-sm text-gray-500">{selectedConv.contact.company}</p>}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 justify-center">
                            <button className="p-2 border border-gray-200 rounded-full bg-white text-gray-600 hover:bg-gray-50"><Phone size={18} /></button>
                            <button className="p-2 border border-gray-200 rounded-full bg-white text-gray-600 hover:bg-gray-50"><MessageCircle size={18} /></button>
                            <button className="p-2 border border-gray-200 rounded-full bg-white text-gray-600 hover:bg-gray-50"><Mail size={18} /></button>
                        </div>

                        {/* Sections */}
                        <div className="space-y-4">
                            {/* Owner */}
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Owner</label>
                                <div className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-md">
                                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-xs text-purple-700">U</div>
                                    <span className="text-sm text-gray-700">Unassigned</span>
                                    <ChevronDown size={14} className="ml-auto text-gray-400" />
                                </div>
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Tags</label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {selectedConv.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded flex items-center gap-1">
                                            {tag} <button className="hover:text-red-500">×</button>
                                        </span>
                                    ))}
                                    <button className="p-1 rounded bg-white border border-gray-300 text-gray-500 hover:bg-gray-50"><Plus size={14} /></button>
                                </div>
                            </div>

                            {/* Tabs: All Fields, DND, Actions */}
                            <div className="flex border-b border-gray-200 mb-2">
                                <button className="flex-1 py-2 text-xs font-semibold text-gray-900 border-b-2 border-gray-900">All Fields</button>
                                <button className="flex-1 py-2 text-xs font-medium text-gray-500 hover:text-gray-700">DND</button>
                                <button className="flex-1 py-2 text-xs font-medium text-gray-500 hover:text-gray-700">Actions</button>
                            </div>

                            {/* Fields Search */}
                            <div className="relative mb-4">
                                <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                <input type="text" placeholder="Search Fields" className="w-full pl-8 pr-2 py-1.5 bg-white border border-gray-200 rounded text-xs focus:ring-1 focus:ring-blue-500 outline-none" />
                            </div>

                            {/* Accordion Items (Mock) */}
                            {['Lead', 'Contact', 'General Info'].map(section => (
                                <div key={section} className="border border-gray-200 rounded bg-white overflow-hidden">
                                    <div className="flex items-center justify-between p-2 bg-gray-50 cursor-pointer">
                                        <span className="text-sm font-medium text-gray-700">{section}</span>
                                        <Plus size={14} className="text-gray-400" />
                                    </div>
                                    <div className="p-3 space-y-3">
                                        <div>
                                            <label className="text-xs text-gray-500 block">First Name</label>
                                            <div className="text-sm text-gray-900 font-medium">{selectedConv.contact.name.split(' ')[0]}</div>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-500 block">Last Name</label>
                                            <div className="text-sm text-gray-900 font-medium">{selectedConv.contact.name.split(' ')[1] || '-'}</div>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-500 block">Email</label>
                                            <div className="text-sm text-gray-900 font-medium truncate">{selectedConv.contact.email}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Helper Icon for Header
const CheckCircleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

export default ConversationsPage;
