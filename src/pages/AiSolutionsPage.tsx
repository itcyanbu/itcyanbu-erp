import { useState, useEffect } from 'react';
import { Video, HelpCircle, Box, FileText, Globe, Play, Users, Factory, ArrowLeft, ChevronLeft, ChevronRight, Settings, BookOpen, Bot, Zap, Gauge, Target, MessageSquare, ShieldCheck, Maximize } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

const AiSolutionsPage = () => {
    const { t } = useTranslation();
    const [currentView, setCurrentView] = useState('overview');
    const [cctvSubView, setCctvSubView] = useState('overview');
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [helpTab, setHelpTab] = useState('pdf');

    const [settings, setSettings] = useState({
        conversationAi: {
            mode: 'OFF',
            guidedForm: {
                variedPhrasing: true,
                toneAdjustment: true,
                refocusing: true
            }
        }
    });

    useEffect(() => {
        const savedSettings = localStorage.getItem('ghl_business_settings');
        if (savedSettings) {
            try {
                const parsed = JSON.parse(savedSettings);
                if (parsed.conversationAi) {
                    setSettings(parsed);
                }
            } catch (e) {
                console.error('Failed to parse saved settings', e);
            }
        }
    }, []);

    const updateSetting = (path: string, value: any) => {
        setSettings(prev => {
            const newState = { ...prev };
            const keys = path.split('.');
            let current: any = newState;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;

            // Persist back to general settings
            const savedSettings = localStorage.getItem('ghl_business_settings');
            if (savedSettings) {
                try {
                    const fullSettings = JSON.parse(savedSettings);
                    fullSettings.conversationAi = newState.conversationAi;
                    localStorage.setItem('ghl_business_settings', JSON.stringify(fullSettings));
                } catch (e) {
                    console.error('Failed to update localStorage', e);
                }
            }

            return newState;
        });
    };

    const aiModes = [
        {
            id: 'OFF',
            title: 'OFF',
            description: 'AI feature is inactive. Training and trial remain active for testing.',
            icon: Bot,
            color: 'text-gray-400',
            bg: 'bg-gray-50'
        },
        {
            id: 'Suggestive',
            title: 'Suggestive',
            description: 'Bot responses appear in the composer for manual editing or sending.',
            icon: Zap,
            color: 'text-amber-500',
            bg: 'bg-amber-50'
        },
        {
            id: 'Auto-Pilot',
            title: 'Auto-Pilot',
            description: 'Bot automatically responds to contacts on behalf of the business.',
            icon: Gauge,
            color: 'text-ghl-blue',
            bg: 'bg-blue-50'
        }
    ];

    const qualityEnhancements = [
        {
            id: 'variedPhrasing',
            label: 'Varied Phrasing',
            description: 'Automatically varies question phrasing to avoid repetition.',
            icon: MessageSquare
        },
        {
            id: 'toneAdjustment',
            label: 'Tone Adjustment',
            description: 'Adjusts tone based on prior user inputs for natural flow.',
            icon: ShieldCheck
        },
        {
            id: 'refocusing',
            label: 'Guided Refocusing',
            description: 'Gently refocuses off-topic replies to keep progress.',
            icon: Target
        }
    ];

    const solutions = [
        { id: 'getting-started', label: t('ai_solutions.getting_started'), icon: Play, color: 'text-purple-500', bg: 'bg-purple-50' },
        { id: 'conversation-ai', label: 'Conversation AI', icon: Bot, color: 'text-blue-500', bg: 'bg-blue-50' },
        { id: 'cctv-ai', label: t('ai_solutions.cctv_ai'), icon: Video, color: 'text-blue-500', bg: 'bg-blue-50' },
        { id: 'industry-ai', label: t('ai_solutions.industry_ai'), icon: Factory, color: 'text-orange-500', bg: 'bg-orange-50' },
        { id: 'ai-employee-1', label: t('ai_solutions.ai_employee'), icon: Users, color: 'text-green-500', bg: 'bg-green-50' },
        { id: 'help', label: t('ai_solutions.helps'), icon: HelpCircle, color: 'text-pink-500', bg: 'bg-pink-50' },
    ];

    const cctvImages = [
        { src: '/cctv/vision1.jpg', title: t('ai_solutions.vision_analysis') },
        { src: '/cctv/vision2.jpg', title: t('ai_solutions.real_time') },
    ];

    const cctvVideos = [
        { src: '/cctv/airport_video_clean_no_audio.mp4', title: 'تحليل حركة المطارات' },
        { src: '/cctv/lane_detection_clean_no_audio.mp4', title: 'تتبع المسارات والازدحام' },
        { src: '/cctv/theft_detection_clean_no_audio.mp4', title: 'كشف السرقة والأنشطة المشبوهة' },
        { src: '/cctv/employees.mp4', title: 'مراقبة أداء الموظفين' },
        { src: '/cctv/waste_sorting.mp4', title: 'الفرز الآلي للنفايات' },
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
                        <div className="space-y-12 animate-in fade-in duration-300 max-w-6xl mx-auto pb-20">
                            {/* Videos Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {cctvVideos.map((video, idx) => (
                                    <div key={`video-${idx}`} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:border-blue-200 transition-all duration-300">
                                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                                            <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
                                            {video.title}
                                        </h3>
                                        <div className="rounded-xl overflow-hidden bg-slate-900 aspect-video relative shadow-inner border border-gray-100">
                                            <video
                                                src={video.src}
                                                controls
                                                className="w-full h-full object-contain"
                                                playsInline
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="bg-gray-50/50 px-4 text-sm font-semibold text-gray-500 uppercase tracking-widest">Vision Analysis Highlights</span>
                                </div>
                            </div>

                            {/* Images Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {cctvImages.map((img, idx) => (
                                    <div key={`img-${idx}`} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group hover:border-indigo-200 transition-all duration-300">
                                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                                            <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                                            {img.title}
                                        </h3>
                                        <div
                                            className="rounded-xl overflow-hidden bg-gray-50 cursor-zoom-in relative aspect-video border border-gray-100"
                                            onClick={() => setSelectedImageIndex(idx)}
                                        >
                                            <img
                                                src={img.src}
                                                alt={img.title}
                                                className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-slate-900/20 transition-all duration-300 flex items-center justify-center">
                                                <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                                    <Maximize className="text-indigo-600" size={24} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                }


                return (
                    <div className="animate-in fade-in duration-300 space-y-6" dir="rtl">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="bg-blue-50 p-3 rounded-xl">
                                <Settings className="w-7 h-7 text-blue-500" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">خدمات الذكاء الاصطناعي للمراقبة</h2>
                                <p className="text-sm text-gray-500">تحليل ذكي في الوقت الفعلي باستخدام رؤية الحاسوب</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                {
                                    icon: '👥',
                                    title: 'إحصاء الزبائن',
                                    desc: 'إحصاء دقيق للزبائن الداخلين والخارجين. يقوم نظام رؤية حاسوبية بإحصاء عدد الزبائن داخل المطعم في الوقت الفعلي وتتبع حركتهم.',
                                    color: 'bg-blue-50 border-blue-100',
                                    iconBg: 'bg-blue-100',
                                },
                                {
                                    icon: '⏱️',
                                    title: 'مراقبة الطوابير وأوقات الانتظار',
                                    desc: 'تحليل تلقائي لطول الطابور ووقت الانتظار لكل زبون، مع تنبيهات فورية في حالة الازدحام.',
                                    color: 'bg-amber-50 border-amber-100',
                                    iconBg: 'bg-amber-100',
                                },
                                {
                                    icon: '🧤',
                                    title: 'مراقبة معدات الوقاية الشخصية',
                                    desc: 'يكشف عن الأقنعة والقفازات وأغطية الرأس والمآزر ومؤشرات النظافة لدى طاقم المطبخ.',
                                    color: 'bg-green-50 border-green-100',
                                    iconBg: 'bg-green-100',
                                },
                                {
                                    icon: '🧾',
                                    title: 'مراقبة سلوك أمين الصندوق',
                                    desc: 'يكشف عن تناول الطعام والتدخين والجلوس واستخدام الهاتف والابتعاد عن منضدة أمين الصندوق.',
                                    color: 'bg-red-50 border-red-100',
                                    iconBg: 'bg-red-100',
                                },
                                {
                                    icon: '📊',
                                    title: 'تقدير عمر وجنس الموظف',
                                    desc: 'إحصائيات دقيقة في الوقت الفعلي مفيدة للتسويق وتحسين تجربة العملاء.',
                                    color: 'bg-purple-50 border-purple-100',
                                    iconBg: 'bg-purple-100',
                                },
                                {
                                    icon: '🪑',
                                    title: 'مراقبة الطاولات',
                                    desc: 'يحدد تلقائيًا حالة كل طاولة (تنظيف، شاغرة، محجوزة) وينبهك عند الحاجة إلى التنظيف.',
                                    color: 'bg-teal-50 border-teal-100',
                                    iconBg: 'bg-teal-100',
                                },
                                {
                                    icon: '🪪',
                                    title: 'التعرف على وجوه الموظفين',
                                    desc: 'نظام حضور ذكي بدون بصمات، يعتمد على كاميرات المطعم.',
                                    color: 'bg-indigo-50 border-indigo-100',
                                    iconBg: 'bg-indigo-100',
                                },
                                {
                                    icon: '🚨',
                                    title: 'تنبيهات ذكية للازدحام',
                                    desc: 'تنبيهات فورية وذكية عند اكتشاف الازدحام أو الطوابير الطويلة.',
                                    color: 'bg-orange-50 border-orange-100',
                                    iconBg: 'bg-orange-100',
                                },
                            ].map((service, idx) => (
                                <div
                                    key={idx}
                                    className={`flex items-start gap-4 p-5 rounded-2xl border ${service.color} hover:shadow-md transition-all duration-200 hover:-translate-y-0.5`}
                                >
                                    <div className={`text-2xl w-12 h-12 flex items-center justify-center rounded-xl ${service.iconBg} shrink-0`}>
                                        {service.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">{service.title}</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">{service.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Intro Banner */}
                        <div className="bg-gradient-to-l from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
                            <p className="text-lg font-bold mb-1">✅ تم التثبيت بنجاح حتى الآن.</p>
                            <p className="text-blue-100 font-semibold">أصبح الأمن أسهل! تتوفر العديد من أنظمة الحماية.</p>
                        </div>

                        {/* FAQ Cards */}
                        <div className="space-y-4">
                            {[
                                {
                                    icon: '🤖',
                                    q: 'ما هو itcyanbu ai؟',
                                    a: 'هو نظام مراقبة مدعوم بالذكاء الاصطناعي، يحلل بث الكاميرات المباشر في الوقت الفعلي لاكتشاف الأحداث المهمة، وإنشاء تنبيهات ذكية، وتوفير لوحات تحكم تساعدك على مراقبة موقعك واتخاذ قرارات أسرع وأفضل.',
                                    color: 'border-blue-200 bg-blue-50/60',
                                },
                                {
                                    icon: '⚡',
                                    q: 'كيف يختلف عن أنظمة المراقبة التقليدية؟',
                                    a: 'مع الأنظمة التقليدية، يجب على شخص ما مراقبة الشاشات باستمرار ومراجعة التسجيلات يدويًا. يستخدم itcyanbu ai الذكاء الاصطناعي للمراقبة التلقائية على مدار الساعة، وتصفية الأنشطة العادية، واكتشاف الأحداث غير المعتادة، وتحويل ساعات من الفيديو إلى تنبيهات ورؤى واضحة.',
                                    color: 'border-amber-200 bg-amber-50/60',
                                },
                                {
                                    icon: '📷',
                                    q: 'هل أحتاج إلى استبدال كاميراتي الحالية؟',
                                    a: 'في معظم الحالات، لا. itcyanbu ai مصمم للعمل مع معظم أنظمة الكاميرات الحديثة القائمة على بروتوكول الإنترنت. نقوم ببساطة بالاتصال ببنيتك التحتية الحالية ونساعدك على تحقيق أقصى استفادة من الكاميرات الموجودة لديك.',
                                    color: 'border-green-200 bg-green-50/60',
                                },
                                {
                                    icon: '🎯',
                                    q: 'ما الأنشطة التي يمكن للنظام رصدها؟',
                                    a: 'مع itcyanbu ai يمكن ضبط النظام لرصد حالات مثل: التواجد في المناطق المحظورة، والتجمعات غير المعتادة، والتنقل خلال ساعات غير مصرح بها، والتسكع في المناطق الحساسة، وغيرها من الأنماط التي قد تؤثر على السلامة والأمن والعمليات — وذلك حسب احتياجات موقعك.',
                                    color: 'border-purple-200 bg-purple-50/60',
                                },
                                {
                                    icon: '🔒',
                                    q: 'كيف يتعامل النظام مع الخصوصية والأمن؟',
                                    a: 'نولي أهمية قصوى للخصوصية والأمن. تُدار بثوث الفيديو والبيانات ذات الصلة وفقًا لضوابط صارمة للتحكم في الوصول والتسجيل وممارسات أمنية دقيقة، مما يضمن وصول المستخدمين المصرح لهم فقط إلى المعلومات، وأن النظام يلبي متطلبات البيئات المهنية.',
                                    color: 'border-indigo-200 bg-indigo-50/60',
                                },
                            ].map((faq, idx) => (
                                <div key={idx} className={`p-5 rounded-2xl border-2 ${faq.color}`}>
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl shrink-0">{faq.icon}</span>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-2">{faq.q}</h4>
                                            <p className="text-sm text-gray-700 leading-relaxed">{faq.a}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'industry-ai':
                return (
                    <div className="flex flex-col items-center justify-center p-12 text-center animate-in fade-in duration-300 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="bg-orange-50 p-6 rounded-full mb-6">
                            <Factory className="w-16 h-16 text-orange-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('ai_solutions.industry_ai')}</h2>
                        <p className="text-gray-500 max-w-md mb-6">{t('ai_solutions.industry_ai_desc')}</p>

                        <div className="flex flex-col gap-4 w-full max-w-md">

                            <button
                                onClick={() => window.open('https://solution-spark-x.lovable.app', '_blank')}
                                className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                            >
                                {t('ai_solutions.launch_solution_spark')}
                            </button>
                            <button
                                onClick={() => window.open('https://arabish-bright.lovable.app', '_blank')}
                                className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                            >
                                {t('ai_solutions.launch_industry_automation')}
                            </button>
                            <button
                                onClick={() => window.open('https://wonder-sphere-hub.lovable.app', '_blank')}
                                className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                            >
                                {t('ai_solutions.launch_wonder_sphere')}
                            </button>

                            <a
                                href="/docs/itcyanbu-IIoT-Communication-Platform.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-orange-50 border-2 border-orange-200 text-orange-700 font-semibold rounded-xl hover:bg-orange-100 hover:border-orange-400 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 group"
                            >
                                <FileText size={18} className="group-hover:scale-110 transition-transform" />
                                itcyanbu – IIoT Communication Platform
                            </a>
                        </div>
                    </div>
                );
            case 'conversation-ai':
                const aiSettings = settings.conversationAi;
                return (
                    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
                        {/* AI Modes Selection */}
                        <section className="space-y-4">
                            <h3 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
                                <Bot size={24} className="text-blue-500" />
                                Conversation AI Modes
                            </h3>
                            <p className="text-sm text-gray-500">Choose how the AI bot interacts with your contacts</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                                {aiModes.map((mode) => {
                                    const Icon = mode.icon;
                                    const isActive = aiSettings.mode === mode.id;

                                    return (
                                        <button
                                            key={mode.id}
                                            onClick={() => updateSetting('conversationAi.mode', mode.id)}
                                            className={clsx(
                                                "flex flex-col p-6 border-[3px] rounded-3xl text-left transition-all duration-300 group relative overflow-hidden h-full shadow-sm hover:translate-y-[-4px]",
                                                isActive
                                                    ? "border-blue-500 bg-blue-50/50 ring-8 ring-blue-50/50"
                                                    : "border-white bg-white hover:border-blue-100 hover:shadow-lg"
                                            )}
                                        >
                                            <div className={clsx(
                                                "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:rotate-6 shadow-sm",
                                                mode.bg, mode.color
                                            )}>
                                                <Icon size={28} />
                                            </div>
                                            <h4 className={clsx("text-lg font-black mb-2 tracking-tight", isActive ? "text-blue-600" : "text-gray-900")}>
                                                {mode.title}
                                            </h4>
                                            <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                                {mode.description}
                                            </p>

                                            {isActive && (
                                                <div className="absolute top-4 right-4">
                                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in-50">
                                                        <div className="w-2.5 h-2.5 bg-white rounded-full" />
                                                    </div>
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        <div className="h-px bg-gray-200" />

                        {/* Guided Form Enhancements */}
                        <section className={clsx("space-y-8 transition-all duration-500", aiSettings.mode === 'OFF' && "opacity-40 grayscale pointer-events-none")}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-extrabold text-gray-900 mb-1">Guided Form: Conversational Quality</h3>
                                    <p className="text-sm text-gray-500 font-medium">Enhance bot interactions for a more natural and productive flow</p>
                                </div>
                                {aiSettings.mode === 'OFF' && (
                                    <span className="text-xs font-black uppercase tracking-widest bg-gray-100 text-gray-500 px-3 py-1.5 rounded-full border border-gray-200">
                                        Disabled in OFF mode
                                    </span>
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {qualityEnhancements.map((item) => {
                                    const Icon = item.icon;
                                    const isEnabled = (aiSettings.guidedForm as any)[item.id];

                                    return (
                                        <div
                                            key={item.id}
                                            className={clsx(
                                                "flex items-center justify-between p-6 bg-white border border-gray-100 rounded-3xl transition-all duration-300 shadow-sm hover:shadow-md",
                                                isEnabled ? "border-blue-100 bg-blue-50/10" : "hover:border-blue-100"
                                            )}
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className={clsx(
                                                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shadow-inner",
                                                    isEnabled ? "bg-blue-100 text-blue-600" : "bg-gray-50 text-gray-400"
                                                )}>
                                                    <Icon size={24} />
                                                </div>
                                                <div>
                                                    <h4 className="text-base font-extrabold text-gray-900 tracking-tight">{item.label}</h4>
                                                    <p className="text-sm text-gray-500 font-medium">{item.description}</p>
                                                </div>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={isEnabled}
                                                    onChange={(e) => updateSetting(`conversationAi.guidedForm.${item.id}`, e.target.checked)}
                                                />
                                                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all duration-300 peer-checked:bg-blue-600 shadow-inner"></div>
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {aiSettings.mode !== 'OFF' && (
                            <div className="bg-blue-600 p-8 rounded-[2.5rem] shadow-2xl shadow-blue-200 flex flex-col md:flex-row gap-6 items-center text-center md:text-left transition-all duration-500 animate-in slide-in-from-bottom-8">
                                <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl text-white shadow-xl">
                                    <Bot size={40} className="animate-pulse" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-white mb-2 tracking-tight">AI Bot Training in Progress</h4>
                                    <p className="text-blue-50 leading-relaxed font-medium">
                                        The bot is currently learning from your business profile and website content.
                                        You can test the bot's responses in the <strong>Bot Trial</strong> section once training is complete.
                                    </p>
                                </div>
                                <button className="md:ml-auto px-6 py-3 bg-white text-blue-600 font-black rounded-xl hover:bg-blue-50 transition-all text-sm uppercase tracking-widest shadow-lg">
                                    Start Trial
                                </button>
                            </div>
                        )}
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
                                                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">{t('help_tab.pdf')} Document</p>
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
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t('ai_solutions.resource_library')}</h3>
                                    <p className="text-gray-500">{t('ai_solutions.resource_library_desc')}</p>
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
                        <p className="text-gray-500">{t('ai_solutions.coming_soon_desc')}</p>
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
