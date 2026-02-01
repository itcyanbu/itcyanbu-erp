import { useState } from 'react';
import {
    LayoutDashboard,
    MessageSquare,
    Star,
    MapPin,
    ArrowUp,
    ArrowDown,
    Send,
    ThumbsUp,
    ThumbsDown,
    Search,
    Filter
} from 'lucide-react';

const ReputationPage = () => {
    const [activeTab, setActiveTab] = useState('Overview');

    const tabs = [
        { id: 'Overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'Requests', label: 'Requests', icon: Send },
        { id: 'Reviews', label: 'Reviews', icon: Star },
        { id: 'Listings', label: 'Listings', icon: MapPin },
    ];

    const reviews = [
        { id: 1, author: 'John Doe', rating: 5, source: 'Google', date: '2 days ago', text: 'Great service! Highly recommended.', sentiment: 'Positive' },
        { id: 2, author: 'Jane Smith', rating: 4, source: 'Facebook', date: '1 week ago', text: 'Good experience, but the wait was a bit long.', sentiment: 'Neutral' },
        { id: 3, author: 'Mike Johnson', rating: 5, source: 'Google', date: '2 weeks ago', text: 'Absolutely fantastic team.', sentiment: 'Positive' },
    ];

    return (
        <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
            {/* Header */}
            <header className="px-8 py-6 bg-white border-b border-gray-200 shrink-0">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Reputation</h1>
                        <p className="text-gray-500 mt-1">Manage reviews, listings, and your online reputation.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2">
                            <Send size={16} />
                            Send Review Request
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 border-b border-gray-200">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === tab.id
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

                {activeTab === 'Overview' && (
                    <div className="max-w-6xl mx-auto space-y-8">
                        {/* Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-gray-500 text-sm font-medium">Reviews Received</h3>
                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-3xl font-bold text-gray-900">128</p>
                                    <span className="flex items-center text-green-500 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
                                        <ArrowUp size={14} className="mr-1" /> 12%
                                    </span>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-gray-500 text-sm font-medium">Average Rating</h3>
                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-3xl font-bold text-gray-900">4.8</p>
                                    <div className="flex text-yellow-400">
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-gray-500 text-sm font-medium">Sentiment</h3>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-md text-sm font-medium">
                                        <ThumbsUp size={14} /> 95%
                                    </div>
                                    <div className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded-md text-sm font-medium">
                                        <ThumbsDown size={14} /> 5%
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-gray-500 text-sm font-medium">Invites Sent</h3>
                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-3xl font-bold text-gray-900">45</p>
                                    <span className="flex items-center text-red-500 text-sm font-medium bg-red-50 px-2 py-1 rounded-full">
                                        <ArrowDown size={14} className="mr-1" /> 3%
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Recent Reviews */}
                            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-gray-900">Recent Reviews</h2>
                                    <div className="flex gap-2">
                                        <button className="text-gray-400 hover:text-gray-600"><Search size={18} /></button>
                                        <button className="text-gray-400 hover:text-gray-600"><Filter size={18} /></button>
                                    </div>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {reviews.map((review) => (
                                        <div key={review.id} className="px-6 py-6 hover:bg-gray-50">
                                            <div className="flex items-start justify-between">
                                                <div className="flex gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                        {review.author[0]}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-gray-900">{review.author}</h4>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <div className="flex text-yellow-400">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-gray-300" : ""} />
                                                                ))}
                                                            </div>
                                                            <span className="text-xs text-gray-500">• {review.source}</span>
                                                            <span className="text-xs text-gray-500">• {review.date}</span>
                                                        </div>
                                                        <p className="text-sm text-gray-600 mt-2">{review.text}</p>
                                                    </div>
                                                </div>
                                                <button className="px-3 py-1.5 border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50">Reply</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Review Requests Trend / Invite List */}
                            <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-100">
                                    <h2 className="text-lg font-semibold text-gray-900">Latest Requests</h2>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="px-6 py-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                                    <MessageSquare size={14} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">Customer #{i}</p>
                                                    <p className="text-xs text-gray-500">Sent via Email</p>
                                                </div>
                                            </div>
                                            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">Sent</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Requests' && (
                    <div className="max-w-4xl mx-auto text-center mt-20">
                        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Send size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Review Requests</h2>
                        <p className="text-gray-500 mt-2">Send and track review requests to your customers via SMS and Email.</p>
                        <button className="mt-8 px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                            Send New Request
                        </button>
                    </div>
                )}

                {activeTab === 'Reviews' && (
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">All Reviews</h2>
                            <div className="flex gap-3">
                                <input type="text" placeholder="Search reviews..." className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">Filters</button>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
                            <div className="w-16 h-16 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star size={32} />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">Manage your reviews</h3>
                            <p className="text-gray-500 mt-2">Respond to customer feedback and build trust.</p>
                        </div>
                    </div>
                )}

                {activeTab === 'Listings' && (
                    <div className="max-w-4xl mx-auto text-center mt-20">
                        <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MapPin size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Online Listings</h2>
                        <p className="text-gray-500 mt-2">Sync your business profile across 70+ directories and boost your local SEO.</p>
                        <button className="mt-8 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                            Manage Listings
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReputationPage;
