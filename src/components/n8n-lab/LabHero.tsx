
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, RefreshCw, Brain, Layout } from 'lucide-react';
import AuraButton from '@/components/ui/AuraButton';

interface LabHeroProps {
    e2eStatus: 'idle' | 'running' | 'done';
    onRunAudit: () => void;
    onSendToAgent: () => void;
}

const LabHero = ({ e2eStatus, onRunAudit, onSendToAgent }: LabHeroProps) => {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-4"
                >
                    <Cpu className="w-3 h-3" />
                    System Pulse Controller
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-400 to-purple-500 tracking-tight"
                >
                    n8n Workflow Lab
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-400 text-sm mt-2 max-w-xl"
                >
                    Advanced debugging environment for ProTrader Systems' automated flywheel.
                    Monitor, simulate, and audit cross-platform logic in real-time.
                </motion.p>
            </div>

            <div className="flex gap-3">
                <AuraButton
                    onClick={onRunAudit}
                    disabled={e2eStatus === 'running'}
                    variant="ghost-glow-gold"
                    size="sm"
                    className="bg-amber-500/5 text-amber-500 border border-amber-500/20"
                    data-testid="run-audit-button"
                >
                    {e2eStatus === 'running' ? (
                        <RefreshCw className="w-3 h-3 mr-2 animate-spin" />
                    ) : (
                        <ShieldCheck className="w-3 h-3 mr-2" />
                    )}
                    {e2eStatus === 'running' ? 'Auditing...' : 'Run System Audit'}
                </AuraButton>
                <AuraButton
                    onClick={onSendToAgent}
                    variant="ghost-glow-purple"
                    size="sm"
                    className="bg-purple-500/5 text-purple-400 border border-purple-500/20"
                >
                    <Brain className="w-3 h-3 mr-2" />
                    Send to Agent
                </AuraButton>
                <AuraButton
                    variant="ghost-glow-cyan"
                    size="sm"
                    className="bg-cyan-500/5 text-cyan-400 border border-cyan-500/20"
                >
                    <Layout className="w-3 h-3 mr-2" />
                    Dashboard View
                </AuraButton>
            </div>
        </div>
    );
};

export default LabHero;
