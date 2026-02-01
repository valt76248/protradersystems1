
import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ChevronRight } from 'lucide-react';
import PremiumCard from '@/components/ui/PremiumCard';
import { WORKFLOWS, WorkflowDef } from '@/data/n8nWorkflows';

interface WorkflowSidebarProps {
    activeWorkflow: WorkflowDef;
    setActiveWorkflow: (wf: WorkflowDef) => void;
}

const WorkflowSidebar = ({ activeWorkflow, setActiveWorkflow }: WorkflowSidebarProps) => {
    return (
        <div className="w-full xl:w-96 shrink-0 flex flex-col gap-6">
            <PremiumCard className="p-1 px-1 py-1 overflow-visible">
                <div className="p-4 bg-slate-900/40 rounded-2xl">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2">
                        <Layers className="w-3 h-3 text-cyan-500" />
                        Active Components
                    </h2>
                    <div className="space-y-3">
                        {WORKFLOWS.map((wf) => (
                            <button
                                key={wf.id}
                                data-testid={`workflow-select-${wf.id}`}
                                onClick={() => setActiveWorkflow(wf)}
                                className={`w-full group relative p-3 rounded-xl border transition-all duration-500 text-left overflow-hidden ${activeWorkflow.id === wf.id
                                    ? 'bg-white/5 border-white/20 shadow-xl'
                                    : 'bg-transparent border-white/5 hover:border-white/10 hover:bg-white/5'
                                    }`}
                            >
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className={`p-2.5 rounded-lg bg-gradient-to-br ${wf.color} ring-4 ring-black/50`}>
                                        {React.cloneElement(wf.icon as React.ReactElement, { className: "w-4 h-4 text-white" })}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs font-bold text-white uppercase tracking-tight">{wf.name}</div>
                                        <div className="text-[10px] text-gray-500 truncate">{wf.description}</div>
                                    </div>
                                    <ChevronRight className={`w-3 h-3 transition-transform duration-300 ${activeWorkflow.id === wf.id ? 'translate-x-0 opacity-100 text-cyan-400' : '-translate-x-2 opacity-0'}`} />
                                </div>
                                {activeWorkflow.id === wf.id && (
                                    <motion.div layoutId="active-pill" className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </PremiumCard>

            {/* Health Metrics */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 border-white/5 p-4 rounded-2xl border">
                    <div className="text-[9px] uppercase font-bold text-gray-600 mb-1 tracking-widest">Global Uptime</div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-lg font-black text-white">99.98%</span>
                    </div>
                </div>
                <div className="bg-black/40 border-white/5 p-4 rounded-2xl border">
                    <div className="text-[9px] uppercase font-bold text-gray-600 mb-1 tracking-widest">Sync Status</div>
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-cyan-400">Online</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkflowSidebar;
