import { ArrowLeft, Play, Save, Settings, Plus, MousePointer2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WorkflowBuilder = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
            {/* Builder Header */}
            <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-10">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/automation')}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="font-bold text-gray-900">New Workflow</h1>
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded font-medium">Draft</span>
                        </div>
                        <p className="text-xs text-gray-500 hidden md:block">Last saved just now</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg flex items-center gap-2 border border-transparent hover:border-gray-200 transition-all">
                        <Settings size={16} />
                        Settings
                    </button>
                    <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg flex items-center gap-2 border border-transparent hover:border-gray-200 transition-all">
                        <Play size={16} />
                        Test
                    </button>
                    <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">
                        <Save size={16} />
                        Save
                    </button>
                </div>
            </header>

            {/* Builder Canvas Area */}
            <div className="flex-1 relative overflow-hidden flex">
                {/* Canvas Background */}
                <div className="absolute inset-0 bg-[#F3F4F6] overflow-auto flex justify-center p-10 cursor-grab active:cursor-grabbing">
                    {/* Simplified Visual Workflow Representation */}
                    <div className="flex flex-col items-center gap-8 w-full max-w-md mt-10">

                        {/* Trigger Node */}
                        <div className="w-80 bg-white rounded-xl shadow-sm border border-orange-200 p-4 transition-all hover:shadow-md cursor-pointer relative group">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                Trigger
                            </div>
                            <h3 className="font-bold text-gray-900 text-center">Add New Workflow Trigger</h3>
                            <p className="text-xs text-center text-gray-500 mt-1">Choose what starts this automation</p>
                        </div>

                        {/* Connector Line */}
                        <div className="h-8 w-0.5 bg-gray-300"></div>

                        {/* Add Action Button */}
                        <button className="w-8 h-8 rounded-full bg-white border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 hover:scale-110 transition-all shadow-sm">
                            <Plus size={16} />
                        </button>

                    </div>
                </div>

                {/* Floating Controls */}
                <div className="absolute bottom-6 left-6 flex flex-col gap-2">
                    <div className="bg-white p-1 rounded-lg border border-gray-200 shadow-lg flex flex-col">
                        <button className="p-2 hover:bg-gray-100 rounded text-gray-600" title="Select">
                            <MousePointer2 size={20} />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded text-gray-600" title="Zoom In">
                            <Plus size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkflowBuilder;
