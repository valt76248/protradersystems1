
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Database, Mail, MessageSquare, Globe, Activity, CheckCircle } from 'lucide-react';

interface LabNodeProps {
    name: string;
    isDone: boolean;
    active: boolean;
    hasError?: boolean;
}

const LabNode = ({ name, isDone, active, hasError }: LabNodeProps) => {
    const icon = useMemo(() => {
        if (name.toLowerCase().includes('supabase') || name.toLowerCase().includes('database')) return <Database className="w-3 h-3" />;
        if (name.toLowerCase().includes('email') || name.toLowerCase().includes('brevo')) return <Mail className="w-3 h-3" />;
        if (name.toLowerCase().includes('telegram') || name.toLowerCase().includes('notify')) return <MessageSquare className="w-3 h-3" />;
        if (name.toLowerCase().includes('webhook')) return <Globe className="w-3 h-3" />;
        return <Activity className="w-3 h-3" />;
    }, [name]);

    return (
        <motion.div
            initial={false}
            animate={{
                scale: active ? 1.1 : 1,
                borderColor: hasError ? 'rgba(239, 68, 68, 0.5)' : (active || isDone ? 'rgba(34, 211, 238, 0.5)' : 'rgba(255, 255, 255, 0.05)')
            }}
            className={`relative px-4 py-3 rounded-xl border backdrop-blur-md flex flex-col items-center justify-center min-w-[140px] transition-all duration-500 overflow-hidden ${isDone ? 'bg-cyan-500/5' : 'bg-black/40'
                } ${hasError ? 'border-red-500/50 bg-red-500/5' : ''}`}
        >
            <div
                className={`flex items-center gap-2 mb-1.5 ${isDone ? 'text-cyan-400' : 'text-gray-500'}`}
                data-testid={`lab-node-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
            >
                {icon}
                <span className="text-[9px] uppercase font-bold tracking-widest">
                    {active ? 'Processing' : (isDone ? 'Success' : 'Ready')}
                </span>
            </div>
            <span className={`text-xs font-bold transition-colors ${isDone || active ? 'text-white' : 'text-gray-400'}`}>{name}</span>

            {active && (
                <motion.div
                    layoutId="node-pulse"
                    className="absolute inset-0 border-2 border-cyan-400 rounded-xl animate-pulse"
                />
            )}

            {isDone && !active && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-1 right-1"
                >
                    <CheckCircle className="w-2.5 h-2.5 text-cyan-400" />
                </motion.div>
            )}
        </motion.div>
    );
};

export default LabNode;
