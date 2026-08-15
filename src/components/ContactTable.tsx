import React from 'react';
import { Mail, Pencil, Trash2, Phone, Tag } from 'lucide-react';
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
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shadow-sm ${contact.avatarColor || 'bg-gray-100 text-gray-600'}`}>
                            {contact.initials || '??'}
                        </div>
                        <div>
                            <div className="font-semibold text-gray-900 text-[13px] leading-tight">{contact.name || ''}</div>
                        </div>
                    </div>
                );
            case 'phone':
                return contact.phone ? (
                    <div className="flex items-center gap-2 text-[13px] text-gray-700">
                        <Phone size={13} className="text-gray-400 flex-shrink-0" />
                        <span className="font-mono tracking-tight">{contact.phone}</span>
                    </div>
                ) : <span className="text-gray-300 text-sm">—</span>;
            case 'email':
                return contact.email ? (
                    <div className="flex items-center gap-2 text-[13px] text-gray-700">
                        <Mail size={13} className="text-gray-400 flex-shrink-0" />
                        <span className="truncate max-w-[180px]">{contact.email}</span>
                    </div>
                ) : <span className="text-gray-300 text-sm">—</span>;
            case 'created':
                return <span className="text-[13px] text-gray-500 tabular-nums">{formatDate(contact.createdAt)}</span>;
            case 'last_activity':
                const activity = contact.lastActivity || contact.last_activity;
                return <span className="text-[13px] text-gray-500 tabular-nums">{activity ? formatDate(activity) : '—'}</span>;
            case 'tags':
                return (
                    <div className="flex flex-wrap gap-1.5 max-w-[220px]">
                        {(contact.tags || []).length > 0 ? contact.tags.map(tag => (
                            <span key={tag} className="inline-flex items-center gap-1 text-xs font-medium bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-100">
                                <Tag size={10} className="text-blue-400" />
                                {tag}
                            </span>
                        )) : <span className="text-gray-300 text-sm">—</span>}
                    </div>
                );
            case 'company':
                return <span className="text-[13px] text-gray-700 font-medium">{contact.company || '—'}</span>;
            case 'status':
                const st = contact.status || 'Active';
                let colorClass = 'bg-gray-100 text-gray-700';
                if (st === 'Active') colorClass = 'bg-green-100 text-green-700 border border-green-200';
                if (st === 'Leads') colorClass = 'bg-blue-100 text-blue-700 border border-blue-200';
                if (st === 'Inactive') colorClass = 'bg-orange-100 text-orange-700 border border-orange-200';
                if (st === 'Blocked') colorClass = 'bg-red-100 text-red-700 border border-red-200';
                return <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${colorClass}`}>{st}</span>;
            case 'assignee':
                return <span className="text-[13px] text-gray-700">{contact.assignee || '—'}</span>;
            default:
                // Dynamic rendering for any other field
                const value = contact[columnId as keyof Contact];
                if (value === undefined || value === null) return <span className="text-gray-300">—</span>;
                if (typeof value === 'boolean') return <span className="text-[13px] text-gray-600">{value ? 'Yes' : 'No'}</span>;
                return <span className="text-[13px] text-gray-600 truncate max-w-[150px]" title={String(value)}>{String(value)}</span>;
        }
    };

    const visibleColumns = columns.filter(col => col.visible);

    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/80 border-b border-gray-200">
                            <th className="px-4 py-3 w-10">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-ghl-blue focus:ring-ghl-blue w-4 h-4"
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
                                <th key={col.id} className="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    {col.label}
                                </th>
                            ))}
                            <th className="px-4 py-3 w-20"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((contact, index) => (
                            <tr
                                key={contact.id}
                                onClick={() => onRowClick(contact)}
                                className={`
                                    transition-colors group cursor-pointer
                                    ${selectedIds.has(contact.id) 
                                        ? 'bg-blue-50/60 hover:bg-blue-50' 
                                        : 'hover:bg-gray-50/70'
                                    }
                                    ${index !== data.length - 1 ? 'border-b border-gray-100' : ''}
                                `}
                            >
                                <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-ghl-blue focus:ring-ghl-blue w-4 h-4"
                                        checked={selectedIds.has(contact.id)}
                                        onChange={() => onSelectionChange(contact.id)}
                                    />
                                </td>
                                {visibleColumns.map(col => (
                                    <td key={col.id} className="px-4 py-3.5">
                                        {renderCell(contact, col.id)}
                                    </td>
                                ))}
                                <td className="px-4 py-3.5 text-right" onClick={e => e.stopPropagation()}>
                                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => onEdit(contact)}
                                            className="p-1.5 text-gray-400 hover:text-ghl-blue hover:bg-blue-50 rounded-md transition-colors"
                                            title="Edit"
                                        >
                                            <Pencil size={15} />
                                        </button>
                                        <button
                                            onClick={() => deleteContact(contact.id)}
                                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {data.length === 0 && (
                            <tr>
                                <td colSpan={visibleColumns.length + 2} className="px-6 py-16 text-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                            <Mail size={20} className="text-gray-400" />
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">No contacts found</p>
                                        <p className="text-xs text-gray-500">Try adjusting your filters or add a new contact.</p>
                                    </div>
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
