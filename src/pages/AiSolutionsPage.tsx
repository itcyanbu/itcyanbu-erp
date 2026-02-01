import { useState } from 'react';
import { Video, HelpCircle, Box, FileText, Globe, Play, Users, Factory, ArrowLeft, ChevronLeft, ChevronRight, Settings, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AiSolutionsPage = () => {
    const { t } = useTranslation();
    const [currentView, setCurrentView] = useState('overview');
    const [cctvSubView, setCctvSubView] = useState('overview');
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [helpTab, setHelpTab] = useState('pdf');

    const solutions = [
        { id: 'getting-started', label: t('ai_solutions.getting_started'), icon: Play, color: 'text-purple-500', bg: 'bg-purple-50' },
        { id: 'cctv-ai', label: t('ai_solutions.cctv_ai'), icon: Video, color: 'text-blue-500', bg: 'bg-blue-50' },
        { id: 'industry-ai', label: t('ai_solutions.industry_ai'), icon: Factory, color: 'text-orange-500', bg: 'bg-orange-50' },
        { id: 'ai-employee-1', label: t('ai_solutions.ai_employee'), icon: Users, color: 'text-green-500', bg: 'bg-green-50' },
        { id: 'ai-employee-2', label: t('ai_solutions.ai_employee'), icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-50' },
        { id: 'help', label: t('ai_solutions.helps'), icon: HelpCircle, color: 'text-pink-500', bg: 'bg-pink-50' },
    ];

    const cctvImages = [
        { src: '/cctv/vision1.jpg', title: t('ai_solutions.vision_analysis') },
        { src: '/cctv/vision2.jpg', title: t('ai_solutions.real_time') },
    ];

    const handleBack = () => {
        if (currentView === 'cctv-ai' && cctvSubView !== 'overview') {
            setCctvSubView('overview');
        } else {
            setCurrentView('overview');
        }
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex + 1) % cctvImages.length);
        }
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex - 1 + cctvImages.length) % cctvImages.length);
        }
    };

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
                                    onClick={() => {
                                        setCurrentView(solution.id);
                                        if (solution.id === 'cctv-ai') setCctvSubView('overview');
                                    }}
                                    className="flex flex-col items-center justify-center p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-100 hover:-translate-y-1 transition-all duration-200 group h-full min-h-[200px]"
                                >
                                    <div className={`p-5 rounded-full mb-6 ${solution.bg} group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className={`w-10 h-10 ${solution.color}`} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-center">
                                        {solution.label}
                                    </h3>
                                </button>
                            );
                        })}
                    </div>
                );
            case 'cctv-ai':
                if (cctvSubView === 'overview') {
                    return (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto py-12 animate-in slide-in-from-bottom-4 duration-500">
                            {[
                                { id: 'services', label: t('ai_solutions.services'), icon: Settings, color: 'text-blue-600', bg: 'bg-blue-50' },
                                { id: 'case-study', label: t('ai_solutions.case_study'), icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' }
                            ].map((subView) => {
                                const Icon = subView.icon;
                                return (
                                    <button
                                        key={subView.id}
                                        onClick={() => setCctvSubView(subView.id)}
                                        className="flex flex-col items-center justify-center p-10 bg-white border border-gray-100 rounded-3xl shadow-lg hover:shadow-xl hover:border-blue-200 hover:-translate-y-2 transition-all duration-300 group"
                                    >
                                        <div className={`p-6 rounded-2xl mb-8 ${subView.bg} group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                                            <Icon className={`w-14 h-14 ${subView.color}`} />
                                        </div>
                                        <h3 className="text-2xl font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors">
                                            {subView.label}
                                        </h3>
                                        <div className="mt-4 w-12 h-1 bg-blue-100 rounded-full group-hover:w-24 group-hover:bg-blue-600 transition-all duration-300" />
                                    </button>
                                );
                            })}
                        </div>
                    );
                }

                if (cctvSubView === 'case-study') {
                    return (
                        <div className="space-y-8 animate-in fade-in duration-300">
                            {cctvImages.map((img, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{img.title}</h3>
                                    <div className="rounded-lg overflow-hidden bg-gray-100 cursor-zoom-in" onClick={() => setSelectedImageIndex(idx)}>
                                        <img
                                            src={img.src}
                                            alt={img.title}
                                            className="w-full h-auto object-contain hover:scale-[1.01] transition-transform duration-300"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                }

                return (
                    <div className="flex flex-col items-center justify-center p-12 text-center animate-in fade-in duration-300 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="bg-blue-50 p-6 rounded-full mb-6">
                            <Settings className="w-16 h-16 text-blue-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('ai_solutions.services')}</h2>
                        <p className="text-gray-500">Comprehensive AI CCTV implementation services and maintenance.</p>
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
                                {t('help_tab.pdf')}
                            </button>
                            <button
                                onClick={() => setHelpTab('resources')}
                                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${helpTab === 'resources' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <Globe size={14} />
                                {t('help_tab.resources')}
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
                return (
                    <div className="flex flex-col items-center justify-center p-12 text-center animate-in fade-in duration-300 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="bg-gray-50 p-6 rounded-full mb-6">
                            <Box className="w-16 h-16 text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('common.coming_soon')}</h2>
                        <p className="text-gray-500">The module is currently under development.</p>
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
                                onClick={handleBack}
                                className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 rtl:rotate-180"
                                title={t('common.back')}
                            >
                                <ArrowLeft size={20} />
                            </button>
                        )}
                        <h1 className="text-2xl font-bold text-gray-900">{t('ai_solutions.title')}</h1>
                    </div>
                    <p className="text-gray-500 mt-1">{t('ai_solutions.subtitle')}</p>
                </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[400px]">
                {renderContent()}
            </div>

            {/* Lightbox Modal with Slider Navigation */}
            {selectedImageIndex !== null && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedImageIndex(null)}
                >
                    <div className="relative max-w-7xl w-full max-h-screen flex items-center justify-center group/modal">
                        {/* Navigation Buttons */}
                        <button
                            onClick={prevImage}
                            className="absolute left-4 lg:left-8 z-[110] w-12 h-12 bg-slate-900/50 hover:bg-slate-900 text-green-500 rounded-full flex items-center justify-center transition-all border border-green-500/20 shadow-lg group-hover/modal:scale-110"
                            title="Previous Image"
                        >
                            <ChevronLeft size={32} />
                        </button>

                        <img
                            src={cctvImages[selectedImageIndex].src}
                            alt={cctvImages[selectedImageIndex].title}
                            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl animate-in zoom-in-95 duration-300"
                        />

                        <button
                            onClick={nextImage}
                            className="absolute right-4 lg:right-8 z-[110] w-12 h-12 bg-slate-900/50 hover:bg-slate-900 text-green-500 rounded-full flex items-center justify-center transition-all border border-green-500/20 shadow-lg group-hover/modal:scale-110"
                            title="Next Image"
                        >
                            <ChevronRight size={32} />
                        </button>

                        <button
                            className="absolute top-4 right-4 z-[110] text-white hover:text-gray-300 transition-colors bg-black/50 p-2 rounded-full"
                            onClick={() => setSelectedImageIndex(null)}
                        >
                            <span className="sr-only">Close</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
                        </button>

                        {/* Image Info */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border border-white/10">
                            {selectedImageIndex + 1} / {cctvImages.length} : {cctvImages[selectedImageIndex].title}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AiSolutionsPage;
