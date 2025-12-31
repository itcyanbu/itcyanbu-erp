import React, { useState } from 'react';
import { Save, Mail, Database, Key, AlertCircle } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

const Settings = () => {
    const { showToast } = useToast();
    const [emailConfig, setEmailConfig] = useState({
        serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
        templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
    });

    const [supabaseConfig, setSupabaseConfig] = useState({
        url: import.meta.env.VITE_SUPABASE_URL || '',
        anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || ''
    });

    const handleSaveEmail = () => {
        showToast('info', 'Email settings are configured via .env file. Please update your environment variables.');
    };

    const handleSaveSupabase = () => {
        showToast('info', 'Supabase settings are configured via .env file. Please update your environment variables.');
    };

    const handleTestConnection = async () => {
        try {
            const { supabase } = await import('../../services/supabase');
            const { error } = await supabase.from('profiles').select('count').limit(1);

            if (error) throw error;
            showToast('success', 'Supabase connection successful!');
        } catch (error: any) {
            showToast('error', error.message || 'Supabase connection failed');
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Platform Settings</h1>
                <p className="text-slate-500 mt-1">Configure system integrations and preferences</p>
            </div>

            {/* Info Alert */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="text-blue-500 flex-shrink-0" size={20} />
                <div>
                    <h4 className="font-semibold text-blue-800 text-sm">Configuration Note</h4>
                    <p className="text-sm text-blue-600 mt-1">
                        Settings displayed here are read from environment variables. To make changes, update your <code className="bg-blue-100 px-1 rounded">.env</code> file and restart the development server.
                    </p>
                </div>
            </div>

            {/* EmailJS Configuration */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Mail className="text-blue-600" size={20} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">EmailJS Configuration</h3>
                        <p className="text-sm text-slate-500">Manage email service integration</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Service ID</label>
                        <input
                            type="text"
                            value={emailConfig.serviceId}
                            onChange={(e) => setEmailConfig({ ...emailConfig, serviceId: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-50"
                            placeholder="service_xxxxxxx"
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Template ID</label>
                        <input
                            type="text"
                            value={emailConfig.templateId}
                            onChange={(e) => setEmailConfig({ ...emailConfig, templateId: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-50"
                            placeholder="template_xxxxxxx"
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Public Key</label>
                        <input
                            type="password"
                            value={emailConfig.publicKey}
                            onChange={(e) => setEmailConfig({ ...emailConfig, publicKey: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-50"
                            placeholder="••••••••••••••••"
                            readOnly
                        />
                    </div>
                    <button
                        onClick={handleSaveEmail}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        <Save size={18} />
                        View Configuration
                    </button>
                </div>
            </div>

            {/* Supabase Configuration */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Database className="text-green-600" size={20} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">Supabase Configuration</h3>
                        <p className="text-sm text-slate-500">Database and authentication settings</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Supabase URL</label>
                        <input
                            type="text"
                            value={supabaseConfig.url}
                            onChange={(e) => setSupabaseConfig({ ...supabaseConfig, url: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-50"
                            placeholder="https://xxxxx.supabase.co"
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Anonymous Key</label>
                        <input
                            type="password"
                            value={supabaseConfig.anonKey}
                            onChange={(e) => setSupabaseConfig({ ...supabaseConfig, anonKey: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-50"
                            placeholder="••••••••••••••••"
                            readOnly
                        />
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handleSaveSupabase}
                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                            <Save size={18} />
                            View Configuration
                        </button>
                        <button
                            onClick={handleTestConnection}
                            className="flex items-center gap-2 bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300 transition-colors font-medium"
                        >
                            <Key size={18} />
                            Test Connection
                        </button>
                    </div>
                </div>
            </div>

            {/* Setup Instructions */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Setup Instructions</h3>
                <div className="space-y-3 text-sm text-slate-600">
                    <div className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                        <p>Create a <code className="bg-slate-200 px-1 rounded">.env</code> file in the project root if it doesn't exist</p>
                    </div>
                    <div className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                        <p>Add your EmailJS credentials (VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY)</p>
                    </div>
                    <div className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                        <p>Add your Supabase credentials (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)</p>
                    </div>
                    <div className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                        <p>Run the SQL schema from <code className="bg-slate-200 px-1 rounded">database_schema.sql</code> in your Supabase SQL Editor</p>
                    </div>
                    <div className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
                        <p>Restart your development server to apply the changes</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
