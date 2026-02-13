import { useState, useEffect } from 'react';
import { X, Plus, Trash2, GripVertical, PieChart, Funnel } from 'lucide-react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Pipeline, Stage } from '../../context/PipelineContext';

interface PipelineModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (name: string, stages: Stage[]) => void;
    initialData?: Pipeline | null;
}

interface SortableStageItemProps {
    stage: Stage;
    onDelete: (id: string) => void;
    onUpdate: (id: string, field: keyof Stage, value: string | number | boolean) => void;
}

const SortableStageItem = ({ stage, onDelete, onUpdate }: SortableStageItemProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: stage.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-md mb-2 group hover:border-ghl-blue transition-colors"
        >
            <div {...attributes} {...listeners} className="cursor-grab text-gray-400 hover:text-gray-600">
                <GripVertical size={20} />
            </div>

            <div className="flex-1">
                <input
                    type="text"
                    value={stage.name}
                    onChange={(e) => onUpdate(stage.id, 'name', e.target.value)}
                    className="w-full px-2 py-1 border-transparent hover:border-gray-300 focus:border-ghl-blue border rounded outline-none text-sm font-medium"
                    placeholder="Stage Name"
                />
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onUpdate(stage.id, 'showInPieChart', !stage.showInPieChart)}
                    className={`p-1 rounded hover:bg-gray-100 ${stage.showInPieChart ? 'text-ghl-blue' : 'text-gray-300'}`}
                    title="Show in Pie Chart"
                >
                    <PieChart size={18} />
                </button>
                <button
                    onClick={() => onUpdate(stage.id, 'showInFunnel', !stage.showInFunnel)}
                    className={`p-1 rounded hover:bg-gray-100 ${stage.showInFunnel ? 'text-ghl-blue' : 'text-gray-300'}`}
                    title="Show in Funnel"
                >
                    <Funnel size={18} />
                </button>
                <button
                    onClick={() => onDelete(stage.id)}
                    className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};

const PipelineModal = ({ isOpen, onClose, onSave, initialData }: PipelineModalProps) => {
    const [name, setName] = useState('');
    const [stages, setStages] = useState<Stage[]>([]);
    const [newStageName, setNewStageName] = useState('');

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setStages(initialData.stages);
        } else {
            setName('');
            setStages([
                { id: '1', name: 'Stage 1', position: 0, showInFunnel: true, showInPieChart: true },
                { id: '2', name: 'Stage 2', position: 1, showInFunnel: true, showInPieChart: true },
            ]);
        }
    }, [initialData, isOpen]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setStages((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleAddStage = () => {
        if (!newStageName.trim()) return;

        const newStage: Stage = {
            id: Math.random().toString(36).substr(2, 9),
            name: newStageName,
            position: stages.length,
            showInFunnel: true,
            showInPieChart: true,
        };

        setStages([...stages, newStage]);
        setNewStageName('');
    };

    const handleDeleteStage = (id: string) => {
        setStages(stages.filter(s => s.id !== id));
    };

    const handleUpdateStage = (id: string, field: keyof Stage, value: string | number | boolean) => {
        setStages(stages.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const handleSaveInternal = () => {
        if (!name.trim()) return;
        // Update positions based on current order
        const updatedStages = stages.map((s, index) => ({ ...s, position: index }));
        onSave(name, updatedStages);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {initialData ? 'Edit Pipeline' : 'Create New Pipeline'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pipeline Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-ghl-blue outline-none"
                            placeholder="e.g. Sales Pipeline"
                        />
                    </div>

                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700">Pipeline Stages</label>
                            <div className="flex gap-2 text-xs text-gray-500">
                                <span className="flex items-center gap-1"><PieChart size={14} /> Pie Chart</span>
                                <span className="flex items-center gap-1"><Funnel size={14} /> Funnel</span>
                            </div>
                        </div>

                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={stages}
                                strategy={verticalListSortingStrategy}
                            >
                                <div className="space-y-2">
                                    {stages.map((stage) => (
                                        <SortableStageItem
                                            key={stage.id}
                                            stage={stage}
                                            onDelete={handleDeleteStage}
                                            onUpdate={handleUpdateStage}
                                        />
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    </div>

                    <div className="flex gap-2 mt-4">
                        <input
                            type="text"
                            value={newStageName}
                            onChange={(e) => setNewStageName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddStage()}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-ghl-blue outline-none text-sm"
                            placeholder="Add new stage"
                        />
                        <button
                            onClick={handleAddStage}
                            disabled={!newStageName.trim()}
                            className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            <Plus size={18} />
                            Add Stage
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 bg-gray-50 rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-white transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveInternal}
                        disabled={!name.trim() || stages.length === 0}
                        className="px-4 py-2 bg-ghl-blue text-white font-medium rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PipelineModal;
