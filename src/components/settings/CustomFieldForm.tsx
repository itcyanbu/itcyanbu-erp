import React, { useState } from 'react';
import { X, Trash2, Plus, GripVertical } from 'lucide-react';
import type { FieldConfig } from '../../types/contact';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface CustomFieldFormProps {
    onClose: () => void;
    onSave: (field: FieldConfig) => void;
}

interface OptionItem {
    id: string;
    label: string;
    value: string;
}

// Sortable Option Item Component
const SortableOptionItem = ({ id, option, onChange, onDelete }: { id: string, option: OptionItem, onChange: (id: string, field: 'label' | 'value', val: string) => void, onDelete: (id: string) => void }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className="flex items-center gap-2 mb-2 bg-white p-2 border border-gray-200 rounded-md">
            <button type="button" className="cursor-grab text-gray-400 hover:text-gray-600" {...attributes} {...listeners}>
                <GripVertical size={16} />
            </button>
            <div className="flex-1">
                <input
                    type="text"
                    value={option.label}
                    onChange={(e) => onChange(id, 'label', e.target.value)}
                    placeholder="Option Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-ghl-blue focus:border-ghl-blue text-sm"
                />
            </div>
            <div className="flex-1">
                <input
                    type="text"
                    value={option.value}
                    onChange={(e) => onChange(id, 'value', e.target.value)}
                    placeholder="Option Value"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-ghl-blue focus:border-ghl-blue text-sm"
                />
            </div>
            <button type="button" onClick={() => onDelete(id)} className="text-gray-400 hover:text-red-500">
                <Trash2 size={16} />
            </button>
        </div>
    );
};

const CustomFieldForm: React.FC<CustomFieldFormProps> = ({ onClose, onSave }) => {
    const [name, setName] = useState('');
    const [objectType, setObjectType] = useState('contact');
    const [group, setGroup] = useState('general_info');
    const [type, setType] = useState<FieldConfig['type']>('text');

    // For Select types
    const [options, setOptions] = useState<OptionItem[]>([
        { id: '1', label: '', value: '' }
    ]);



    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Generate specific type text for the header
    const getTypeText = (t: string) => {
        switch (t) {
            case 'text': return 'Single Line';
            case 'select': return 'Dropdown (Multiple)'; // The screenshot says Dropdown (Multiple) but often means Select. We'll stick to 'select' mapping.
            case 'checkbox': return 'Checkbox';
            case 'date': return 'Date Picker';
            default: return t;
        }
    };

    const handleOptionChange = (id: string, field: 'label' | 'value', val: string) => {
        setOptions(prev => prev.map(opt => opt.id === id ? { ...opt, [field]: val } : opt));
    };

    const handleAddOption = () => {
        const newId = Math.random().toString(36).substr(2, 9);
        setOptions(prev => [...prev, { id: newId, label: '', value: '' }]);
    };

    const handleDeleteOption = (id: string) => {
        setOptions(prev => prev.filter(opt => opt.id !== id));
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setOptions((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name) return;

        // Generate ID from name
        const generatedId = name.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' + Math.random().toString(36).substr(2, 5);

        const newField: FieldConfig = {
            id: generatedId,
            label: name,
            type,
            required: false, // Defaulting to false as it's not in the main view
            visible: true,
            order: 9999,
            width: 'full',
            isSystem: false,
            group,
            objectType,
            options: type === 'select' ? options.filter(o => o.label).map(o => o.label) : undefined
        };

        onSave(newField);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                    {/* Header */}
                    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                            New Custom Field
                        </h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="px-8 py-6 bg-[#F9FAFB]">
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Field Selected</label>
                            <div className="bg-[#1F2937] text-white px-4 py-3 rounded-md flex justify-between items-center cursor-pointer shadow-sm">
                                <span className="font-medium">{getTypeText(type)}</span>
                                <span className="text-xs text-gray-400 hover:text-white" onClick={() => {
                                    // In a real app this would go back to type selection, 
                                    // here we just cycle simple types for demo
                                    const types: FieldConfig['type'][] = ['text', 'select', 'date', 'checkbox'];
                                    const idx = types.indexOf(type);
                                    setType(types[(idx + 1) % types.length]);
                                }}>Change</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                            <form id="create-field-form" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                            Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-ghl-blue focus:border-ghl-blue placeholder-gray-400"
                                            placeholder="Field Name"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                            Object
                                        </label>
                                        <select
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-ghl-blue focus:border-ghl-blue bg-white"
                                            value={objectType}
                                            onChange={e => setObjectType(e.target.value)}
                                            disabled
                                        >
                                            <option value="contact">Contact</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                        Group
                                    </label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-ghl-blue focus:border-ghl-blue bg-white"
                                        value={group}
                                        onChange={e => setGroup(e.target.value)}
                                    >
                                        <option value="general_info">General Info</option>
                                        <option value="contact_info">Contact Info</option>
                                        <option value="additional_info">Additional Info</option>
                                    </select>
                                </div>

                                {type === 'select' && (
                                    <div className="mb-6">
                                        <div className="flex justify-between items-center mb-2 px-2">
                                            <span className="text-xs font-bold text-gray-400 uppercase">Option Name</span>
                                            <span className="text-xs font-bold text-gray-400 uppercase mr-12">Option Value</span>
                                            <span className="text-xs font-bold text-gray-400 uppercase">Action</span>
                                        </div>

                                        <DndContext
                                            sensors={sensors}
                                            collisionDetection={closestCenter}
                                            onDragEnd={handleDragEnd}
                                        >
                                            <SortableContext
                                                items={options.map(o => o.id)}
                                                strategy={verticalListSortingStrategy}
                                            >
                                                {options.map((option) => (
                                                    <SortableOptionItem
                                                        key={option.id}
                                                        id={option.id}
                                                        option={option}
                                                        onChange={handleOptionChange}
                                                        onDelete={handleDeleteOption}
                                                    />
                                                ))}
                                            </SortableContext>
                                        </DndContext>

                                        <button
                                            type="button"
                                            onClick={handleAddOption}
                                            className="mt-2 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 font-medium"
                                        >
                                            <Plus size={16} /> Add an option
                                        </button>
                                    </div>
                                )}

                                <div className="flex justify-center mt-8">
                                    <button
                                        type="button"
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                                    >
                                        <Plus size={14} /> Additional preferences
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            form="create-field-form"
                            className="px-6 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-sm"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomFieldForm;
