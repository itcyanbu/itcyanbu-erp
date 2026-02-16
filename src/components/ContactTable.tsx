import React from 'react';
import { Mail, Pencil, Trash2 } from 'lucide-react';
import { useContacts } from '../context/ContactContext';
import type { Contact } from '../types/contact';

import type { ColumnDef } from './ColumnManager';

interface ContactTableProps {
    data: Contact[];
    columns: ColumnDef[];
    onEdit: (contact: Contact) => void;
    onRowClick: (contact: Contact) => void;
    selectedIds?: Set<string>;
    onSelectionChange?: (id: string) => void;
    onSelectAll?: (ids: string[]) => void;
}

const ContactTable: React.FC<ContactTableProps> = ({
    data,
    columns,
    onEdit,
    onRowClick,
    selectedIds = new Set(),
    onSelectionChange = () => { },
    onSelectAll = () => { }
}) => {
    const { deleteContact } = useContacts();

    // Use passed data directly - filtering happens in parent
    const allSelected = data.length > 0 && data.every(c => selectedIds.has(c.id));
    const someSelected = data.some(c => selectedIds.has(c.id));

    const formatDate = (dateString: string) => {
        try {
            if (!dateString || dateString === '-') return '-';
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '-';
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            });
        } catch (e) {
            console.error('Error formatting date:', dateString, e);
            return '-';
        }
    };

    const renderCell = (contact: Contact, columnId: string) => {
        switch (columnId) {
            case 'name':
                return (
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${contact.avatarColor}`}>
                            {contact.initials}
                        </div>
                        <div>
                            <div className="font-medium text-ghl-text">{contact.name}</div>
                        </div>
                    </div>
                );
            case 'phone':
                return (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        {contact.phone}
                    </div>
                );
            case 'email':
                return (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail size={14} className="text-gray-400" />
                        {contact.email}
                    </div>
                );
            case 'created':
                return <span className="text-sm text-gray-600">{formatDate(contact.createdAt)}</span>;
            case 'last_activity':
                const activity = contact.lastActivity || contact.last_activity;
                return <span className="text-sm text-gray-600">{activity ? formatDate(activity) : '-'}</span>;
            case 'tags':
                return (
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {contact.tags.map(tag => (
                            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize border border-gray-200">
                                {tag}
                            </span>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    const visibleColumns = columns.filter(col => col.visible);

    return (
        <div className="bg-white border border-ghl-border rounded-lg overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-ghl-border text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            <th className="p-4 w-10">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-ghl-blue focus:ring-ghl-blue"
                                    checked={allSelected}
                                    ref={input => {
                                        if (input) {
                                            input.indeterminate = someSelected && !allSelected;
                                        }
                                    }}
                                    onChange={() => onSelectAll(data.map(c => c.id))}
                                />
                            </th>
                            {visibleColumns.map(col => (
                                <th key={col.id} className="p-4">{col.label}</th>
                            ))}
                            <th className="p-4 w-20"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-ghl-border">
                        {data.map((contact) => (
                            <tr
                                key={contact.id}
                                onClick={() => onRowClick(contact)}
                                className={`hover:bg-gray-50 transition-colors group cursor-pointer ${selectedIds.has(contact.id) ? 'bg-purple-50 hover:bg-purple-100' : ''}`}
                            >
                                <td className="p-4" onClick={e => e.stopPropagation()}>
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-ghl-blue focus:ring-ghl-blue"
                                        checked={selectedIds.has(contact.id)}
                                        onChange={() => onSelectionChange(contact.id)}
                                    />
                                </td>
                                {visibleColumns.map(col => (
                                    <td key={col.id} className="p-4">
                                        {renderCell(contact, col.id)}
                                    </td>
                                ))}
                                <td className="p-4 text-right" onClick={e => e.stopPropagation()}>
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => onEdit(contact)}
                                            className="p-1.5 text-gray-400 hover:text-ghl-blue hover:bg-blue-50 rounded transition-colors"
                                            title="Edit"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => deleteContact(contact.id)}
                                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {data.length === 0 && (
                            <tr>
                                <td colSpan={visibleColumns.length + 2} className="p-8 text-center text-gray-500">
                                    No contacts found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContactTable;
