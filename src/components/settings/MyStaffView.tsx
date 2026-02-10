import { useState } from 'react';
import {
    Search,
    Plus,
    MoreHorizontal,
    Mail,
    Phone,
    Shield,
    CheckCircle2,
    XCircle
} from 'lucide-react';
import clsx from 'clsx';

interface StaffMember {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: 'Admin' | 'User';
    status: 'Active' | 'Inactive';
    lastLogin: string;
    permissions: string[];
}

const mockStaff: StaffMember[] = [
    {
        id: '1',
        firstName: 'itcyanbu',
        lastName: 'Admin',
        email: 'itc@example.com',
        phone: '+966545450613',
        role: 'Admin',
        status: 'Active',
        lastLogin: '2 mins ago',
        permissions: ['All']
    },
    {
        id: '2',
        firstName: 'Sarah',
        lastName: 'Saleh',
        email: 'sarah@example.com',
        phone: '+966500000000',
        role: 'User',
        status: 'Active',
        lastLogin: '1 hour ago',
        permissions: ['CRM', 'Calendar']
    }
];

const MyStaffView = ({ onAddClick }: { onAddClick: () => void }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [staff] = useState<StaffMember[]>(mockStaff);

    const filteredStaff = staff.filter(member =>
        `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ghl-blue transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-100 focus:border-ghl-blue outline-none transition-all"
                    />
                </div>
                <button
                    onClick={onAddClick}
                    className="flex items-center gap-2 px-6 py-2.5 bg-ghl-blue text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 hover:translate-y-[-2px]"
                >
                    <Plus size={20} />
                    Add Employee
                </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Employee</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Contact</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Role</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Last Login</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredStaff.map((member) => (
                                <tr key={member.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-ghl-blue border border-blue-100 font-bold">
                                                {member.firstName[0]}{member.lastName[0]}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900">{member.firstName} {member.lastName}</div>
                                                <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                                    <Shield size={12} />
                                                    {member.role === 'Admin' ? 'Administrator' : 'Standard User'}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Mail size={14} className="text-gray-400" />
                                                {member.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Phone size={14} className="text-gray-400" />
                                                {member.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={clsx(
                                            "px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border",
                                            member.role === 'Admin'
                                                ? "bg-purple-50 text-purple-600 border-purple-100"
                                                : "bg-blue-50 text-ghl-blue border-blue-100"
                                        )}>
                                            {member.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            {member.status === 'Active' ? (
                                                <CheckCircle2 size={16} className="text-emerald-500" />
                                            ) : (
                                                <XCircle size={16} className="text-gray-400" />
                                            )}
                                            <span className={clsx(
                                                "text-sm font-medium",
                                                member.status === 'Active' ? "text-emerald-600" : "text-gray-500"
                                            )}>
                                                {member.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 italic">
                                        {member.lastLogin}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-gray-400 hover:text-ghl-blue hover:bg-blue-50 rounded-lg transition-all">
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyStaffView;
