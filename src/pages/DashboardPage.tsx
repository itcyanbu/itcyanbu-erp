import { useState } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Activity, ShieldCheck, X, Lock, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PermissionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
}

const PermissionsModal: React.FC<PermissionsModalProps> = ({ isOpen, onClose, onSave }) => {
    const { t } = useTranslation();
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
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-left rtl:text-right">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-ghl-blue/10 text-ghl-blue rounded-lg">
                            <ShieldCheck size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">{t('dashboard.permissions_title')}</h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                <div className="p-6">
                    <p className="text-sm text-gray-500 mb-6 font-medium">
                        {t('dashboard.permissions_subtitle')}
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

                    <div className="mt-8 bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3 rtl:flex-row-reverse">
                        <Lock size={18} className="text-blue-600 shrink-0" />
                        <p className="text-xs text-blue-800 leading-relaxed font-medium">
                            {t('dashboard.no_access_warning', 'Setting a role to "No Access" will hide all revenue-related widgets and private dashboards from users with that role.')}
                        </p>
                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 rtl:flex-row-reverse">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-gray-800">
                        {t('common.cancel')}
                    </button>
                    <button
                        onClick={onSave}
                        className="px-6 py-2 text-sm font-bold bg-ghl-blue text-white rounded-lg hover:bg-blue-600 shadow-md shadow-blue-500/20 active:scale-95 transition-all"
                    >
                        {t('common.save')}
                    </button>
                </div>
            </div>
        </div>
    );
};

const DashboardPage = () => {
    const { t } = useTranslation();
    const [showPermissionsModal, setShowPermissionsModal] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    const handleSavePermissions = () => {
        setShowPermissionsModal(false);
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 relative">
            <div className="px-8 py-6 bg-white border-b border-gray-200">
                <div className="flex items-center justify-between rtl:flex-row-reverse">
                    <div className="text-left rtl:text-right">
                        <div className="flex items-center gap-3 mb-2 rtl:flex-row-reverse">
                            <BarChart3 className="text-ghl-blue" size={28} />
                            <h1 className="text-2xl font-semibold text-gray-900">{t('dashboard.title')}</h1>
                        </div>
                        <p className="text-gray-500">{t('dashboard.subtitle')}</p>
                    </div>
                    <button
                        onClick={() => setShowPermissionsModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 hover:border-ghl-blue text-gray-700 hover:text-ghl-blue rounded-lg font-semibold transition-all shadow-sm hover:shadow-md rtl:flex-row-reverse"
                    >
                        <Settings size={18} />
                        {t('dashboard.manage_permissions')}
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 text-left rtl:text-right">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-4 rtl:flex-row-reverse">
                                <h3 className="text-sm font-medium text-gray-500">{t('dashboard.total_revenue')}</h3>
                                <DollarSign className="text-green-500" size={20} />
                            </div>
                            <p className="text-3xl font-bold text-gray-900">$124,500</p>
                            <div className="flex items-center gap-2 mt-2 rtl:flex-row-reverse">
                                <TrendingUp className="text-green-600" size={16} />
                                <span className="text-sm text-green-600 font-medium">+15.3%</span>
                                <span className="text-sm text-gray-500">{t('dashboard.vs_last_month')}</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-4 rtl:flex-row-reverse">
                                <h3 className="text-sm font-medium text-gray-500">{t('dashboard.active_clients')}</h3>
                                <Users className="text-blue-500" size={20} />
                            </div>
                            <p className="text-3xl font-bold text-gray-900">1,234</p>
                            <div className="flex items-center gap-2 mt-2 rtl:flex-row-reverse">
                                <TrendingUp className="text-green-600" size={16} />
                                <span className="text-sm text-green-600 font-medium">+8.2%</span>
                                <span className="text-sm text-gray-500">{t('dashboard.vs_last_month')}</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-4 rtl:flex-row-reverse">
                                <h3 className="text-sm font-medium text-gray-500">{t('dashboard.conversion_rate')}</h3>
                                <Activity className="text-purple-500" size={20} />
                            </div>
                            <p className="text-3xl font-bold text-gray-900">24.5%</p>
                            <div className="flex items-center gap-2 mt-2 rtl:flex-row-reverse">
                                <TrendingUp className="text-green-600" size={16} />
                                <span className="text-sm text-green-600 font-medium">+3.1%</span>
                                <span className="text-sm text-gray-500">{t('dashboard.vs_last_month')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Chart Placeholder */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('dashboard.revenue_overview')}</h2>
                        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                            <div className="text-center">
                                <BarChart3 className="mx-auto text-gray-400 mb-2" size={48} />
                                <p className="text-gray-500">{t('dashboard.chart_placeholder')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('dashboard.top_campaigns')}</h3>
                            <div className="space-y-3">
                                {['Email Campaign A', 'Social Media Ads', 'Content Marketing'].map((campaign, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg rtl:flex-row-reverse">
                                        <span className="text-gray-900">{campaign}</span>
                                        <span className="text-green-600 font-medium">{(85 - i * 10)}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('dashboard.recent_conversions')}</h3>
                            <div className="space-y-3">
                                {['Lead to Customer', 'Trial to Paid', 'Prospect to Lead'].map((conversion, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg rtl:flex-row-reverse">
                                        <span className="text-gray-900">{conversion}</span>
                                        <span className="text-blue-600 font-medium">{(42 + i * 5)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Permissions Modal */}
            <PermissionsModal
                isOpen={showPermissionsModal}
                onClose={() => setShowPermissionsModal(false)}
                onSave={handleSavePermissions}
            />

            {/* Success Toast */}
            {showSuccessToast && (
                <div className="absolute bottom-8 right-8 rtl:right-auto rtl:left-8 flex items-center gap-3 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 z-50 rtl:flex-row-reverse">
                    <div className="p-1 bg-green-500 rounded-full">
                        <ShieldCheck size={14} className="text-white" />
                    </div>
                    <span className="font-medium">{t('dashboard.save_success')}</span>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
