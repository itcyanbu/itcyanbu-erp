import { useState, useMemo } from 'react';
import { MessageSquare, Search, Send, Mail, MessageCircle, Phone, Star, Archive, User, Tag, Check, CheckCheck } from 'lucide-react';
import type { Conversation, Message, Channel } from '../types/conversations';
import { mockConversations } from '../data/mockConversations';

const ConversationsPage = () => {
    const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
    const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all');
    const [newMessage, setNewMessage] = useState('');

    const filteredConversations = useMemo(() => {
        let filtered = conversations;
        if (filter === 'unread') filtered = filtered.filter(c => c.unreadCount > 0);
        else if (filter === 'archived') filtered = filtered.filter(c => c.isArchived);
        else filtered = filtered.filter(c => !c.isArchived);

        if (searchQuery) {
            filtered = filtered.filter(c =>
                c.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.lastMessage.body.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return filtered.sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime());
    }, [conversations, filter, searchQuery]);

    const getChannelIcon = (channel: Channel) => {
        const icons = {
            email: <Mail size={16} className="text-blue-500" />,
            sms: <MessageCircle size={16} className="text-green-500" />,
            whatsapp: <Phone size={16} className="text-green-600" />,
            chat: <MessageSquare size={16} className="text-purple-500" />,
            internal: <MessageCircle size={16} className="text-gray-500" />
        };
        return icons[channel];
    };

    const formatTime = (date: Date) => {
        const diff = Date.now() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days === 1) return 'Yesterday';
        if (days < 7) return `${days}d ago`;
        return date.toLocaleDateString();
    };

    const handleSendMessage = () => {
        if (!newMessage.trim() || !selectedConv) return;
        const message: Message = {
            id: `m_${Date.now()}`,
            conversationId: selectedConv.id,
            type: 'message',
            from: 'user',
            userId: 'u1',
            userName: 'John Doe',
            body: newMessage,
            timestamp: new Date(),
            status: 'sent',
            channel: selectedConv.channel,
        };
        setConversations(prev => prev.map(conv => {
            if (conv.id === selectedConv.id) {
                return { ...conv, messages: [...conv.messages, message], lastMessage: message, lastUpdated: new Date() };
            }
            return conv;
        }));
        setSelectedConv(prev => prev ? { ...prev, messages: [...prev.messages, message], lastMessage: message, lastUpdated: new Date() } : null);
        setNewMessage('');
    };

    const handleSelectConv = (conv: Conversation) => {
        setSelectedConv(conv);
        if (conv.unreadCount > 0) {
            setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, unreadCount: 0 } : c));
        }
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
            <div className="px-8 py-6 bg-white border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <MessageSquare className="text-ghl-blue" size={28} />
                            <h1 className="text-2xl font-semibold text-gray-900">Conversations</h1>
                        </div>
                        <p className="text-gray-500">Manage your client communications</p>
                    </div>
                    <div className="flex items-center gap-2">
                        {(['all', 'unread', 'archived'] as const).map(f => (
                            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === f ? 'bg-ghl-blue text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                <div className="w-96 border-r border-gray-200 flex flex-col bg-white">
                    <div className="p-4 border-b border-gray-200">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input type="text" placeholder="Search conversations..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ghl-blue" />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {filteredConversations.map((conv) => (
                            <div key={conv.id} onClick={() => handleSelectConv(conv)} className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${selectedConv?.id === conv.id ? 'bg-blue-50 border-l-4 border-l-ghl-blue' : 'hover:bg-gray-50'}`}>
                                <div className="flex items-start gap-3">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">{conv.contact.name.charAt(0)}</div>
                                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">{getChannelIcon(conv.channel)}</div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className={`font-semibold text-gray-900 truncate ${conv.unreadCount > 0 ? 'font-bold' : ''}`}>{conv.contact.name}</span>
                                            <span className="text-xs text-gray-500 ml-2 shrink-0">{formatTime(conv.lastUpdated)}</span>
                                        </div>
                                        <p className={`text-sm text-gray-600 truncate ${conv.unreadCount > 0 ? 'font-semibold' : ''}`}>{conv.lastMessage.body}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            {conv.isStarred && <Star size={14} className="text-yellow-500 fill-yellow-500" />}
                                            {conv.assignedToName && <div className="flex items-center gap-1 text-xs text-gray-500"><User size={12} /><span>{conv.assignedToName}</span></div>}
                                            {conv.unreadCount > 0 && <span className="ml-auto bg-ghl-blue text-white text-xs rounded-full px-2 py-0.5">{conv.unreadCount}</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 flex flex-col bg-gray-50">
                    {selectedConv ? (
                        <>
                            <div className="px-6 py-4 bg-white border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">{selectedConv.contact.name.charAt(0)}</div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{selectedConv.contact.name}</h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">{getChannelIcon(selectedConv.channel)}<span className="capitalize">{selectedConv.channel}</span></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {selectedConv.isStarred && <Star size={18} className="text-yellow-500 fill-yellow-500" />}
                                        {selectedConv.isArchived && <Archive size={18} className="text-gray-500" />}
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {selectedConv.messages.map((message) => (
                                    <div key={message.id} className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[70%]`}>
                                            <div className={`rounded-2xl px-4 py-3 ${message.from === 'user' ? 'bg-ghl-blue text-white' : 'bg-white border border-gray-200 text-gray-900'}`}>
                                                {message.from === 'user' && message.userName && <p className="text-xs opacity-75 mb-1">{message.userName}</p>}
                                                <p className="text-sm leading-relaxed">{message.body}</p>
                                            </div>
                                            <div className={`flex items-center gap-2 mt-1 px-2 ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                                                {message.from === 'user' && (message.status === 'read' ? <CheckCheck size={14} className="text-blue-500" /> : <Check size={14} className="text-gray-400" />)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 bg-white border-t border-gray-200">
                                <div className="flex gap-3">
                                    <input type="text" placeholder="Type a message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ghl-blue" />
                                    <button onClick={handleSendMessage} disabled={!newMessage.trim()} className="bg-ghl-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                        <Send size={18} />Send
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <MessageSquare className="mx-auto text-gray-400 mb-4" size={64} />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                                <p className="text-gray-500">Choose a conversation from the list to view messages</p>
                            </div>
                        </div>
                    )}
                </div>

                {selectedConv && (
                    <div className="w-80 border-l border-gray-200 bg-white overflow-y-auto">
                        <div className="p-6">
                            <div className="text-center mb-6">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">{selectedConv.contact.name.charAt(0)}</div>
                                <h3 className="font-semibold text-lg text-gray-900">{selectedConv.contact.name}</h3>
                                <p className="text-sm text-gray-500">{selectedConv.contact.email}</p>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Contact Info</h4>
                                    <div className="space-y-2">
                                        {selectedConv.contact.phone && <div className="flex items-center gap-2 text-sm"><Phone size={16} className="text-gray-400" /><span className="text-gray-700">{selectedConv.contact.phone}</span></div>}
                                        {selectedConv.contact.email && <div className="flex items-center gap-2 text-sm"><Mail size={16} className="text-gray-400" /><span className="text-gray-700">{selectedConv.contact.email}</span></div>}
                                    </div>
                                </div>
                                {selectedConv.tags.length > 0 && (
                                    <div>
                                        <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Tags</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedConv.tags.map((tag, i) => (
                                                <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"><Tag size={12} />{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {selectedConv.assignedToName && (
                                    <div>
                                        <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Assigned To</h4>
                                        <div className="flex items-center gap-2"><User size={16} className="text-gray-400" /><span className="text-sm text-gray-700">{selectedConv.assignedToName}</span></div>
                                    </div>
                                )}
                                <div>
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Status</h4>
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${selectedConv.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                        {selectedConv.status.charAt(0).toUpperCase() + selectedConv.status.slice(1)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConversationsPage;
