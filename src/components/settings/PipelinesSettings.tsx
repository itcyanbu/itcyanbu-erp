import { useState } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { usePipelines } from '../../context/PipelineContext';
import type { Pipeline, Stage } from '../../context/PipelineContext';
import PipelineModal from './PipelineModal';

const PipelinesSettings = () => {
    const { pipelines, addPipeline, updatePipeline, deletePipeline } = usePipelines();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPipeline, setEditingPipeline] = useState<Pipeline | null>(null);

    const filteredPipelines = pipelines.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreate = () => {
        setEditingPipeline(null);
        setIsModalOpen(true);
    };

    const handleEdit = (pipeline: Pipeline) => {
        setEditingPipeline(pipeline);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this pipeline?')) {
            deletePipeline(id);
        }
    };

    const handleSave = (name: string, stages: Stage[]) => {
        if (editingPipeline) {
            updatePipeline(editingPipeline.id, name, stages);
        } else {
            addPipeline(name, stages);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">Pipelines</h2>
                    <p className="text-sm text-gray-500">Create and manage your sales pipelines</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 px-4 py-2 bg-ghl-blue text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
                >
                    <Plus size={18} />
                    Create New Pipeline
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search pipelines..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-ghl-blue outline-none"
                        />
                    </div>
                </div>

                <div className="divide-y divide-gray-200">
                    <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="col-span-6">Name</div>
                        <div className="col-span-2 text-center">Stages</div>
                        <div className="col-span-2 text-center">Last Updated</div>
                        <div className="col-span-2 text-right">Actions</div>
                    </div>
                </div>

                <div className="divide-y divide-gray-200">
                    {filteredPipelines.length > 0 ? (
                        filteredPipelines.map((pipeline) => (
                            <div key={pipeline.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors">
                                <div className="col-span-6">
                                    <h3 className="text-sm font-medium text-gray-900">{pipeline.name}</h3>
                                </div>
                                <div className="col-span-2 text-center">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {pipeline.stages.length} Stages
                                    </span>
                                </div>
                                <div className="col-span-2 text-center text-sm text-gray-500">
                                    {new Date().toLocaleDateString()}
                                </div>
                                <div className="col-span-2 flex justify-end gap-2">
                                    <button
                                        onClick={() => handleEdit(pipeline)}
                                        className="p-1 text-gray-400 hover:text-ghl-blue transition-colors"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(pipeline.id)}
                                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="px-6 py-12 text-center">
                            <p className="text-gray-500 mb-2">No pipelines found</p>
                            <button
                                onClick={handleCreate}
                                className="text-ghl-blue font-medium hover:underline"
                            >
                                Create your first pipeline
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <PipelineModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingPipeline}
            />
        </div>
    );
};

export default PipelinesSettings;
