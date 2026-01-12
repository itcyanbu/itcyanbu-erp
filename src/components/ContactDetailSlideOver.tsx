import React, { useState } from 'react';
import { X, Phone, Mail, MessageSquare, Calendar, Clock, Tag, MoreHorizontal } from 'lucide-react';
import type { Contact } from '../types/contact';

interface ContactDetailSlideOverProps {
    contact: Contact | null;
    isOpen: boolean;
    onClose: () => void;
    onEdit: (contact: Contact) => void;
}

const ContactDetailSlideOver: React.FC<ContactDetailSlideOverProps> = ({ contact, isOpen, onClose, onEdit }) => {
    const [activeTab, setActiveTab] = useState('Overview');

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
                                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 shadow-sm transition-colors">
                                    <Phone size={18} className="text-gray-500" />
                                    Call
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 shadow-sm transition-colors">
                                    <MessageSquare size={18} className="text-gray-500" />
                                    SMS
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 shadow-sm transition-colors">
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

                            {activeTab !== 'Overview' && (
                                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                    <div className="p-4 bg-gray-50 rounded-full mb-4">
                                        <Clock size={32} className="text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-1">Coming Soon</h3>
                                    <p className="text-center max-w-xs">The {activeTab} feature is currently under development.</p>
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
