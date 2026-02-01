
import React from 'react';
import PremiumCard from '@/components/ui/PremiumCard';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AuraButton from '@/components/ui/AuraButton';
import { RefreshCw, Zap } from 'lucide-react';
import LabNode from './LabNode';
import NodeConnector from './NodeConnector';
import { WorkflowDef } from '@/data/n8nWorkflows';

interface LogicPipelineProps {
    activeWorkflow: WorkflowDef;
    status: 'idle' | 'running' | 'done';
    activeNodeIndex: number;
    onRunSimulation: () => void;
}

const LogicPipeline = ({ activeWorkflow, status, activeNodeIndex, onRunSimulation }: LogicPipelineProps) => {
    return (
        <PremiumCard className="overflow-hidden bg-[#0f172a]/60">
            <CardHeader className="pb-0 pt-6">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-base uppercase tracking-widest font-black text-white">
                            Logic Pipeline
                        </CardTitle>
                        <CardDescription className="text-[10px] text-gray-500">
                            Visual propagation of the selected system pulse
                        </CardDescription>
                    </div>
                    <AuraButton
                        onClick={onRunSimulation}
                        disabled={status === 'running'}
                        variant="ghost-glow-cyan"
                        size="sm"
                        className="bg-cyan-500/10 text-cyan-400"
                        data-testid="execute-pulse-button"
                    >
                        {status === 'running' ? <RefreshCw className="w-3.5 h-3.5 mr-2 animate-spin" /> : <Zap className="w-3.5 h-3.5 mr-2" />}
                        {status === 'running' ? 'Executing...' : 'Execute Logic Pulse'}
                    </AuraButton>
                </div>
            </CardHeader>
            <div className="p-8 md:p-12 overflow-x-auto">
                <div className="flex items-center min-w-max justify-center gap-0">
                    {activeWorkflow.nodes.map((node, i) => (
                        <React.Fragment key={node}>
                            <LabNode
                                name={node}
                                isDone={i < activeNodeIndex || status === 'done'}
                                active={i === activeNodeIndex && status === 'running'}
                            />
                            {i < activeWorkflow.nodes.length - 1 && (
                                <NodeConnector
                                    isActive={i < activeNodeIndex || status === 'done'}
                                    status={status}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </PremiumCard>
    );
};

export default LogicPipeline;
