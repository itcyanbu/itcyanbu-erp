import { useState } from 'react';
import {
    X,
    User,
    Shield,
    Lock,
    Phone,
    Clock,
    Video,
    CheckCircle2
} from 'lucide-react';
import clsx from 'clsx';

interface StaffModalProps {
    isOpen: boolean;
    onClose: () => void;
    member?: any;
}

const StaffModal = ({ isOpen, onClose, member }: StaffModalProps) => {
    const [activeTab, setActiveTab] = useState('User Info');

    if (!isOpen) return null;

    const tabs = [
        { id: 'User Info', icon: User },
        { id: 'User Permissions', icon: Shield },
        { id: 'User Roles', icon: Lock },
        { id: 'Call & Voicemail', icon: Phone },
        { id: 'User Availability', icon: Clock }
    ];

    const permissions = [
        { id: 'crm', label: 'CRM / Contacts', desc: 'Access to contact management and lists' },
        { id: 'calendars', label: 'Calendars', desc: 'Access to scheduling and appointments' },
        { id: 'opportunities', label: 'Opportunities', desc: 'Access to pipelines and deal tracking' },
        { id: 'payments', label: 'Payments', desc: 'Access to invoices and transactions' },
        { id: 'marketing', label: 'Marketing', desc: 'Access to social planner and email marketing' },
        { id: 'automation', label: 'Automation', desc: 'Access to workflows and triggers' },
        { id: 'sites', label: 'Sites', desc: 'Access to funnels, websites, and forms' }
    ];

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4">
                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between shrink-0">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900">
                            {member ? 'Edit Employee' : 'Add New Employee'}
                        </h2>
                        <p className="text-gray-500 text-sm">Configure user access and profile details.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 flex overflow-hidden">
                    {/* Left Tabs Sidebar */}
                    <div className="w-64 border-r border-gray-100 bg-gray-50/50 flex flex-col shrink-0">
                        <div className="p-4 space-y-2">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={clsx(
                                            "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all",
                                            isActive
                                                ? "bg-ghl-blue text-white shadow-lg shadow-blue-100"
                                                : "text-gray-500 hover:bg-white hover:text-gray-900"
                                        )}
                                    >
                                        <Icon size={16} />
                                        {tab.id}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                        {activeTab === 'User Info' && (
                            <div className="space-y-8">
                                <section>
                                    <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                                        <User size={16} />
                                        Personal Information
                                    </h3>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-700 ml-1">First Name</label>
                                            <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-100 focus:border-ghl-blue outline-none transition-all font-medium" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-700 ml-1">Last Name</label>
                                            <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-100 focus:border-ghl-blue outline-none transition-all font-medium" />
                                        </div>
                                        <div className="col-span-full space-y-2">
                                            <label className="text-xs font-bold text-gray-700 ml-1">Email Address</label>
                                            <input type="email" className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-100 focus:border-ghl-blue outline-none transition-all font-medium" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-700 ml-1">Phone Number</label>
                                            <input type="tel" className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-100 focus:border-ghl-blue outline-none transition-all font-medium" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-700 ml-1">Password</label>
                                            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-100 focus:border-ghl-blue outline-none transition-all font-medium" />
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )}

                        {activeTab === 'User Permissions' && (
                            <div className="space-y-6">
                                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                                    <Shield size={16} />
                                    Module Access
                                </h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {permissions.map((perm) => (
                                        <div key={perm.id} className="flex items-center justify-between p-4 bg-gray-50/50 border border-gray-100 rounded-2xl hover:border-blue-100 hover:bg-blue-50/20 transition-all">
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-900">{perm.label}</h4>
                                                <p className="text-xs text-gray-500">{perm.desc}</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" defaultChecked={true} />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ghl-blue"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'User Roles' && (
                            <div className="space-y-8">
                                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                                    <Lock size={16} />
                                    Access Role
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="flex flex-col items-center gap-4 p-8 border-2 border-ghl-blue bg-blue-50/50 rounded-3xl transition-all">
                                        <div className="w-12 h-12 bg-ghl-blue text-white rounded-full flex items-center justify-center">
                                            <Shield size={24} />
                                        </div>
                                        <div className="text-center">
                                            <div className="font-bold text-ghl-blue">Admin</div>
                                            <div className="text-[10px] text-gray-500 mt-1">Full access to sub-account settings</div>
                                        </div>
                                        <CheckCircle2 size={20} className="text-ghl-blue" />
                                    </button>
                                    <button className="flex flex-col items-center gap-4 p-8 border-2 border-gray-100 hover:border-gray-200 bg-white rounded-3xl transition-all">
                                        <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center">
                                            <User size={24} />
                                        </div>
                                        <div className="text-center">
                                            <div className="font-bold text-gray-700">User</div>
                                            <div className="text-[10px] text-gray-500 mt-1">Limited access to specific modules</div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Call & Voicemail' && (
                            <div className="space-y-8">
                                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                                    <Phone size={16} />
                                    Phone Settings
                                </h3>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-700 ml-1">Assigned Number</label>
                                        <select className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white outline-none font-medium">
                                            <option>No number assigned</option>
                                            <option>+966 54 545 0613 (Primary)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-700 ml-1">Voicemail Recording</label>
                                        <div className="border-2 border-dashed border-gray-100 rounded-3xl p-10 flex flex-col items-center justify-center text-center hover:border-ghl-blue transition-colors cursor-pointer group">
                                            <div className="w-12 h-12 bg-gray-50 group-hover:bg-blue-50 text-gray-400 group-hover:text-ghl-blue rounded-full flex items-center justify-center mb-3 transition-colors">
                                                <Video size={24} />
                                            </div>
                                            <p className="text-sm font-bold text-gray-700">Click to upload or record</p>
                                            <p className="text-xs text-gray-400 mt-1">MP3, WAV files supported</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-6 border-t border-gray-100 flex items-center justify-between shrink-0 bg-gray-50/30">
                    <div className="flex items-center gap-2">
                        {member && (
                            <button className="px-6 py-2.5 text-rose-600 font-bold hover:bg-rose-50 rounded-xl transition-all">
                                Delete Member
                            </button>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-all"
                        >
                            Cancel
                        </button>
                        <button className="px-10 py-2.5 bg-ghl-blue text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffModal;
