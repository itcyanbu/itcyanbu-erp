import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Stage {
    id: string;
    name: string;
    position: number;
    showInFunnel: boolean;
    showInPieChart: boolean;
}

export interface Pipeline {
    id: string;
    name: string;
    stages: Stage[];
}

interface PipelineContextType {
    pipelines: Pipeline[];
    addPipeline: (name: string, stages: Stage[]) => void;
    updatePipeline: (id: string, name: string, stages: Stage[]) => void;
    deletePipeline: (id: string) => void;
}

const PipelineContext = createContext<PipelineContextType | undefined>(undefined);

export const PipelineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [pipelines, setPipelines] = useState<Pipeline[]>(() => {
        const saved = localStorage.getItem('ghl_pipelines');
        return saved ? JSON.parse(saved) : [
            {
                id: '1',
                name: 'Sales Pipeline (Default)',
                stages: [
                    { id: 's1', name: 'Lead', position: 0, showInFunnel: true, showInPieChart: true },
                    { id: 's2', name: 'Qualification', position: 1, showInFunnel: true, showInPieChart: true },
                    { id: 's3', name: 'Proposal', position: 2, showInFunnel: true, showInPieChart: true },
                    { id: 's4', name: 'Negotiation', position: 3, showInFunnel: true, showInPieChart: true },
                    { id: 's5', name: 'Closed Won', position: 4, showInFunnel: true, showInPieChart: true },
                    { id: 's6', name: 'Closed Lost', position: 5, showInFunnel: true, showInPieChart: true },
                ]
            }
        ];
    });

    useEffect(() => {
        localStorage.setItem('ghl_pipelines', JSON.stringify(pipelines));
    }, [pipelines]);

    const addPipeline = (name: string, stages: Stage[]) => {
        const newPipeline: Pipeline = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            stages
        };
        setPipelines([...pipelines, newPipeline]);
    };

    const updatePipeline = (id: string, name: string, stages: Stage[]) => {
        setPipelines(pipelines.map(p => p.id === id ? { ...p, name, stages } : p));
    };

    const deletePipeline = (id: string) => {
        setPipelines(pipelines.filter(p => p.id !== id));
    };

    return (
        <PipelineContext.Provider value={{ pipelines, addPipeline, updatePipeline, deletePipeline }}>
            {children}
        </PipelineContext.Provider>
    );
};

export const usePipelines = () => {
    const context = useContext(PipelineContext);
    if (context === undefined) {
        throw new Error('usePipelines must be used within a PipelineProvider');
    }
    return context;
};
