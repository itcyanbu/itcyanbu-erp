import React, { useState, useMemo } from 'react';
import {
    Search, X, GripVertical, Check, ChevronRight, ChevronDown,
    Plus, Lock
} from 'lucide-react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { type ColumnDef } from './ColumnManager';

interface SortableItemProps {
    id: string;
    label: string;
    visible: boolean;
    onToggle: () => void;
    isLocked?: boolean;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, label, visible, onToggle, isLocked }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={clsx(
                "flex items-center gap-2 py-2 group",
                isDragging && "opacity-50"
            )}
        >
            <div
                {...attributes}
                {...listeners}
                className={clsx(
                    "p-1 cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 transition-colors",
                    isLocked && "invisible"
                )}
            >
                <GripVertical size={16} />
            </div>

            <button
                onClick={!isLocked ? onToggle : undefined}
                className={clsx(
                    "w-4 h-4 rounded border flex items-center justify-center transition-all",
                    visible ? "bg-ghl-blue border-ghl-blue" : "border-gray-300 bg-white",
                    isLocked && "opacity-50 cursor-not-allowed"
                )}
            >
                {visible && <Check size={12} className="text-white" />}
            </button>

            <span className={clsx(
                "text-[14px] font-medium flex-1",
                visible ? "text-gray-900" : "text-gray-400"
            )}>
                {label}
            </span>

            {isLocked && <Lock size={14} className="text-gray-400" />}
        </div>
    );
};

interface ManageFieldsSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    columns: ColumnDef[];
    setColumns: (columns: ColumnDef[]) => void;
}

const FIELD_CATEGORIES = [
    { name: 'Contact', fields: ['First Name', 'Last Name', 'Full Name', 'Email', 'Phone', 'Address', 'City', 'State'] },
    { name: 'General Info', fields: ['Source', 'Type', 'Website', 'Industry'] },
    { name: 'Additional Info', fields: ['Birthdate', 'Anniversary'] },
    { name: 'Spotlight Sessions', fields: ['Last Session', 'Next Session'] },
    { name: 'Quiz | Quiz 0', fields: ['Quiz Score', 'Quiz Date'] },
    { name: 'URL Redirect Idea', fields: ['Source URL', 'Target URL'] },
    { name: 'Form | Contact Us', fields: ['Submission Date', 'Message'] },
];

