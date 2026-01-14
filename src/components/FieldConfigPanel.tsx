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
import { GripVertical, Eye, EyeOff, CheckSquare, Square } from 'lucide-react';
import type { FieldConfig } from '../types/contact';

interface SortableItemProps {
    field: FieldConfig;
    onToggleVisible: (id: string) => void;
    onToggleRequired: (id: string) => void;
}

const SortableItem = ({ field, onToggleVisible, onToggleRequired }: SortableItemProps) => {
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
        zIndex: transform ? 9999 : 'auto', // Keep dragged item on top
        position: 'relative' as 'relative', // Fix type inference
    };

    return (
        <div ref={setNodeRef} style={style} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md mb-2 shadow-sm">
            <div className="flex items-center gap-3">
                <div {...attributes} {...listeners} className="cursor-grab text-gray-400 hover:text-gray-600">
                    <GripVertical size={20} />
                </div>
                <span className="font-medium text-gray-700">{field.label}</span>
                {field.isSystem && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">System</span>}
            </div>

            <div className="flex items-center gap-4">
                {/* Required Toggle */}
                <button
                    onClick={() => onToggleRequired(field.id)}
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-ghl-blue disabled:opacity-50"
                    disabled={field.id === 'firstName'} // Mandatory
                    title={field.required ? "Make optional" : "Make required"}
                >
                    {field.required ? <CheckSquare size={18} className="text-ghl-blue" /> : <Square size={18} />}
                    <span className="hidden sm:inline">Required</span>
                </button>

                {/* Visible Toggle */}
                <button
                    onClick={() => onToggleVisible(field.id)}
                    className={`p-1 rounded-md ${field.visible ? 'text-gray-600 hover:text-ghl-blue' : 'text-gray-400'}`}
                    title={field.visible ? "Hide field" : "Show field"}
                >
                    {field.visible ? <Eye size={20} /> : <EyeOff size={20} />}
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
    const [items, setItems] = useState(currentConfig);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                const newOrder = arrayMove(items, oldIndex, newIndex);

                // Update order property
                return newOrder.map((item, index) => ({ ...item, order: index }));
            });
        }
    };

    const toggleVisible = (id: string) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, visible: !item.visible } : item
        ));
    };

    const toggleRequired = (id: string) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, required: !item.required } : item
        ));
    };

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <div className="px-6 py-4 border-b border-gray-200 bg-white">
                <h3 className="text-lg font-semibold text-gray-900">Customize Form Layout</h3>
                <p className="text-sm text-gray-500">Drag to reorder, toggle visibility, and set required fields.</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={items.map(i => i.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {items.map((field) => (
                            <SortableItem
                                key={field.id}
                                field={field}
                                onToggleVisible={toggleVisible}
                                onToggleRequired={toggleRequired}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
            </div>

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
                    Save Layout
                </button>
            </div>
        </div>
    );
};

export default FieldConfigPanel;
