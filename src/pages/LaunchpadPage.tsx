import { useState } from 'react';
import {
    Rocket,
    Smartphone,
    Globe,
    Facebook,
    CreditCard,
    Upload,
    Users,
    Play,
    CheckCircle2,
    Circle,
    ChevronRight,
    Send
} from 'lucide-react';

interface TaskItemProps {
    title: string;
    description: string;
    icon: any;
    isCompleted: boolean;
    onToggle: () => void;
    ctaLabel: string;
    onCtaClick: () => void;
    onWatchTutorial: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
    title,
    description,
    icon: Icon,
    isCompleted,
    onToggle,
    ctaLabel,
    onCtaClick,
    onWatchTutorial
}) => (
    <div className={`bg-white rounded-xl border transition-all duration-300 ${isCompleted ? 'border-green-100 bg-green-50/10' : 'border-gray-200 hover:border-ghl-blue hover:shadow-md'}`}>
        <div className="p-5 flex flex-col md:flex-row md:items-center gap-6">
            {/* Status & Icon */}
            <div className="flex items-center gap-4 min-w-[240px]">
                <button onClick={onToggle} className="shrink-0 outline-none">
                    {isCompleted ? (
                        <CheckCircle2 className="text-green-500" size={24} />
                    ) : (
                        <Circle className="text-gray-300 hover:text-ghl-blue transition-colors" size={24} />
                    )}
                </button>
                <div className={`p-3 rounded-lg ${isCompleted ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-ghl-blue'}`}>
                    <Icon size={24} />
                </div>
                <div className="flex flex-col">
                    <h3 className={`font-semibold text-lg ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-900'}`}>{title}</h3>
                </div>
            </div>

            {/* Description */}
            <div className="flex-1">
                <p className={`text-sm ${isCompleted ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 shrink-0">
                <button
                    onClick={onWatchTutorial}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                >
                    <Play size={14} fill="currentColor" />
                    Watch Tutorial
                </button>
                <button
                    onClick={onCtaClick}
                    disabled={isCompleted}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${isCompleted
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-ghl-blue text-white hover:bg-blue-600 shadow-sm'
                        }`}
                >
                    {ctaLabel}
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    </div>
);

const LaunchpadPage = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Brand Identity & Logo', description: 'Upload your agency logo to personalize your client dashboard and emails.', icon: Upload, ctaLabel: 'Upload Logo', completed: false },
        { id: 2, title: 'Mobile App Accessibility', description: 'Download our white-label app to manage leads and respond on the go via push notifications.', icon: Smartphone, ctaLabel: 'Send Link', completed: false },
        { id: 3, title: 'Stripe Payment Integration', description: 'Connect your Stripe account to collect payments, automate billing, and manage invoices.', icon: CreditCard, ctaLabel: 'Connect Stripe', completed: false },
        { id: 4, title: 'Google My Business', description: 'Integrate your GMB account to manage reviews, messaging, and local SEO from one place.', icon: Globe, ctaLabel: 'Connect Google', completed: false },
        { id: 5, title: 'Facebook Social Integration', description: 'Connect Facebook to sync lead forms, manage ads, and automate social media responses.', icon: Facebook, ctaLabel: 'Connect Facebook', completed: false },
        { id: 6, title: 'Import & Engage Contacts', description: 'Upload your existing contact list and start an automated initial outreach campaign.', icon: Users, ctaLabel: 'Import Now', completed: false },
        { id: 7, title: 'Add Your First Team Member', description: 'Invite team members and assign permissions to help manage your growing agency.', icon: Users, ctaLabel: 'Invite User', completed: false },
    ]);

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const toggleTask = (id: number) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const completedCount = tasks.filter(t => t.completed).length;
    const progressPercentage = Math.round((completedCount / tasks.length) * 100);

    const handleCta = (task: any) => {
        if (task.id === 2) {
            triggerToast('Download link sent to your registered phone number!');
        } else {
            triggerToast(`${task.title} setup initiated...`);
        }
    };

    const triggerToast = (msg: string) => {
        setToastMessage(msg);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 relative">
            {/* Page Header */}
            <div className="px-8 py-8 bg-white border-b border-gray-200">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-blue-600 rounded-lg text-white">
                                    <Rocket size={24} />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900">Agency Onboarding Checklist</h1>
                            </div>
                            <p className="text-gray-500">Complete these critical steps to fully launch your agency platform and start scaling.</p>
                        </div>

                        {/* Progress Tracker */}
                        <div className="flex flex-col items-end gap-2 shrink-0">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-bold text-gray-700">{completedCount} of {tasks.length} Tasks Complete</span>
                                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{progressPercentage}%</span>
                            </div>
                            <div className="w-64 h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                                <div
                                    className="h-full bg-blue-600 transition-all duration-500 ease-out"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Task List Section */}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-5xl mx-auto space-y-4 pb-12">
                    {tasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            title={task.title}
                            description={task.description}
                            icon={task.icon}
                            isCompleted={task.completed}
                            onToggle={() => toggleTask(task.id)}
                            ctaLabel={task.ctaLabel}
                            onCtaClick={() => handleCta(task)}
                            onWatchTutorial={() => triggerToast("Opening tutorial video player...")}
                        />
                    ))}
                </div>
            </div>

            {/* Custom Toast Notification */}
            {showToast && (
                <div className="absolute bottom-8 right-8 flex items-center gap-3 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 z-50">
                    <div className="p-1 bg-blue-500 rounded-full">
                        <Send size={14} className="text-white" />
                    </div>
                    <span className="font-medium">{toastMessage}</span>
                </div>
            )}
        </div>
    );
};

export default LaunchpadPage;

