import React, { useState, useEffect } from 'react';
import {
    Plus, Search, Filter, Download,
    CheckSquare, Clock, User, Calendar,
    CheckCircle2, Circle, AlertCircle
} from 'lucide-react';
import { supabase } from '../../services/supabase';

const Tasks = () => {
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('crm_tasks')
                .select('*, crm_leads(lead_name)')
                .order('due_date', { ascending: true });

            if (error) throw error;
            setTasks(data || []);
        } catch (error: any) {
            console.error('Error fetching tasks:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const newTask = {
            title: formData.get('title'),
            description: formData.get('description'),
            due_date: formData.get('due_date'),
            priority: formData.get('priority'),
            status: 'Pending',
        };

        try {
            const { error } = await supabase.from('crm_tasks').insert([newTask]);
            if (error) throw error;
            setShowAddModal(false);
            fetchTasks();
        } catch (error: any) {
            alert('Error adding task: ' + error.message);
        }
    };

    const toggleTaskStatus = async (task: any) => {
        const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
        try {
            const { error } = await supabase
                .from('crm_tasks')
                .update({
                    status: newStatus,
                    completed_at: newStatus === 'Completed' ? new Date().toISOString() : null
                })
                .eq('id', task.id);

            if (error) throw error;
            fetchTasks();
        } catch (error: any) {
            alert('Error updating task: ' + error.message);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-1">Tasks Management</h1>
                    <nav className="text-sm text-slate-500">
                        <span className="hover:text-blue-600 cursor-pointer">CRM</span>
                        <span className="mx-2">/</span>
                        <span>Tasks</span>
                    </nav>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-[#1a3f6b] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#2a5f8b] transition-colors"
                >
                    <Plus size={20} />
                    Create Task
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Pending Tasks */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="font-bold text-slate-700 flex items-center gap-2 mb-4">
                        <Clock size={20} className="text-orange-500" />
                        Incomplete Tasks
                    </h3>
                    {loading ? (
                        <div className="bg-white p-8 rounded-lg border border-slate-200 text-center">Loading tasks...</div>
                    ) : tasks.filter(t => t.status !== 'Completed').length === 0 ? (
                        <div className="bg-white p-8 rounded-lg border border-slate-200 text-center text-slate-500 italic">No pending tasks! All caught up.</div>
                    ) : (
                        tasks.filter(t => t.status !== 'Completed').map(task => (
                            <div key={task.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
                                <button
                                    onClick={() => toggleTaskStatus(task)}
                                    className="text-slate-400 hover:text-green-500 transition-colors"
                                >
                                    <Circle size={24} />
                                </button>
                                <div className="flex-1">
                                    <div className="font-semibold text-slate-800">{task.title}</div>
                                    <div className="text-sm text-slate-500 mt-1 line-clamp-1">{task.description}</div>
                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="flex items-center gap-1 text-xs text-slate-400">
                                            <Calendar size={12} />
                                            {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'}
                                        </div>
                                        <div className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${task.priority === 'High' ? 'bg-red-100 text-red-600' :
                                                task.priority === 'Medium' ? 'bg-blue-100 text-blue-600' :
                                                    'bg-slate-100 text-slate-600'
                                            }`}>
                                            {task.priority}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Completed Tasks */}
                <div>
                    <h3 className="font-bold text-slate-700 flex items-center gap-2 mb-4">
                        <CheckCircle2 size={20} className="text-green-500" />
                        Completed Recently
                    </h3>
                    <div className="space-y-3 opacity-75">
                        {tasks.filter(t => t.status === 'Completed').slice(0, 5).map(task => (
                            <div key={task.id} className="bg-slate-100 p-3 rounded-lg border border-slate-200 flex items-center gap-3">
                                <CheckCircle2 size={20} className="text-green-600 shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-slate-500 line-through truncate">{task.title}</div>
                                    <div className="text-[10px] text-slate-400">Done {task.completed_at ? new Date(task.completed_at).toLocaleDateString() : ''}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add Task Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setShowAddModal(false)}></div>
                    <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                        <div className="bg-[#1a3f6b] p-4 text-white flex justify-between items-center">
                            <h3 className="text-lg font-bold">Add New Task</h3>
                            <button onClick={() => setShowAddModal(false)}><Plus size={24} className="rotate-45" /></button>
                        </div>
                        <form onSubmit={handleAddTask} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Task Title*</label>
                                <input name="title" required className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                <textarea name="description" rows={3} className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
                                    <input name="due_date" type="date" className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                                    <select name="priority" className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none">
                                        <option value="Low">Low</option>
                                        <option value="Medium" selected>Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-[#1a3f6b] text-white py-3 rounded-lg font-bold hover:bg-[#2a5f8b] transition-colors">
                                Save Task
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tasks;
