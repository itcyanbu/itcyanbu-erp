import React, { useState, useEffect } from 'react';
import {
    Plus, Search, User, Shield,
    Mail, Phone, MoreVertical, Edit2, Key
} from 'lucide-react';
import { supabase } from '../../services/supabase';

const Users = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('full_name', { ascending: true });

            if (error) throw error;
            setUsers(data || []);
        } catch (error: any) {
            console.error('Error fetching users:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-1">Users Management</h1>
                    <nav className="text-sm text-slate-500">
                        <span className="hover:text-blue-600 cursor-pointer">CRM</span>
                        <span className="mx-2">/</span>
                        <span>Users</span>
                    </nav>
                </div>
                <button className="bg-[#1a3f6b] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#2a5f8b] transition-colors">
                    <Plus size={20} />
                    Add User
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full py-12 text-center text-slate-400">Loading users...</div>
                ) : users.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-slate-400">No users found.</div>
                ) : (
                    users.map((u) => (
                        <div key={u.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all relative">
                            <button className="absolute top-4 right-4 text-slate-300 hover:text-slate-600">
                                <MoreVertical size={18} />
                            </button>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 font-bold text-lg">
                                    {u.full_name?.charAt(0) || 'U'}
                                </div>
                                <div>
                                    <div className="font-bold text-slate-800">{u.full_name || 'Unnamed User'}</div>
                                    <div className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full inline-block mt-1">
                                        {u.role || 'Staff'}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 text-sm text-slate-600 mb-6">
                                <div className="flex items-center gap-2">
                                    <Mail size={14} className="text-slate-400" />
                                    {u.email || 'No email set'}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone size={14} className="text-slate-400" />
                                    {u.phone || 'No phone set'}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Shield size={14} className="text-slate-400" />
                                    Access CRM, Sales, Leads
                                </div>
                            </div>

                            <div className="flex border-t border-slate-100 pt-4 gap-4">
                                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-slate-600 hover:bg-slate-50 rounded transition-colors text-xs font-bold">
                                    <Edit2 size={14} />
                                    EDIT PROFILE
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-slate-600 hover:bg-slate-50 rounded transition-colors text-xs font-bold">
                                    <Key size={14} />
                                    PERMISSIONS
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Users;
