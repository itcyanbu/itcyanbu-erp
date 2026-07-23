import React, { useState, useEffect } from 'react';
import { X, Phone, Mail, MessageSquare, Calendar, Clock, Tag, MoreHorizontal, CheckCircle2, Circle, Plus, Trash2 } from 'lucide-react';
import type { Contact } from '../types/contact';

interface ContactTask {
    id: string;
    title: string;
    completed: boolean;
    createdAt: string;
}

interface ContactDetailSlideOverProps {
    contact: Contact | null;
    isOpen: boolean;
    onClose: () => void;
    onEdit: (contact: Contact) => void;
}

const ContactDetailSlideOver: React.FC<ContactDetailSlideOverProps> = ({ contact, isOpen, onClose, onEdit }) => {
    const [activeTab, setActiveTab] = useState('Overview');
    
    // Tasks State
    const [tasks, setTasks] = useState<ContactTask[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    // Load tasks from LocalStorage when contact changes
    useEffect(() => {
        if (contact?.id) {
            const saved = localStorage.getItem(`contact_tasks_${contact.id}`);
            if (saved) {
                try {
                    setTasks(JSON.parse(saved));
                } catch (e) {
                    setTasks([]);
                }
            } else {
                setTasks([]);
            }
        }
    }, [contact?.id]);

    // Save tasks to LocalStorage when they change
    useEffect(() => {
        if (contact?.id) {
            localStorage.setItem(`contact_tasks_${contact.id}`, JSON.stringify(tasks));
        }
    }, [tasks, contact?.id]);

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;
        
        const newTask: ContactTask = {
            id: Date.now().toString(),
            title: newTaskTitle,
            completed: false,
            createdAt: new Date().toISOString()
        };
        setTasks([...tasks, newTask]);
        setNewTaskTitle('');
    };

    const toggleTask = (taskId: string) => {
        setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
    };

    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId));
    };

    const tabs = ['Overview', 'Notes', 'Tasks', 'Appointments', 'Documents'];

    return (
        <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />

            {/* Slide-over panel */}
            <div className={`absolute inset-y-0 right-0 w-full max-w-2xl bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {contact && (
                    <>
                        {/* Header */}
                        <div className="bg-gray-50 border-b border-ghl-border p-6 font-sans">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-medium ${contact.avatarColor}`}>
                                        {contact.initials}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-ghl-text">{contact.name}</h2>
                                        <p className="text-gray-500">Added {new Date(contact.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onEdit(contact)}
                                        className="flex items-center gap-2 px-4 py-2 bg-ghl-blue text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
                                    >
                                        Edit
                                    </button>
                                    <button className="p-2 text-gray-500 hover:text-gray-700 bg-white border border-gray-200 rounded-md shadow-sm">
                                        <MoreHorizontal size={20} />
                                    </button>
                                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600">
                                        <X size={24} />
                                    </button>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={() => contact.phone && (window.location.href = `tel:${contact.phone}`)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 shadow-sm transition-colors"
                                >
                                    <Phone size={18} className="text-gray-500" />
                                    Call
                                </button>
                                <button 
                                    onClick={() => contact.phone && (window.location.href = `sms:${contact.phone}`)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 shadow-sm transition-colors"
                                >
                                    <MessageSquare size={18} className="text-gray-500" />
                                    SMS
                                </button>
                                <button 
                                    onClick={() => contact.email && (window.location.href = `mailto:${contact.email}`)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 shadow-sm transition-colors"
                                >
                                    <Mail size={18} className="text-gray-500" />
                                    Email
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-ghl-border px-6">
                            <div className="flex items-center gap-6">
                                {tabs.map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === tab
                                            ? 'border-ghl-blue text-ghl-blue'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 h-[calc(100vh-280px)] overflow-y-auto">
                            {activeTab === 'Overview' && (
                                <div className="space-y-8">
                                    {/* Contact Info */}
                                    <section>
                                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Contact Information</h3>
                                        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                            <div className="space-y-1">
                                                <label className="text-xs text-gray-500 font-medium">Email</label>
                                                <div className="flex items-center gap-2 text-gray-900">
                                                    <Mail size={16} className="text-gray-400" />
                                                    {contact.email}
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs text-gray-500 font-medium">Phone</label>
                                                <div className="flex items-center gap-2 text-gray-900">
                                                    <Phone size={16} className="text-gray-400" />
                                                    {contact.phone}
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs text-gray-500 font-medium">Date Created</label>
                                                <div className="flex items-center gap-2 text-gray-900">
                                                    <Calendar size={16} className="text-gray-400" />
                                                    {new Date(contact.createdAt).toLocaleString()}
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs text-gray-500 font-medium">Last Activity</label>
                                                <div className="flex items-center gap-2 text-gray-900">
                                                    <Clock size={16} className="text-gray-400" />
                                                    Just now
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <div className="border-t border-gray-100" />

                                    {/* Tags */}
                                    <section>
                                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Tags</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {contact.tags.map(tag => (
                                                <span key={tag} className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                                                    <Tag size={14} className="text-gray-400" />
                                                    {tag}
                                                </span>
                                            ))}
                                            <button className="px-3 py-1 border border-dashed border-gray-300 text-gray-500 rounded-full text-sm hover:border-ghl-blue hover:text-ghl-blue transition-colors">
                                                + Add Tag
                                            </button>
                                        </div>
                                    </section>
                                </div>
                            )}

                            {activeTab !== 'Overview' && activeTab !== 'Tasks' && (
                                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                    <div className="p-4 bg-gray-50 rounded-full mb-4">
                                        <Clock size={32} className="text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-1">Coming Soon</h3>
                                    <p className="text-center max-w-xs">The {activeTab} feature is currently under development.</p>
                                </div>
                            )}

                            {activeTab === 'Tasks' && (
                                <div className="space-y-6">
                                    {/* Add Task Form */}
                                    <form onSubmit={handleAddTask} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newTaskTitle}
                                            onChange={(e) => setNewTaskTitle(e.target.value)}
                                            placeholder="What needs to be done?"
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-ghl-blue focus:border-ghl-blue outline-none"
                                        />
                                        <button 
                                            type="submit"
                                            disabled={!newTaskTitle.trim()}
                                            className="px-4 py-2 bg-ghl-blue text-white rounded-md font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            <Plus size={18} />
                                            Add
                                        </button>
                                    </form>

                                    {/* Task List */}
                                    <div className="space-y-3">
                                        {tasks.length === 0 ? (
                                            <div className="text-center py-8 text-gray-500">
                                                <div className="inline-block p-3 bg-gray-50 rounded-full mb-3">
                                                    <CheckCircle2 size={24} className="text-gray-400" />
                                                </div>
                                                <p>No tasks yet. Add one above!</p>
                                            </div>
                                        ) : (
                                            tasks.map(task => (
                                                <div 
                                                    key={task.id} 
                                                    className={`flex items-start gap-3 p-4 rounded-lg border transition-colors ${task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'}`}
                                                >
                                                    <button 
                                                        onClick={() => toggleTask(task.id)}
                                                        className="mt-0.5 text-gray-400 hover:text-ghl-blue transition-colors flex-shrink-0"
                                                    >
                                                        {task.completed ? <CheckCircle2 size={20} className="text-emerald-500" /> : <Circle size={20} />}
                                                    </button>
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`text-sm font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                                                            {task.title}
                                                        </p>
                                                        <p className="text-xs text-gray-400 mt-1">
                                                            Added {new Date(task.createdAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <button 
                                                        onClick={() => deleteTask(task.id)}
                                                        className="text-gray-400 hover:text-rose-500 transition-colors p-1"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ContactDetailSlideOver;
