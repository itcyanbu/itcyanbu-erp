import React, { useState, useEffect } from 'react';
import { Plus, Key, Calendar, User, Mail, CheckCircle, XCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSupabaseQuery, useSupabaseInsert } from '../../hooks/useSupabase';
import { useToast } from '../../components/ui/Toast';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

interface License {
    id: string;
    license_key: string;
    client_name: string;
    client_email: string;
    license_type: string;
    valid_until: string;
    status: 'active' | 'expired' | 'revoked';
    max_users: number;
}

const LicenseManager = () => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const { showToast } = useToast();

    // Fetch licenses from Supabase
    const { data: licenses, loading, error } = useSupabaseQuery<License[]>({
        table: 'licenses',
        select: '*',
        orderBy: { column: 'issued_at', ascending: false }
    });

    // Use licenses from Supabase or fallback to mock data
    const displayLicenses = licenses || [];

    const handleCreateLicense = async (formData: any) => {
        try {
            const licenseKey = `${formData.type}-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

            // Try to insert into Supabase
            const { supabase } = await import('../../services/supabase');
            const { error: insertError } = await supabase
                .from('licenses')
                .insert({
                    license_key: licenseKey,
                    client_name: formData.clientName,
                    client_email: formData.clientEmail,
                    license_type: formData.type,
                    valid_until: formData.validUntil,
                    status: 'active',
                    max_users: parseInt(formData.maxUsers)
                });

            if (insertError) throw insertError;

            showToast('success', `License ${licenseKey} created successfully!`);
            setRefreshKey(prev => prev + 1); // Trigger refresh
            setShowCreateModal(false);
        } catch (err: any) {
            console.error('License creation error:', err);
            showToast('error', err.message || 'Failed to create license');
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold"><CheckCircle size={14} /> Active</span>;
            case 'expired':
                return <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold"><XCircle size={14} /> Expired</span>;
            case 'revoked':
                return <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold"><Clock size={14} /> Revoked</span>;
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <LoadingSpinner size="lg" text="Loading licenses..." />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">License Management</h1>
                    <p className="text-slate-500 mt-1">Manage and track all software licenses</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center gap-2 bg-[#112D4E] text-white px-6 py-3 rounded-lg hover:bg-[#1a3f6b] transition-colors font-semibold"
                >
                    <Plus size={20} />
                    Generate License
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">Total Licenses</p>
                            <h3 className="text-2xl font-bold text-slate-800 mt-1">{displayLicenses.length}</h3>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Key className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">Active</p>
                            <h3 className="text-2xl font-bold text-green-600 mt-1">
                                {displayLicenses.filter(l => l.status === 'active').length}
                            </h3>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="text-green-600" size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">Expired</p>
                            <h3 className="text-2xl font-bold text-red-600 mt-1">
                                {displayLicenses.filter(l => l.status === 'expired').length}
                            </h3>
                        </div>
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <XCircle className="text-red-600" size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">Total Users</p>
                            <h3 className="text-2xl font-bold text-slate-800 mt-1">
                                {displayLicenses.reduce((sum, l) => sum + l.max_users, 0)}
                            </h3>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <User className="text-purple-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Licenses Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">License Key</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Client</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Valid Until</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Users</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {displayLicenses.map((license) => (
                                <motion.tr
                                    key={license.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="hover:bg-slate-50 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <code className="text-sm font-mono bg-slate-100 px-2 py-1 rounded">{license.license_key}</code>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-semibold text-slate-800">{license.client_name}</p>
                                            <p className="text-sm text-slate-500">{license.client_email}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">{license.license_type}</span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {new Date(license.valid_until).toLocaleDateString('en-IN')}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{license.max_users}</td>
                                    <td className="px-6 py-4">{getStatusBadge(license.status)}</td>
                                    <td className="px-6 py-4">
                                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                            View Details
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create License Modal */}
            {showCreateModal && (
                <CreateLicenseModal
                    onClose={() => setShowCreateModal(false)}
                    onCreate={handleCreateLicense}
                />
            )}
        </div>
    );
};

const CreateLicenseModal = ({ onClose, onCreate }: any) => {
    const [formData, setFormData] = useState({
        clientName: '',
        clientEmail: '',
        type: 'ERP',
        validUntil: '',
        maxUsers: '10'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full"
            >
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Generate New License</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Client Name</label>
                        <input
                            type="text"
                            required
                            value={formData.clientName}
                            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter client company name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Client Email</label>
                        <input
                            type="email"
                            required
                            value={formData.clientEmail}
                            onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="client@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">License Type</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="ERP">ERP</option>
                            <option value="CRM">CRM</option>
                            <option value="HRMS">HRMS</option>
                            <option value="Full Suite">Full Suite</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Valid Until</label>
                        <input
                            type="date"
                            required
                            value={formData.validUntil}
                            onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Max Users</label>
                        <input
                            type="number"
                            required
                            min="1"
                            value={formData.maxUsers}
                            onChange={(e) => setFormData({ ...formData, maxUsers: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="10"
                        />
                    </div>
                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-[#112D4E] text-white rounded-lg hover:bg-[#1a3f6b] font-medium"
                        >
                            Generate
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default LicenseManager;
