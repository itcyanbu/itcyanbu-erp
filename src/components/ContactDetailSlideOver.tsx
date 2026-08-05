import React, { useState, useEffect, useRef } from 'react';
import { X, Phone, Mail, MessageSquare, Calendar, Clock, Tag, MoreHorizontal, CheckCircle2, Circle, Plus, Trash2, Send, Activity, ChevronDown, FileText, CalendarClock, Download, FilePlus, UploadCloud } from 'lucide-react';
import { MESSAGE_TEMPLATES } from '../data/mockTemplates';
import type { Contact } from '../types/contact';
import ActiveCallOverlay from './ActiveCallOverlay';
import { useTwilio } from '../context/TwilioContext';

interface ContactTask {
    id: string;
    title: string;
    completed: boolean;
    createdAt: string;
}

interface ContactNote {
    id: string;
    content: string;
    createdAt: string;
}

interface Appointment {
    id: string;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    type: string;
    status: 'Pending' | 'Confirmed' | 'Cancelled';
}

const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

interface ContactDetailSlideOverProps {
    contact: Contact | null;
    isOpen: boolean;
    onClose: () => void;
    onEdit: (contact: Contact) => void;
}

const ContactDetailSlideOver: React.FC<ContactDetailSlideOverProps> = ({ contact, isOpen, onClose, onEdit }) => {
    const [activeTab, setActiveTab] = useState('Overview');
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [isSending, setIsSending] = useState(false);
    
    // Tasks State
    const [tasks, setTasks] = useState<ContactTask[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    // Notes State
    const [notes, setNotes] = useState<ContactNote[]>([]);
    const [newNoteContent, setNewNoteContent] = useState('');

    // Documents State
    interface UploadedDoc { id: string; name: string; size: string; uploadedAt: string; }
    const [uploadedDocs, setUploadedDocs] = useState<UploadedDoc[]>([
        { id: 'mock1', name: 'Signed_Contract.pdf', size: '2.4 MB', uploadedAt: '2 days ago' },
        { id: 'mock2', name: 'ID_Verification.jpg', size: '850 KB', uploadedAt: 'last week' }
    ]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Appointments State
    const [appointments, setAppointments] = useState<Appointment[]>([
        { id: 'mock-appt-1', title: 'Consultation Call', date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], startTime: '10:00', endTime: '10:30', type: 'Call', status: 'Pending' }
    ]);
    const [showScheduleForm, setShowScheduleForm] = useState(false);
    const [newAppt, setNewAppt] = useState({ title: '', date: '', startTime: '', endTime: '', type: 'Call' });
    const [isCallActive, setIsCallActive] = useState(false);
    const { makeCall } = useTwilio();

    // Slide-over toast state
    const [slideToast, setSlideToast] = useState<string | null>(null);

    const triggerSlideToast = (msg: string) => {
        setSlideToast(msg);
        setTimeout(() => setSlideToast(null), 3000);
    };

    // Load tasks from LocalStorage when contact changes
    useEffect(() => {
        if (contact?.id) {
            const savedTasks = localStorage.getItem(`contact_tasks_${contact.id}`);
            if (savedTasks) { try { setTasks(JSON.parse(savedTasks)); } catch { setTasks([]); } } else { setTasks([]); }

            const savedNotes = localStorage.getItem(`contact_notes_${contact.id}`);
            if (savedNotes) { try { setNotes(JSON.parse(savedNotes)); } catch { setNotes([]); } } else { setNotes([]); }

            const savedDocs = localStorage.getItem(`contact_docs_${contact.id}`);
            if (savedDocs) {
                try {
                    const parsed = JSON.parse(savedDocs);
                    setUploadedDocs([
                        { id: 'mock1', name: 'Signed_Contract.pdf', size: '2.4 MB', uploadedAt: '2 days ago' },
                        { id: 'mock2', name: 'ID_Verification.jpg', size: '850 KB', uploadedAt: 'last week' },
                        ...parsed
                    ]);
                } catch { /* ignore */ }
            }

            const savedAppts = localStorage.getItem(`contact_appts_${contact.id}`);
            if (savedAppts) {
                try {
                    const parsed = JSON.parse(savedAppts);
                    setAppointments([
                        { id: 'mock-appt-1', title: 'Consultation Call', date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], startTime: '10:00', endTime: '10:30', type: 'Call', status: 'Pending' },
                        ...parsed
                    ]);
                } catch { /* ignore */ }
            }
        }
    }, [contact?.id]);

    // Save tasks, notes, docs, appts to LocalStorage when they change
    useEffect(() => {
        if (contact?.id) {
            localStorage.setItem(`contact_tasks_${contact.id}`, JSON.stringify(tasks));
            localStorage.setItem(`contact_notes_${contact.id}`, JSON.stringify(notes));
            const realDocs = uploadedDocs.filter(d => d.id !== 'mock1' && d.id !== 'mock2');
            localStorage.setItem(`contact_docs_${contact.id}`, JSON.stringify(realDocs));
            const realAppts = appointments.filter(a => a.id !== 'mock-appt-1');
            localStorage.setItem(`contact_appts_${contact.id}`, JSON.stringify(realAppts));
        }
    }, [tasks, notes, uploadedDocs, appointments, contact?.id]);

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

    const handleAddNote = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newNoteContent.trim()) return;
        
        const newNote: ContactNote = {
            id: Date.now().toString(),
            content: newNoteContent,
            createdAt: new Date().toISOString()
        };
        setNotes([newNote, ...notes]);
        setNewNoteContent('');
    };

    const deleteNote = (noteId: string) => {
        setNotes(notes.filter(n => n.id !== noteId));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const sizeKB = file.size / 1024;
        const sizeStr = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${Math.round(sizeKB)} KB`;
        const newDoc = {
            id: Date.now().toString(),
            name: file.name,
            size: sizeStr,
            uploadedAt: 'just now'
        };
        setUploadedDocs(prev => [...prev, newDoc]);
        triggerSlideToast(`✅ "${file.name}" uploaded successfully!`);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const deleteDoc = (docId: string) => {
        setUploadedDocs(prev => prev.filter(d => d.id !== docId));
    };

    const handleAddAppointment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newAppt.title.trim() || !newAppt.date || !newAppt.startTime) return;
        const appt: Appointment = {
            id: Date.now().toString(),
            title: newAppt.title,
            date: newAppt.date,
            startTime: newAppt.startTime,
            endTime: newAppt.endTime,
            type: newAppt.type,
            status: 'Confirmed'
        };
        setAppointments(prev => [...prev, appt]);
        setNewAppt({ title: '', date: '', startTime: '', endTime: '', type: 'Call' });
        setShowScheduleForm(false);
        triggerSlideToast('✅ Appointment scheduled successfully!');
    };

    const deleteAppointment = (id: string) => {
        setAppointments(prev => prev.filter(a => a.id !== id));
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
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => {
                                        if (contact.phone) {
                                            setIsCallActive(true);
                                            makeCall(contact.phone, false);
                                        }
                                    }}
                                    className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 bg-white border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 shadow-sm transition-colors text-sm"
                                >
                                    <Phone size={16} className="text-gray-500" />
                                    Call
                                </button>
                                <button 
                                    onClick={() => contact.phone && (window.location.href = `sms:${contact.phone}`)}
                                    className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 bg-white border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 shadow-sm transition-colors text-sm"
                                >
                                    <MessageSquare size={16} className="text-gray-500" />
                                    SMS
                                </button>
                                <button 
                                    onClick={() => contact.phone && window.open(`https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}`, '_blank')}
                                    className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 bg-white border border-[#25D366] text-[#25D366] rounded-md font-medium hover:bg-green-50 shadow-sm transition-colors text-sm"
                                    title="WhatsApp Chat"
                                >
                                    <WhatsAppIcon size={16} className="text-[#25D366]" />
                                    <span className="hidden sm:inline">WA Chat</span>
                                </button>
                                <button 
                                    onClick={() => {
                                        if (contact.phone) {
                                            setIsCallActive(true);
                                            makeCall(contact.phone, true);
                                        }
                                    }}
                                    className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 bg-[#25D366] text-white rounded-md font-medium hover:bg-[#20b958] shadow-sm transition-colors text-sm"
                                    title="WhatsApp Voice Call"
                                >
                                    <Phone size={14} fill="currentColor" />
                                    <span className="hidden sm:inline">WA Call</span>
                                </button>
                                <button 
                                    onClick={() => contact.email && (window.location.href = `mailto:${contact.email}`)}
                                    className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 bg-white border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 shadow-sm transition-colors text-sm"
                                >
                                    <Mail size={16} className="text-gray-500" />
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

                                    <div className="border-t border-gray-100" />

                                    {/* Quick Send Template */}
                                    <section>
                                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                            <MessageSquare size={16} className="text-[#25D366]" />
                                            Send WhatsApp Template
                                        </h3>
                                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                            <div className="flex gap-2">
                                                <div className="relative flex-1">
                                                    <select 
                                                        value={selectedTemplate}
                                                        onChange={(e) => setSelectedTemplate(e.target.value)}
                                                        className="w-full h-10 pl-3 pr-10 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-ghl-blue"
                                                    >
                                                        <option value="">Select a template to send...</option>
                                                        {MESSAGE_TEMPLATES.map(t => (
                                                            <option key={t.id} value={t.id}>{t.name} ({t.category})</option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                </div>
                                                <button 
                                                    disabled={!selectedTemplate || isSending}
                                                    onClick={() => {
                                                        setIsSending(true);
                                                        setTimeout(() => {
                                                            setIsSending(false);
                                                            setSelectedTemplate('');
                                                        }, 1000);
                                                    }}
                                                    className="px-4 h-10 bg-[#25D366] text-white rounded-lg text-sm font-medium hover:bg-[#128C7E] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors shadow-sm"
                                                >
                                                    {isSending ? <Clock size={16} className="animate-spin" /> : <Send size={16} />}
                                                    Send
                                                </button>
                                            </div>
                                            {selectedTemplate && (
                                                <div className="mt-3 p-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-600">
                                                    <p className="whitespace-pre-wrap">{MESSAGE_TEMPLATES.find(t => t.id === selectedTemplate)?.preview}</p>
                                                </div>
                                            )}
                                        </div>
                                    </section>

                                    <div className="border-t border-gray-100" />

                                    {/* Activity Timeline */}
                                    <section>
                                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                            <Activity size={16} className="text-ghl-blue" />
                                            Recent Activity
                                        </h3>
                                        <div className="space-y-4">
                                            {/* Dummy Timeline Items */}
                                            <div className="flex gap-4">
                                                <div className="mt-1">
                                                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                                        <Tag size={14} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">Added tag <span className="font-bold text-gray-700 bg-gray-100 px-1 rounded">lead</span></p>
                                                    <p className="text-xs text-gray-500 mt-0.5">Today at 10:45 AM</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="mt-1">
                                                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#25D366] flex items-center justify-center">
                                                        <MessageSquare size={14} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">WhatsApp message sent</p>
                                                    <p className="text-sm text-gray-600 mt-1 bg-gray-50 p-2 rounded border border-gray-100">"Hello! Welcome to our store..."</p>
                                                    <p className="text-xs text-gray-500 mt-1">Yesterday at 3:30 PM</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="mt-1">
                                                    <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                                                        <Plus size={14} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">Contact created</p>
                                                    <p className="text-xs text-gray-500 mt-0.5">{new Date(contact.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            )}

                            {activeTab === 'Notes' && (
                                <div className="space-y-6">
                                    <form onSubmit={handleAddNote} className="space-y-3">
                                        <textarea
                                            value={newNoteContent}
                                            onChange={(e) => setNewNoteContent(e.target.value)}
                                            placeholder="Write a note about this contact..."
                                            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-ghl-blue focus:border-ghl-blue outline-none resize-none text-sm"
                                        />
                                        <div className="flex justify-end">
                                            <button 
                                                type="submit"
                                                disabled={!newNoteContent.trim()}
                                                className="px-6 py-2 bg-ghl-blue text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
                                            >
                                                <FileText size={16} />
                                                Save Note
                                            </button>
                                        </div>
                                    </form>

                                    <div className="space-y-4">
                                        {notes.length === 0 ? (
                                            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                                <div className="inline-block p-3 bg-white rounded-full mb-3 shadow-sm">
                                                    <FileText size={24} className="text-gray-400" />
                                                </div>
                                                <p className="font-medium text-gray-900 mb-1">No notes yet</p>
                                                <p className="text-sm">Write your first note above to keep track of details.</p>
                                            </div>
                                        ) : (
                                            notes.map(note => (
                                                <div key={note.id} className="bg-yellow-50/50 border border-yellow-100 p-4 rounded-xl shadow-sm relative group">
                                                    <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed pr-8">{note.content}</p>
                                                    <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                                                        <span className="flex items-center gap-1">
                                                            <Clock size={12} />
                                                            {new Date(note.createdAt).toLocaleString()}
                                                        </span>
                                                        <button 
                                                            onClick={() => deleteNote(note.id)}
                                                            className="text-gray-400 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100 p-1"
                                                            title="Delete Note"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Appointments' && (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-base font-semibold text-gray-900">Upcoming</h3>
                                        <button 
                                            onClick={() => setShowScheduleForm(prev => !prev)}
                                            className="px-4 py-2 bg-ghl-blue text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
                                        >
                                            <Plus size={16} />
                                            {showScheduleForm ? 'Cancel' : 'Schedule'}
                                        </button>
                                    </div>

                                    {/* Schedule Form */}
                                    {showScheduleForm && (
                                        <form onSubmit={handleAddAppointment} className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
                                            <h4 className="font-semibold text-gray-900 text-sm">New Appointment</h4>
                                            <input
                                                type="text"
                                                placeholder="Title (e.g. Follow-up Call)"
                                                value={newAppt.title}
                                                onChange={e => setNewAppt(p => ({ ...p, title: e.target.value }))}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghl-blue"
                                                required
                                            />
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="text-xs text-gray-500 font-medium mb-1 block">Date</label>
                                                    <input
                                                        type="date"
                                                        value={newAppt.date}
                                                        min={new Date().toISOString().split('T')[0]}
                                                        onChange={e => setNewAppt(p => ({ ...p, date: e.target.value }))}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghl-blue"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs text-gray-500 font-medium mb-1 block">Type</label>
                                                    <select
                                                        value={newAppt.type}
                                                        onChange={e => setNewAppt(p => ({ ...p, type: e.target.value }))}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghl-blue"
                                                    >
                                                        <option>Call</option>
                                                        <option>Meeting</option>
                                                        <option>Demo</option>
                                                        <option>Follow-up</option>
                                                        <option>Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="text-xs text-gray-500 font-medium mb-1 block">Start Time</label>
                                                    <input
                                                        type="time"
                                                        value={newAppt.startTime}
                                                        onChange={e => setNewAppt(p => ({ ...p, startTime: e.target.value }))}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghl-blue"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs text-gray-500 font-medium mb-1 block">End Time</label>
                                                    <input
                                                        type="time"
                                                        value={newAppt.endTime}
                                                        onChange={e => setNewAppt(p => ({ ...p, endTime: e.target.value }))}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghl-blue"
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full py-2.5 bg-ghl-blue text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
                                            >
                                                <CalendarClock size={16} />
                                                Confirm Appointment
                                            </button>
                                        </form>
                                    )}

                                    {/* Upcoming Appointments */}
                                    <div className="space-y-3">
                                        {appointments.filter(a => new Date(a.date) >= new Date(new Date().toDateString())).length === 0 ? (
                                            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                                <p className="text-sm">No upcoming appointments. Click Schedule to add one!</p>
                                            </div>
                                        ) : (
                                            appointments
                                                .filter(a => new Date(a.date) >= new Date(new Date().toDateString()))
                                                .sort((a, b) => a.date.localeCompare(b.date))
                                                .map(appt => (
                                                    <div key={appt.id} className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex items-start gap-4 group">
                                                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                                                            <span className="text-xs font-bold uppercase">{new Date(appt.date + 'T12:00:00').toLocaleString('default', { month: 'short' })}</span>
                                                            <span className="text-lg font-bold leading-tight">{new Date(appt.date + 'T12:00:00').getDate()}</span>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <h4 className="font-semibold text-gray-900">{appt.title}</h4>
                                                                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                                                        <Clock size={13} /> {appt.startTime}{appt.endTime ? ` - ${appt.endTime}` : ''} · {appt.type}
                                                                    </p>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
                                                                        appt.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                                        appt.status === 'Cancelled' ? 'bg-red-50 text-red-600 border-red-100' :
                                                                        'bg-amber-50 text-amber-700 border-amber-100'
                                                                    }`}>{appt.status}</span>
                                                                    <button onClick={() => deleteAppointment(appt.id)} className="p-1 text-gray-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100">
                                                                        <Trash2 size={14} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                        )}
                                    </div>

                                    {/* Past Appointments */}
                                    {appointments.filter(a => new Date(a.date) < new Date(new Date().toDateString())).length > 0 && (
                                        <>
                                            <h3 className="text-base font-semibold text-gray-900 pt-4">Past Appointments</h3>
                                            <div className="space-y-3 opacity-75">
                                                {appointments
                                                    .filter(a => new Date(a.date) < new Date(new Date().toDateString()))
                                                    .map(appt => (
                                                        <div key={appt.id} className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex items-start gap-4 group">
                                                            <div className="w-12 h-12 bg-gray-200 text-gray-600 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                                                                <span className="text-xs font-bold uppercase">{new Date(appt.date + 'T12:00:00').toLocaleString('default', { month: 'short' })}</span>
                                                                <span className="text-lg font-bold leading-tight">{new Date(appt.date + 'T12:00:00').getDate()}</span>
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="flex justify-between items-start">
                                                                    <div>
                                                                        <h4 className="font-semibold text-gray-900">{appt.title}</h4>
                                                                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                                                            <CalendarClock size={13} /> Completed
                                                                        </p>
                                                                    </div>
                                                                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-100">Showed</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}

                            {activeTab === 'Documents' && (
                                <div className="space-y-4">
                                    {/* Hidden real file input */}
                                    <input 
                                        ref={fileInputRef}
                                        type="file" 
                                        className="hidden"
                                        onChange={handleFileUpload}
                                        accept="*/*"
                                    />

                                    {/* Upload Zone */}
                                    <div 
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 hover:border-ghl-blue transition-colors cursor-pointer group"
                                    >
                                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                            <UploadCloud size={24} />
                                        </div>
                                        <h3 className="text-sm font-semibold text-gray-900 mb-1">Upload Document</h3>
                                        <p className="text-xs text-gray-500">Drag and drop files here, or click to browse</p>
                                    </div>

                                    {/* Document List */}
                                    <div className="space-y-3">
                                        {uploadedDocs.length === 0 ? (
                                            <div className="text-center py-8 text-gray-500">
                                                <p className="text-sm">No documents yet. Upload one above!</p>
                                            </div>
                                        ) : (
                                            uploadedDocs.map(doc => (
                                                <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all bg-white group">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                                            doc.name.endsWith('.pdf') ? 'bg-red-50 text-red-500' :
                                                            doc.name.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? 'bg-purple-50 text-purple-500' :
                                                            'bg-blue-50 text-blue-500'
                                                        }`}>
                                                            {doc.name.endsWith('.pdf') ? <FileText size={20} /> : <FilePlus size={20} />}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                                                            <p className="text-xs text-gray-500">{doc.size} • Uploaded {doc.uploadedAt}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button 
                                                            title="Download"
                                                            className="p-2 text-gray-400 hover:text-ghl-blue hover:bg-blue-50 rounded-lg transition-colors"
                                                        >
                                                            <Download size={16} />
                                                        </button>
                                                        <button 
                                                            title="Delete"
                                                            onClick={() => deleteDoc(doc.id)}
                                                            className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
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
                        {/* Slide-over toast notification */}
                        {slideToast && (
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-medium z-10 whitespace-nowrap">
                                {slideToast}
                            </div>
                        )}
                    </>
                )}
            </div>

            <ActiveCallOverlay 
                isOpen={isCallActive} 
                onClose={() => setIsCallActive(false)} 
                contactName={contact?.name} 
                phoneNumber={contact?.phone} 
                isWhatsApp={true} 
            />
        </div>
    );
};

export default ContactDetailSlideOver;
