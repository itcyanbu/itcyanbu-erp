import { MessageSquare, Send, Search } from 'lucide-react';

const ConversationsPage = () => {
    const conversations = [
        { name: 'John Smith', lastMessage: 'Thanks for the follow-up!', time: '2m ago', unread: 2 },
        { name: 'Sarah Johnson', lastMessage: 'Can we schedule a call?', time: '15m ago', unread: 0 },
        { name: 'Mike Wilson', lastMessage: 'I have a question about...', time: '1h ago', unread: 1 },
    ];

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
            <div className="px-8 py-6 bg-white border-b border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                    <MessageSquare className="text-ghl-blue" size={28} />
                    <h1 className="text-2xl font-semibold text-gray-900">Conversations</h1>
                </div>
                <p className="text-gray-500">Manage your client communications</p>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Conversations List */}
                <div className="w-80 border-r border-gray-200 flex flex-col">
                    <div className="p-4 border-b border-gray-200">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ghl-blue"
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {conversations.map((conv, i) => (
                            <div key={i} className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
                                <div className="flex items-start justify-between mb-1">
                                    <span className="font-medium text-gray-900">{conv.name}</span>
                                    <span className="text-xs text-gray-500">{conv.time}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                                    {conv.unread > 0 && (
                                        <span className="ml-2 bg-ghl-blue text-white text-xs rounded-full px-2 py-0.5">{conv.unread}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Message Area */}
                <div className="flex-1 flex flex-col">
                    <div className="flex-1 flex items-center justify-center bg-gray-50">
                        <div className="text-center">
                            <MessageSquare className="mx-auto text-gray-400 mb-4" size={64} />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                            <p className="text-gray-500">Choose a conversation from the list to view messages</p>
                        </div>
                    </div>
                    <div className="p-4 border-t border-gray-200">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ghl-blue"
                            />
                            <button className="bg-ghl-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                                <Send size={18} />
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConversationsPage;