export const ManageFieldsSidebar: React.FC<ManageFieldsSidebarProps> = ({ isOpen, onClose, columns, setColumns }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
    const [tempColumns, setTempColumns] = useState<ColumnDef[]>([]);

    React.useEffect(() => {
        if (isOpen) {
            setTempColumns([...columns]);
        }
    }, [isOpen, columns]);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setTempColumns((items) => {
                const oldIndex = items.findIndex((i) => i.id === active.id);
                const newIndex = items.findIndex((i) => i.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const toggleVisibility = (id: string) => {
        if (id === 'name') return; // Locked
        setTempColumns(prev => prev.map(col =>
            col.id === id ? { ...col, visible: !col.visible } : col
        ));
    };

    const toggleCategory = (name: string) => {
        const newSet = new Set(expandedCategories);
        if (newSet.has(name)) newSet.delete(name);
        else newSet.add(name);
        setExpandedCategories(newSet);
    };

    const getFieldId = (label: string) => {
        if (label === 'Full Name') return 'name';
        return label.toLowerCase().replace(/\s+/g, '_');
    };

    const isFieldVisible = (label: string) => {
        const id = getFieldId(label);
        return tempColumns.some(c => c.id === id && c.visible);
    };

    const handleFieldToggle = (label: string) => {
        const id = getFieldId(label);
        if (id === 'name') return; // Locked

        setTempColumns(prev => {
            const index = prev.findIndex(c => c.id === id);
            if (index > -1) {
                return prev.map((c, i) => i === index ? { ...c, visible: !c.visible } : c);
            } else {
                return [...prev, { id, label, visible: true }];
            }
        });
    };

    const filteredCategories = useMemo(() => {
        if (!searchQuery) return FIELD_CATEGORIES;
        const query = searchQuery.toLowerCase();
        return FIELD_CATEGORIES.map(cat => ({
            ...cat,
            fields: cat.fields.filter(f => f.toLowerCase().includes(query))
        })).filter(cat => cat.fields.length > 0);
    }, [searchQuery]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Sidebar */}
            <div className="relative w-[400px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-[20px] font-black text-gray-900">Manage Fields</h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <X size={24} className="text-gray-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto no-scrollbar">
                    {/* Search */}
                    <div className="px-6 py-5">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search Field"
                                className="w-full h-11 pl-10 pr-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-[15px] font-medium placeholder:text-gray-300"
                            />
                        </div>
                    </div>

                    {/* Fields in Table */}
                    <div className="px-6 mb-8">
                        <h3 className="text-[14px] font-bold text-gray-400 uppercase tracking-wider mb-3">Fields in Table</h3>
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={tempColumns.map(c => c.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <div className="space-y-1">
                                    {tempColumns.map(col => (
                                        <SortableItem
                                            key={col.id}
                                            id={col.id}
                                            label={col.label}
                                            visible={col.visible}
                                            onToggle={() => toggleVisibility(col.id)}
                                            isLocked={col.id === 'name'}
                                        />
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    </div>

                    {/* Add Fields */}
                    <div className="px-6 pb-24">
                        <h3 className="text-[14px] font-bold text-gray-400 uppercase tracking-wider mb-3">Add Fields</h3>
                        <div className="divide-y divide-gray-50 border-t border-gray-50">
                            {filteredCategories.map(cat => (
                                <div key={cat.name} className="py-1">
                                    <button
                                        onClick={() => toggleCategory(cat.name)}
                                        className="w-full flex items-center justify-between py-3 hover:bg-gray-50 px-2 -mx-2 rounded-lg transition-colors group"
                                    >
                                        <span className="text-[15px] font-bold text-gray-700 group-hover:text-gray-900">{cat.name}</span>
                                        {expandedCategories.has(cat.name) ? <ChevronDown size={18} className="text-gray-400" /> : <ChevronRight size={18} className="text-gray-400" />}
                                    </button>
                                    {expandedCategories.has(cat.name) && (
                                        <div className="pl-4 pr-2 pb-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
                                            {cat.fields.map(field => {
                                                const visible = isFieldVisible(field);
                                                const isLocked = getFieldId(field) === 'name';

                                                return (
                                                    <button
                                                        key={field}
                                                        onClick={() => handleFieldToggle(field)}
                                                        className={clsx(
                                                            "w-full flex items-center gap-3 py-2 px-2 rounded-lg transition-colors text-left",
                                                            isLocked ? "cursor-not-allowed opacity-60" : "hover:bg-gray-50"
                                                        )}
                                                    >
                                                        <div className={clsx(
                                                            "w-4 h-4 rounded border flex items-center justify-center transition-all",
                                                            visible ? "bg-ghl-blue border-ghl-blue" : "border-gray-300 bg-white"
                                                        )}>
                                                            {visible && <Check size={12} className="text-white" />}
                                                        </div>
                                                        <span className={clsx(
                                                            "text-[14px] font-medium",
                                                            visible ? "text-gray-900" : "text-gray-500"
                                                        )}>
                                                            {field}
                                                        </span>
                                                        {isLocked && <Lock size={12} className="text-gray-400 ml-auto" />}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
                    <button className="text-ghl-blue text-[15px] font-black hover:underline flex items-center gap-1">
                        <Plus size={16} />
                        Add Custom Field
                    </button>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 text-[15px] font-black text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                setColumns(tempColumns);
                                onClose();
                            }}
                            className="px-8 py-2.5 bg-ghl-blue text-white text-[15px] font-black rounded-xl hover:bg-blue-600 shadow-lg shadow-blue-500/30 transition-all active:scale-95"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
