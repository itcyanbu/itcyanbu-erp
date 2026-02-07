import React, { useState } from 'react';
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
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, CheckSquare, Square, Trash2, Search, X, RotateCcw, MonitorPlay } from 'lucide-react';
import type { FieldConfig } from '../types/contact';

interface SortableItemProps {
    field: FieldConfig;
    onToggleRequired: (id: string) => void;
    onRemove: (id: string) => void;
}

const SortableItem = ({ field, onToggleRequired, onRemove }: SortableItemProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: field.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: transform ? 9999 : 'auto',
        position: 'relative' as const,
    };

    return (
        <div ref={setNodeRef} style={style} className="grid grid-cols-12 gap-4 items-center p-3 bg-white border border-gray-200 rounded-md mb-2 shadow-sm">
            <div className="col-span-5 flex items-center gap-3">
                <div {...attributes} {...listeners} className="cursor-grab text-gray-400 hover:text-gray-600">
                    <GripVertical size={20} />
                </div>
                <span className="font-medium text-gray-700 truncate" title={field.label}>{field.label}</span>
                {field.isSystem && <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded border border-gray-200">System</span>}
            </div>

            <div className="col-span-3 text-sm text-gray-500 capitalize">
                {field.type}
            </div>

            <div className="col-span-2 flex justify-center">
                <button
                    onClick={() => onToggleRequired(field.id)}
                    className="flex items-center justify-center gap-1 text-sm text-gray-600 hover:text-ghl-blue disabled:opacity-50"
                    disabled={field.id === 'firstName'}
                    title={field.required ? "Make optional" : "Make required"}
                >
                    {field.required ? <CheckSquare size={18} className="text-ghl-blue" /> : <Square size={18} />}
                </button>
            </div>

            <div className="col-span-2 flex justify-end">
                <button
                    onClick={() => onRemove(field.id)}
                    className="p-1 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50 transition-colors"
                    title="Remove from form"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};

interface FieldConfigPanelProps {
    currentConfig: FieldConfig[];
    onSave: (newConfig: FieldConfig[]) => void;
    onCancel: () => void;
}

const FieldConfigPanel: React.FC<FieldConfigPanelProps> = ({ currentConfig, onSave, onCancel }) => {
    const [items, setItems] = useState<FieldConfig[]>(currentConfig);
    const [showManageFields, setShowManageFields] = useState(false);
    const [manageSearch, setManageSearch] = useState('');

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex).map((item, index) => ({ ...item, order: index }));
            });
        }
    };

    const toggleRequired = (id: string) => {
        setItems(items.map(item => item.id === id ? { ...item, required: !item.required } : item));
    };

    const removeField = (id: string) => {
        setItems(items.map(item => item.id === id ? { ...item, visible: false } : item));
    };

    const toggleFieldVisibility = (id: string) => {
        setItems(items.map(item => item.id === id ? { ...item, visible: !item.visible } : item));
    };

    const resetToDefault = () => {
        if (confirm('Reset layout to default?')) {
            setItems(items.map(item => ({
                ...item,
                visible: !!item.isSystem,
                order: item.isSystem ? item.order : 99
            })));
        }
    };

    // Filter active fields for the sortable list
    const activeFields = items.filter(f => f.visible).sort((a, b) => a.order - b.order);

    // Group fields for Manage modal
    const messageFields = ['questions', 'dateOfBirth', 'marketingSource', 'message', 'budget', 'marketingStrategy', 'apptTime', 'contactMethod'];
    const availableFields = items.filter(f => f.label.toLowerCase().includes(manageSearch.toLowerCase()));

    const contactGroup = availableFields.filter(f => !messageFields.includes(f.id));
    const messageGroup = availableFields.filter(f => messageFields.includes(f.id));

    return (
        <div className="flex flex-col h-full bg-gray-50 relative">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-white space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Customize fields for Add Contact</h3>
                    <div className="flex items-center gap-2">
                        <button onClick={resetToDefault} className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                            <RotateCcw size={14} /> Reset to Default
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                            <MonitorPlay size={14} /> Preview
                        </button>
                        <button
                            onClick={() => setShowManageFields(true)}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-ghl-blue rounded hover:bg-blue-700 transition-colors"
                        >
                            Manage Fields
                        </button>
                    </div>
                </div>
                <p className="text-sm text-gray-500">Control which fields show up. Mark required, reorder, or remove.</p>

                {/* Search Bar Placeholder (Active Fields Search) */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search configured fields..."
                        className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-ghl-blue"
                    />
                </div>

                {/* Table Headers */}
                <div className="grid grid-cols-12 gap-4 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <div className="col-span-5">Field Name</div>
                    <div className="col-span-3">Field Type</div>
                    <div className="col-span-2 text-center">Required</div>
                    <div className="col-span-2 text-right">Action</div>
                </div>
            </div>

            {/* Sortable List */}
            <div className="flex-1 overflow-y-auto p-6 pt-2">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={activeFields.map(i => i.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {activeFields.map((field) => (
                            <SortableItem
                                key={field.id}
                                field={field}
                                onToggleRequired={toggleRequired}
                                onRemove={removeField}
                            />
                        ))}
                    </SortableContext>
                </DndContext>

                {activeFields.length === 0 && (
                    <div className="text-center py-12 text-gray-400 text-sm">
                        No fields visible. Click "Manage Fields" to add some.
                    </div>
                )}
            </div>

            {/* Footer Buttons */}
            <div className="bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3 rounded-b-lg">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    onClick={() => onSave(items)}
                    className="px-4 py-2 text-sm font-medium text-white bg-ghl-blue rounded-md hover:bg-blue-700 shadow-sm"
                >
                    Save
                </button>
            </div>

            {/* Manage Fields Slide-over/Modal */}
            {showManageFields && (
                <div className="absolute inset-0 z-50 bg-white flex flex-col animate-in fade-in slide-in-from-right duration-200">
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                        <h3 className="text-lg font-semibold text-gray-900">Manage Fields</h3>
                        <button onClick={() => setShowManageFields(false)} className="text-gray-400 hover:text-gray-600">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="p-4 border-b border-gray-200">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search fields..."
                                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-ghl-blue"
                                value={manageSearch}
                                onChange={e => setManageSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {/* Contact Group */}
                        {contactGroup.length > 0 && (
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Contact</h4>
                                <div className="space-y-2">
                                    {contactGroup.map(field => (
                                        <div key={field.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer" onClick={() => toggleFieldVisibility(field.id)}>
                                            <span className="text-sm text-gray-700">{field.label}</span>
                                            <input
                                                type="checkbox"
                                                checked={field.visible}
                                                onChange={() => { }} // handled by parent div click
                                                className="h-4 w-4 text-ghl-blue border-gray-300 rounded focus:ring-ghl-blue"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Message Group */}
                        {messageGroup.length > 0 && (
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Message</h4>
                                <div className="space-y-2">
                                    {messageGroup.map(field => (
                                        <div key={field.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer" onClick={() => toggleFieldVisibility(field.id)}>
                                            <span className="text-sm text-gray-700">{field.label}</span>
                                            <input
                                                type="checkbox"
                                                checked={field.visible}
                                                onChange={() => { }} // handled by parent div click
                                                className="h-4 w-4 text-ghl-blue border-gray-300 rounded focus:ring-ghl-blue"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="px-6 py-4 border-t border-gray-200 flex justify-end bg-gray-50">
                        <button
                            onClick={() => setShowManageFields(false)}
                            className="px-4 py-2 text-sm font-medium text-white bg-ghl-blue rounded-md hover:bg-blue-700 shadow-sm"
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FieldConfigPanel;
