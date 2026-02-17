import React from 'react';
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
import { GripVertical, X, Check } from 'lucide-react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export interface ColumnDef {
    id: string;
    label: string;
    visible: boolean;
}

interface ColumnManagerProps {
    isOpen: boolean;
    onClose: () => void;
    columns: ColumnDef[];
    setColumns: React.Dispatch<React.SetStateAction<ColumnDef[]>>;
}

const SortableItem = ({ id, label, visible, onToggle }: { id: string, label: string, visible: boolean, onToggle: () => void }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 0,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={clsx(
                "flex items-center gap-4 p-4 bg-white border rounded-xl mb-3 transition-all duration-200 group select-none",
                isDragging ? "shadow-2xl border-blue-400 scale-[1.02] cursor-grabbing" : "border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200"
            )}
        >
            <div
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 transition-colors"
            >
                <GripVertical size={20} strokeWidth={2.5} />
            </div>

            <label className="flex items-center gap-3 flex-1 cursor-pointer">
                <div className="relative flex items-center">
                    <input
                        type="checkbox"
                        checked={visible}
                        onChange={onToggle}
                        className="peer w-5 h-5 opacity-0 absolute cursor-pointer"
                    />
                    <div className={clsx(
                        "w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center",
                        visible ? "bg-blue-600 border-blue-600 shadow-sm shadow-blue-200" : "bg-white border-gray-300"
                    )}>
                        {visible && <Check size={14} className="text-white" strokeWidth={3} />}
                    </div>
                </div>
                <span className={clsx(
                    "text-sm font-bold transition-colors",
                    visible ? "text-gray-900" : "text-gray-400"
                )}>
                    {label}
                </span>
            </label>
        </div>
    );
};

export const ColumnManager: React.FC<ColumnManagerProps> = ({ isOpen, onClose, columns, setColumns }) => {
    const { t } = useTranslation();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setColumns((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over?.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const toggleVisibility = (id: string) => {
        setColumns(
            columns.map(col =>
                col.id === id ? { ...col, visible: !col.visible } : col
            )
        );
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden text-left rtl:text-right flex flex-col max-h-[80vh]">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h2 className="text-lg font-bold text-gray-900">{t('contacts.columns.manage_columns', 'Manage Columns')}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <p className="text-sm text-gray-500 mb-4">{t('contacts.columns.desc', 'Drag to reorder. Uncheck to hide.')}</p>

                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={columns.map(c => c.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {columns.map(col => (
                                <SortableItem
                                    key={col.id}
                                    id={col.id}
                                    label={col.label}
                                    visible={col.visible}
                                    onToggle={() => toggleVisibility(col.id)}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 text-sm font-bold bg-ghl-blue text-white rounded-lg hover:bg-blue-600 shadow-md transition-all active:scale-95"
                    >
                        {t('common.done', 'Done')}
                    </button>
                </div>
            </div>
        </div>
    );
};
