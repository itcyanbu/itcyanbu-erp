import React, { useState, useEffect } from 'react';
import {
    Users, Calendar, DollarSign, Clock,
    Plus, Search, UserCheck, Filter,
    MoreVertical, Edit2, Trash2, CheckCircle2,
    XCircle, Briefcase, Building2
} from 'lucide-react';
import { supabase } from '../../services/supabase';

const HRMSystem = () => {
    const [activeTab, setActiveTab] = useState('employees');
    const [employees, setEmployees] = useState<any[]>([]);
    const [attendance, setAttendance] = useState<any[]>([]);
    const [leaves, setLeaves] = useState<any[]>([]);
    const [departments, setDepartments] = useState<any[]>([]);
    const [designations, setDesignations] = useState<any[]>([]);
    const [profiles, setProfiles] = useState<any[]>([]);
    const [userAttendance, setUserAttendance] = useState<any>(null);
    const [payroll, setPayroll] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [showPayrollModal, setShowPayrollModal] = useState(false);

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();

            // Fetch current user's attendance for today
            if (user) {
                const today = new Date().toISOString().split('T')[0];
                const { data: userAtt } = await supabase
                    .from('hrm_attendance')
                    .select('*')
                    .eq('employee_id', user.id)
                    .eq('date', today)
                    .maybeSingle();
                setUserAttendance(userAtt);

                // Fetch user's payslips
                const { data: userPayroll } = await supabase
                    .from('hrm_payroll')
                    .select('*')
                    .eq('employee_id', user.id)
                    .order('year', { ascending: false })
                    .order('month', { ascending: false });
                setPayroll(userPayroll || []);
            }

            // Fetch Employees with Profile info
            const { data: empData, error: empError } = await supabase
                .from('hrm_employees')
                .select(`
                    *,
                    profiles:id (full_name, email, phone),
                    department:department_id (name),
                    designation:designation_id (title)
                `);
            if (empError) throw empError;
            setEmployees(empData || []);

            // Fetch Today's Attendance
            const today = new Date().toISOString().split('T')[0];
            const { data: attData, error: attError } = await supabase
                .from('hrm_attendance')
                .select('*, profiles:employee_id (full_name)')
                .eq('date', today);
            if (attError) throw attError;
            setAttendance(attData || []);

            // Fetch Leave Requests
            const { data: leaveData, error: leaveError } = await supabase
                .from('hrm_leaves')
                .select('*, profiles:employee_id (full_name)')
                .order('created_at', { ascending: false });
            if (leaveError) throw leaveError;
            setLeaves(leaveData || []);

            // Fetch Organization Data
            const { data: deptData, error: deptError } = await supabase.from('hrm_departments').select('*').order('name');
            if (deptError) throw deptError;
            setDepartments(deptData || []);

            const { data: desigData, error: desigError } = await supabase.from('hrm_designations').select('*, hrm_departments(name)').order('title');
            if (desigError) throw desigError;
            setDesignations(desigData || []);

            const { data: profData, error: profError } = await supabase.from('profiles').select('id, full_name, email').order('full_name');
            if (profError) throw profError;
            setProfiles(profData || []);

        } catch (error: any) {
            console.error('Error fetching HRMS data:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddDepartment = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const name = formData.get('name') as string;
        try {
            const { error } = await supabase.from('hrm_departments').insert([{ name }]);
            if (error) throw error;
            fetchAllData();
            (e.target as HTMLFormElement).reset();
        } catch (error: any) {
            alert(error.message);
        }
    };

    const handleAddDesignation = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const title = formData.get('title') as string;
        const deptId = formData.get('deptId') as string;
        try {
            const { error } = await supabase.from('hrm_designations').insert([{ title, department_id: deptId }]);
            if (error) throw error;
            fetchAllData();
            (e.target as HTMLFormElement).reset();
        } catch (error: any) {
            alert(error.message);
        }
    };

    const handleAddEmployee = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const employeeData = {
            id: formData.get('profileId') as string,
            employee_code: formData.get('employeeCode') as string,
            department_id: formData.get('departmentId') as string,
            designation_id: formData.get('designationId') as string,
            joining_date: formData.get('joiningDate') as string,
            salary_package: parseFloat(formData.get('salary') as string),
            status: 'Active'
        };

        try {
            const { error } = await supabase.from('hrm_employees').insert([employeeData]);
            if (error) throw error;
            fetchAllData();
            setShowAddModal(false);
        } catch (error: any) {
            alert(error.message);
        }
    };

    const handleAttendance = async (type: 'check_in' | 'check_out') => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Not authenticated');

            const today = new Date().toISOString().split('T')[0];
            const now = new Date().toISOString();

            if (type === 'check_in') {
                const { error } = await supabase.from('hrm_attendance').insert([{
                    employee_id: user.id,
                    date: today,
                    check_in: now,
                    status: 'Present'
                }]);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('hrm_attendance').update({
                    check_out: now
                }).eq('employee_id', user.id).eq('date', today);
                if (error) throw error;
            }

            fetchAllData();
        } catch (error: any) {
            alert(error.message);
        }
    };

    const handleApplyLeave = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Not authenticated');

            const leaveData = {
                employee_id: user.id,
                leave_type: formData.get('type') as string,
                start_date: formData.get('startDate') as string,
                end_date: formData.get('endDate') as string,
                reason: formData.get('reason') as string,
                status: 'Pending'
            };

            const { error } = await supabase.from('hrm_leaves').insert([leaveData]);
            if (error) throw error;
            fetchAllData();
            setShowLeaveModal(false);
        } catch (error: any) {
            alert(error.message);
        }
    };

    const handleLeaveDecision = async (id: string, decision: 'Approved' | 'Rejected') => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            const { error } = await supabase.from('hrm_leaves').update({
                status: decision,
                approved_by: user?.id,
                approval_date: new Date().toISOString()
            }).eq('id', id);
            if (error) throw error;
            fetchAllData();
        } catch (error: any) {
            alert(error.message);
        }
    };

    const handleRunPayroll = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const month = parseInt(formData.get('month') as string);
        const year = parseInt(formData.get('year') as string);

        try {
            const payrollEntries = employees.filter(emp => emp.status === 'Active').map(emp => ({
                employee_id: emp.id,
                month,
                year,
                basic_salary: emp.salary_package / 12,
                allowances: 0,
                deductions: 0,
                net_salary: emp.salary_package / 12,
                status: 'Processed'
            }));

            const { error } = await supabase.from('hrm_payroll').insert(payrollEntries);
            if (error) throw error;
            fetchAllData();
            setShowPayrollModal(false);
            alert(`Payroll processed for ${month}/${year}`);
        } catch (error: any) {
            alert(error.message);
        }
    };

    const getLeaveStatusColor = (status: string) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-700';
            case 'Pending': return 'bg-amber-100 text-amber-700';
            case 'Rejected': return 'bg-red-100 text-red-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">HRMS Portal</h1>
                    <p className="text-slate-500 mt-1 font-medium">Manage your workforce, attendance, and payroll in one place.</p>
                </div>
                <div className="flex gap-3">
                    {!userAttendance ? (
                        <button
                            onClick={() => handleAttendance('check_in')}
                            className="bg-green-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-green-700 transition-all font-bold shadow-lg shadow-green-100"
                        >
                            <Clock size={20} />
                            Check In
                        </button>
                    ) : !userAttendance.check_out ? (
                        <button
                            onClick={() => handleAttendance('check_out')}
                            className="bg-red-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-red-700 transition-all font-bold shadow-lg shadow-red-100"
                        >
                            <Clock size={20} />
                            Check Out
                        </button>
                    ) : (
                        <div className="bg-slate-100 text-slate-500 px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold select-none cursor-not-allowed">
                            <CheckCircle2 size={20} className="text-green-500" />
                            Day Completed
                        </div>
                    )}
                    <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-slate-50 transition-all font-bold shadow-sm">
                        <Filter size={18} />
                        Filters
                    </button>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-[#112D4E] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#1a3f6b] transition-all font-bold shadow-lg shadow-blue-100"
                    >
                        <Plus size={20} />
                        Add Employee
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Staff', value: employees.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Present Today', value: attendance.length, icon: UserCheck, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'On Leave', value: leaves.filter(l => l.status === 'Approved').length, icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'Pending Leaves', value: leaves.filter(l => l.status === 'Pending').length, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                                <stat.icon size={24} />
                            </div>
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">HR OVERVIEW</span>
                        </div>
                        <div className="text-3xl font-black text-slate-800">{stat.value}</div>
                        <div className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-tight">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-8">
                <div className="flex border-b border-slate-50 px-2 pt-2">
                    {[
                        { id: 'employees', label: 'Employees', icon: Users },
                        { id: 'attendance', label: 'Attendance', icon: Clock },
                        { id: 'leaves', label: 'Leaves', icon: Calendar },
                        { id: 'payroll', label: 'Payroll', icon: DollarSign },
                        { id: 'org', label: 'Organization', icon: Building2 },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all relative ${activeTab === tab.id
                                ? 'text-blue-600'
                                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>
                            )}
                        </button>
                    ))}
                </div>

                <div className="p-6">
                    {loading ? (
                        <div className="py-20 text-center text-slate-400 font-bold animate-pulse">Synchronizing HR data...</div>
                    ) : activeTab === 'employees' && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-50 text-slate-400 font-black uppercase text-[10px] tracking-widest border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-4 text-left">Internal Name</th>
                                        <th className="px-6 py-4 text-left">Designation</th>
                                        <th className="px-6 py-4 text-left">Department</th>
                                        <th className="px-6 py-4 text-left">Contact Info</th>
                                        <th className="px-6 py-4 text-left">Status</th>
                                        <th className="px-6 py-4 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 text-slate-600">
                                    {employees.length > 0 ? employees.map((emp) => (
                                        <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4 font-bold text-slate-800">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-black">
                                                        {emp.profiles?.full_name?.charAt(0) || 'E'}
                                                    </div>
                                                    <div>
                                                        <div>{emp.profiles?.full_name || 'Unnamed'}</div>
                                                        <div className="text-[10px] text-slate-400 font-mono tracking-tighter uppercase">{emp.employee_code}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-medium">{emp.designation?.title || '--'}</td>
                                            <td className="px-6 py-4">
                                                <span className="bg-slate-100 px-2 py-0.5 rounded-lg text-xs font-bold text-slate-500">
                                                    {emp.department?.name || '--'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-xs">{emp.profiles?.email}</div>
                                                <div className="text-[10px] text-slate-400 font-bold">{emp.profiles?.phone}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${emp.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                    }`}>
                                                    {emp.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="flex gap-2">
                                                    <button className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"><Edit2 size={16} /></button>
                                                    <button className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg transition-colors"><Trash2 size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan={6} className="py-20 text-center text-slate-400 italic">No staff records found in system.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'attendance' && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-50 text-slate-400 font-black uppercase text-[10px] tracking-widest border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-4 text-left">Employee</th>
                                        <th className="px-6 py-4 text-left">Check In</th>
                                        <th className="px-6 py-4 text-left">Check Out</th>
                                        <th className="px-6 py-4 text-left">Performance</th>
                                        <th className="px-6 py-4 text-left">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {attendance.length > 0 ? attendance.map((att) => (
                                        <tr key={att.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-slate-800">{att.profiles?.full_name}</td>
                                            <td className="px-6 py-4 text-slate-500 font-mono text-xs">{att.check_in ? new Date(att.check_in).toLocaleTimeString() : '--'}</td>
                                            <td className="px-6 py-4 text-slate-500 font-mono text-xs">{att.check_out ? new Date(att.check_out).toLocaleTimeString() : '--'}</td>
                                            <td className="px-6 py-4">
                                                <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-green-500" style={{ width: '85%' }}></div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-black uppercase">{att.status}</span>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan={5} className="py-20 text-center text-slate-400 italic">No attendance logs for today yet.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'leaves' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Active Leave Requests</h3>
                                <button
                                    onClick={() => setShowLeaveModal(true)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-black uppercase hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                                >
                                    Apply for Leave
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-slate-50 text-slate-400 font-black uppercase text-[10px] tracking-widest border-b border-slate-100">
                                        <tr>
                                            <th className="px-6 py-4 text-left">Applicant</th>
                                            <th className="px-6 py-4 text-left">Type</th>
                                            <th className="px-6 py-4 text-left">Duration</th>
                                            <th className="px-6 py-4 text-left">Reason</th>
                                            <th className="px-6 py-4 text-left">Status</th>
                                            <th className="px-6 py-4 text-left">Decision</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {leaves.length > 0 ? leaves.map((leave) => (
                                            <tr key={leave.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4 font-bold text-slate-800">{leave.profiles?.full_name}</td>
                                                <td className="px-6 py-4"><span className="font-bold text-blue-600">{leave.leave_type}</span></td>
                                                <td className="px-6 py-4 text-xs font-mono">{leave.start_date} to {leave.end_date}</td>
                                                <td className="px-6 py-4 text-slate-400 italic max-w-xs truncate">{leave.reason}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${getLeaveStatusColor(leave.status)}`}>
                                                        {leave.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {leave.status === 'Pending' && (
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleLeaveDecision(leave.id, 'Approved')}
                                                                title="Approve"
                                                                className="p-1 hover:bg-green-50 text-green-600 rounded transition-colors"
                                                            >
                                                                <CheckCircle2 size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleLeaveDecision(leave.id, 'Rejected')}
                                                                title="Reject"
                                                                className="p-1 hover:bg-red-50 text-red-600 rounded transition-colors"
                                                            >
                                                                <XCircle size={18} />
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan={6} className="py-20 text-center text-slate-400 italic">No leave requests found.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'org' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Departments Column */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                        <Building2 size={18} className="text-blue-600" />
                                        Departments
                                    </h3>
                                    <button className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
                                        <Plus size={18} />
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {departments.map(dept => (
                                        <div key={dept.id} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center group">
                                            <div>
                                                <div className="font-bold text-slate-700">{dept.name}</div>
                                                <div className="text-xs text-slate-400">{dept.description || 'No description'}</div>
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                                <button className="p-1.5 hover:bg-white text-slate-400 hover:text-blue-600 rounded-md transition-all"><Edit2 size={14} /></button>
                                                <button className="p-1.5 hover:bg-white text-slate-400 hover:text-red-600 rounded-md transition-all"><Trash2 size={14} /></button>
                                            </div>
                                        </div>
                                    ))}
                                    <form onSubmit={handleAddDepartment} className="flex gap-2">
                                        <input
                                            name="name"
                                            required
                                            placeholder="New Department Name..."
                                            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-blue-700 transition-colors">ADD</button>
                                    </form>
                                </div>
                            </div>

                            {/* Designations Column */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                        <Briefcase size={18} className="text-purple-600" />
                                        Designations
                                    </h3>
                                    <button className="text-purple-600 hover:bg-purple-50 p-1.5 rounded-lg transition-colors">
                                        <Plus size={18} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                                    {designations.map(desig => (
                                        <div key={desig.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative group overflow-hidden">
                                            <div className="absolute top-0 right-0 w-16 h-1 w-full bg-purple-500/10"></div>
                                            <div className="font-bold text-slate-700 text-sm">{desig.title}</div>
                                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{desig.hrm_departments?.name}</div>
                                            <div className="mt-2 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1 text-slate-300 hover:text-slate-600"><Edit2 size={12} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <form onSubmit={handleAddDesignation} className="bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200 space-y-3">
                                    <input
                                        name="title"
                                        required
                                        placeholder="Designation Title..."
                                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none"
                                    />
                                    <div className="flex gap-2">
                                        <select
                                            name="deptId"
                                            required
                                            className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none"
                                        >
                                            <option value="">Select Department</option>
                                            {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                        </select>
                                        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold text-xs">CREATE</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {activeTab === 'payroll' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Salary & Payslips</h3>
                                <button
                                    onClick={() => setShowPayrollModal(true)}
                                    className="bg-purple-600 text-white px-4 py-2 rounded-xl text-xs font-black uppercase hover:bg-purple-700 transition-all shadow-lg shadow-purple-100"
                                >
                                    Run Monthly Payroll
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-slate-50 text-slate-400 font-black uppercase text-[10px] tracking-widest border-b border-slate-100">
                                        <tr>
                                            <th className="px-6 py-4 text-left">Period</th>
                                            <th className="px-6 py-4 text-left">Base Salary</th>
                                            <th className="px-6 py-4 text-left">Allowances</th>
                                            <th className="px-6 py-4 text-left">Deductions</th>
                                            <th className="px-6 py-4 text-left">Net Paid</th>
                                            <th className="px-6 py-4 text-left">Status</th>
                                            <th className="px-6 py-4 text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {payroll.length > 0 ? payroll.map((pay) => (
                                            <tr key={pay.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4 font-bold text-slate-800">
                                                    {new Date(pay.year, pay.month - 1).toLocaleString('default', { month: 'long', year: 'numeric' })}
                                                </td>
                                                <td className="px-6 py-4 font-mono text-xs">₹{pay.basic_salary?.toLocaleString()}</td>
                                                <td className="px-6 py-4 text-green-600 font-bold">+₹{pay.allowances?.toLocaleString()}</td>
                                                <td className="px-6 py-4 text-red-600 font-bold">-₹{pay.deductions?.toLocaleString()}</td>
                                                <td className="px-6 py-4 font-black text-slate-800">₹{pay.net_salary?.toLocaleString()}</td>
                                                <td className="px-6 py-4">
                                                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter">
                                                        {pay.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button className="flex items-center gap-1 text-blue-600 font-bold text-xs hover:underline">
                                                        <Search size={14} />
                                                        VIEW SLIP
                                                    </button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan={7} className="py-20 text-center text-slate-400 italic">No payroll records found for your account.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Employee Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
                        <div className="bg-[#112D4E] p-6 text-white flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-black">Register New Employee</h2>
                                <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mt-1">HRMS Onboarding</p>
                            </div>
                            <button onClick={() => setShowAddModal(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                                <XCircle size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleAddEmployee} className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Select Platform User</label>
                                    <select name="profileId" required className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-700">
                                        <option value="">Choose a user...</option>
                                        {profiles.map(p => (
                                            <option key={p.id} value={p.id}>{p.full_name} ({p.email})</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Employee ID Code</label>
                                    <input name="employeeCode" required placeholder="EMP-1001" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Joining Date</label>
                                    <input name="joiningDate" type="date" required className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Department</label>
                                    <select name="departmentId" required className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                                        <option value="">Select Dept</option>
                                        {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Designation</label>
                                    <select name="designationId" required className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                                        <option value="">Select Role</option>
                                        {designations.map(d => <option key={d.id} value={d.id}>{d.title}</option>)}
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Annual CTC / Salary</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input name="salary" type="number" required placeholder="850000" className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-[#A7D129] text-[#112D4E] py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#b8e42d] transition-all shadow-lg shadow-lime-100">
                                Confirm Registration
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Leave Application Modal */}
            {showLeaveModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
                        <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-black">Apply for Leave</h2>
                                <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mt-1">Leave Management System</p>
                            </div>
                            <button onClick={() => setShowLeaveModal(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                                <XCircle size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleApplyLeave} className="p-8 space-y-5">
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Leave Type</label>
                                <select name="type" required className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-700">
                                    <option value="Sick Leave">Sick Leave</option>
                                    <option value="Casual Leave">Casual Leave</option>
                                    <option value="Earned Leave">Earned Leave</option>
                                    <option value="Unpaid Leave">Unpaid Leave</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Start Date</label>
                                    <input name="startDate" type="date" required className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-medium" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">End Date</label>
                                    <input name="endDate" type="date" required className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-medium" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Reason for Absence</label>
                                <textarea name="reason" rows={3} required placeholder="Brief explanation..." className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-medium resize-none"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 mt-2">
                                Submit Request
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Run Payroll Modal */}
            {showPayrollModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
                        <div className="bg-purple-600 p-6 text-white flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-black">Generate Payroll</h2>
                                <p className="text-purple-100 text-xs font-bold uppercase tracking-widest mt-1">Finance & Accounts</p>
                            </div>
                            <button onClick={() => setShowPayrollModal(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                                <XCircle size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleRunPayroll} className="p-8 space-y-5">
                            <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl">
                                <p className="text-[10px] text-amber-700 font-bold leading-relaxed">
                                    <span className="font-black text-amber-800 uppercase block mb-1">Warning:</span>
                                    Running payroll will generate salary entries for ALL active employees for the selected period. This action cannot be easily undone.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Select Month</label>
                                    <select name="month" defaultValue={new Date().getMonth() + 1} required className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none font-bold">
                                        {[...Array(12)].map((_, i) => (
                                            <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Select Year</label>
                                    <select name="year" defaultValue={new Date().getFullYear()} required className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none font-bold">
                                        <option value={2024}>2024</option>
                                        <option value={2025}>2025</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-purple-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-purple-700 transition-all shadow-lg shadow-purple-100 mt-2">
                                Execute Payroll Script
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HRMSystem;
