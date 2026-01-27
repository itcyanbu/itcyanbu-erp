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
    Send,
    ShieldCheck,
    X,
    Lock
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

interface PermissionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
}

const PermissionsModal: React.FC<PermissionsModalProps> = ({ isOpen, onClose, onSave }) => {
    const [roles, setRoles] = useState([
        { id: 'admin', name: 'Agency Admin', access: 'Full' },
        { id: 'acc_admin', name: 'Account Admin', access: 'Edit' },
        { id: 'staff', name: 'Standard Staff', access: 'View' },
        { id: 'sales', name: 'Sales Representative', access: 'No Access' },
    ]);

    if (!isOpen) return null;

    const accessLevels = ['Full', 'Edit', 'View', 'No Access'];

    const updateRole = (roleId: string, level: string) => {
        setRoles(prev => prev.map(r => r.id === roleId ? { ...r, access: level } : r));
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-ghl-blue/10 text-ghl-blue rounded-lg">
                            <ShieldCheck size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Manage Dashboard Permissions</h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                <div className="p-6">
                    <p className="text-sm text-gray-500 mb-6 font-medium">
                        Control team access to sensitive financial metrics and custom dashboard views.
                    </p>

                    <div className="space-y-4">
                        {roles.map((role) => (
                            <div key={role.id} className="p-4 rounded-xl border border-gray-100 bg-white hover:border-blue-100 transition-colors">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-gray-50 rounded-lg">
                                            <Users size={18} className="text-gray-600" />
                                        </div>
                                        <span className="font-semibold text-gray-900">{role.name}</span>
                                    </div>
                                    <div className="flex bg-gray-100 p-1 rounded-lg">
                                        {accessLevels.map((level) => (
                                            <button
                                                key={level}
                                                onClick={() => updateRole(role.id, level)}
                                                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${role.access === level
                                                    ? 'bg-white text-ghl-blue shadow-sm'
                                                    : 'text-gray-500 hover:text-gray-700'
                                                    }`}
                                            >
                                                {level}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3">
                        <Lock size={18} className="text-blue-600 shrink-0" />
                        <p className="text-xs text-blue-800 leading-relaxed font-medium">
                            Setting a role to <span className="font-bold">"No Access"</span> will hide all revenue-related widgets and private dashboards from users with that role.
                        </p>
                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-gray-800">
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        className="px-6 py-2 text-sm font-bold bg-ghl-blue text-white rounded-lg hover:bg-blue-600 shadow-md shadow-blue-500/20 active:scale-95 transition-all"
                    >
                        Save Permissions
                    </button>
                </div>
            </div>
        </div>
    );
};

const LaunchpadPage = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Brand Identity & Logo', description: 'Upload your agency logo to personalize your client dashboard and emails.', icon: Upload, ctaLabel: 'Upload Logo', completed: false },
        { id: 2, title: 'Mobile App Accessibility', description: 'Download our white-label app to manage leads and respond on the go via push notifications.', icon: Smartphone, ctaLabel: 'Send Link', completed: false },
        { id: 3, title: 'Stripe Payment Integration', description: 'Connect your Stripe account to collect payments, automate billing, and manage invoices.', icon: CreditCard, ctaLabel: 'Connect Stripe', completed: false },
        { id: 4, title: 'Google My Business', description: 'Integrate your GMB account to manage reviews, messaging, and local SEO from one place.', icon: Globe, ctaLabel: 'Connect Google', completed: false },
        { id: 5, title: 'Facebook Social Integration', description: 'Connect Facebook to sync lead forms, manage ads, and automate social media responses.', icon: Facebook, ctaLabel: 'Connect Facebook', completed: false },
        { id: 8, title: 'Secure Your Data: Dashboard Permissions', description: 'Control who can see sensitive revenue stats. Create custom dashboard views and restrict access for team members.', icon: ShieldCheck, ctaLabel: 'Manage Permissions', completed: false },
        { id: 6, title: 'Import & Engage Contacts', description: 'Upload your existing contact list and start an automated initial outreach campaign.', icon: Users, ctaLabel: 'Import Now', completed: false },
        { id: 7, title: 'Add Your First Team Member', description: 'Invite team members and assign permissions to help manage your growing agency.', icon: Users, ctaLabel: 'Invite User', completed: false },
    ]);

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [showPermissionsModal, setShowPermissionsModal] = useState(false);

    const toggleTask = (id: number) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const completedCount = tasks.filter(t => t.completed).length;
    const progressPercentage = Math.round((completedCount / tasks.length) * 100);

    const handleCta = (task: any) => {
        if (task.id === 2) {
            triggerToast('Download link sent to your registered phone number!');
        } else if (task.id === 8) {
            setShowPermissionsModal(true);
        } else {
            triggerToast(`${task.title} setup initiated...`);
        }
    };

    const handleSavePermissions = () => {
        setShowPermissionsModal(false);
        toggleTask(8);
        triggerToast('Dashboard permissions updated successfully!');
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

            {/* Permissions Modal */}
            <PermissionsModal
                isOpen={showPermissionsModal}
                onClose={() => setShowPermissionsModal(false)}
                onSave={handleSavePermissions}
            />

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
