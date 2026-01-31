import { useState } from 'react';
import { Video, HelpCircle, Box, FileText, Globe, Play, Users, Factory, ArrowLeft } from 'lucide-react';

const AiSolutionsPage = () => {
    const [currentView, setCurrentView] = useState('overview');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [helpTab, setHelpTab] = useState('pdf');

    const solutions = [
        { id: 'getting-started', label: 'Getting started with AI', icon: Play, color: 'text-purple-500', bg: 'bg-purple-50' },
        { id: 'cctv-ai', label: 'CCTV Ai', icon: Video, color: 'text-blue-500', bg: 'bg-blue-50' },
        { id: 'industry-ai', label: 'industry ai', icon: Factory, color: 'text-orange-500', bg: 'bg-orange-50' },
        { id: 'ai-employee-1', label: 'AI Employee', icon: Users, color: 'text-green-500', bg: 'bg-green-50' },
        { id: 'ai-employee-2', label: 'AI Employee', icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-50' },
        { id: 'help', label: 'helps', icon: HelpCircle, color: 'text-pink-500', bg: 'bg-pink-50' },
    ];

    const renderContent = () => {
        switch (currentView) {
            case 'overview':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
                        {solutions.map((solution, idx) => {
                            const Icon = solution.icon;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentView(solution.id)}
                                    className="flex flex-col items-center justify-center p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-100 hover:-translate-y-1 transition-all duration-200 group h-full min-h-[200px]"
                                >
                                    <div className={`p-5 rounded-full mb-6 ${solution.bg} group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className={`w-10 h-10 ${solution.color}`} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {solution.label}
                                    </h3>
                                </button>
                            );
                        })}
                    </div>
                );
            case 'cctv-ai':
                return (
                    <div className="space-y-8 animate-in fade-in duration-300">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">CCTV AI Vision Analysis</h3>
                            <div className="rounded-lg overflow-hidden bg-gray-100 cursor-zoom-in" onClick={() => setSelectedImage('/cctv/vision1.jpg')}>
                                <img
                                    src="/cctv/vision1.jpg"
                                    alt="CCTV AI Vision 1"
                                    className="w-full h-auto object-contain hover:scale-[1.01] transition-transform duration-300"
                                />
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Real-time Monitoring</h3>
                            <div className="rounded-lg overflow-hidden bg-gray-100 cursor-zoom-in" onClick={() => setSelectedImage('/cctv/vision2.jpg')}>
                                <img
                                    src="/cctv/vision2.jpg"
                                    alt="CCTV AI Vision 2"
                                    className="w-full h-auto object-contain hover:scale-[1.01] transition-transform duration-300"
                                />
                            </div>
                        </div>
                    </div>
                );
            case 'industry-ai':
                return (
                    <div className="flex flex-col items-center justify-center p-12 text-center animate-in fade-in duration-300 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="bg-orange-50 p-6 rounded-full mb-6">
                            <Factory className="w-16 h-16 text-orange-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Industry AI</h2>
                        <p className="text-gray-500 max-w-md mb-6">Advanced industrial automation and AI solutions.</p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => window.open('https://solution-spark-x.lovable.app', '_blank')}
                                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-sm hover:shadow"
                            >
                                Launch 3D Vision Platform
                            </button>
                            <button
                                onClick={() => window.open('https://arabish-bright.lovable.app', '_blank')}
                                className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition shadow-sm hover:shadow"
                            >
                                Launch Industry Automation
                            </button>
                        </div>
                    </div>
                );
            case 'help':
                return (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
                            <button
                                onClick={() => setHelpTab('pdf')}
                                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${helpTab === 'pdf' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <FileText size={14} />
                                PDF Files
                            </button>
                            <button
                                onClick={() => setHelpTab('resources')}
                                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${helpTab === 'resources' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <Globe size={14} />
                                Resources
                            </button>
                        </div>

                        <div className="min-h-[200px]">
                            {helpTab === 'pdf' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-300">
                                    {[
                                        "Bulk Actions For Contacts & SmartLists.pdf",
                                        "Bulk Add Contact Tags.pdf",
                                        "Create New Contact.pdf",
                                        "Create and Launch High-Converting Webinar Funnels in .pdf",
                                        "Email Best Practices & Email Warm Up.pdf",
                                        "Email Services Configuration.pdf",
                                        "webinars Setup & Tips.pdf"
                                    ].map((file, idx) => (
                                        <a
                                            key={idx}
                                            href={`/docs/${file}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-ghl-blue hover:shadow-md transition-all group"
                                        >
                                            <div className="p-3 bg-red-50 text-red-500 rounded-lg group-hover:bg-red-500 group-hover:text-white transition-colors">
                                                <FileText size={24} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-gray-900 truncate" title={file}>
                                                    {file.replace('.pdf', '')}
                                                </p>
                                                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">PDF Document</p>
                                            </div>
                                            <div className="p-2 text-gray-400 group-hover:text-ghl-blue">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            )}

                            {helpTab === 'resources' && (
                                <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-gray-200 rounded-xl bg-white animate-in slide-in-from-top-2 duration-300">
                                    <div className="bg-emerald-50 p-6 rounded-full mb-6">
                                        <Globe className="w-12 h-12 text-emerald-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Resource Library</h3>
                                    <p className="text-gray-500">Additional tools and links will appear here.</p>
                                </div>
                            )}
                        </div>
                    </div>
                );
            default:
                // Placeholder for 'getting-started' and 'ai-employee'
                return (
                    <div className="flex flex-col items-center justify-center p-12 text-center animate-in fade-in duration-300 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="bg-gray-50 p-6 rounded-full mb-6">
                            <Box className="w-16 h-16 text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
                        <p className="text-gray-500">The {solutions.find(s => s.id === currentView)?.label || 'Requested'} module is currently under development.</p>
                    </div>
                );
        }
    };

    return (
        <div className="p-8 h-full overflow-y-auto relative bg-gray-50/50">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        {currentView !== 'overview' && (
                            <button
                                onClick={() => setCurrentView('overview')}
                                className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
                                title="Back to Solutions"
                            >
                                <ArrowLeft size={20} />
                            </button>
                        )}
                        <h1 className="text-2xl font-bold text-gray-900">AI Solutions</h1>
                    </div>
                    <p className="text-gray-500 mt-1">Manage your AI-powered surveillance and vision systems</p>
                </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[400px]">
                {renderContent()}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-7xl w-full max-h-screen flex items-center justify-center">
                        <img
                            src={selectedImage}
                            alt="CCTV Full View"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                        />
                        <button
                            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors bg-black/50 p-2 rounded-full"
                            onClick={() => setSelectedImage(null)}
                        >
                            <span className="sr-only">Close</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AiSolutionsPage;
