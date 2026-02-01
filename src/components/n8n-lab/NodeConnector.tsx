
import React from 'react';

interface NodeConnectorProps {
    isActive: boolean;
    status: string;
}

const NodeConnector = ({ isActive, status }: NodeConnectorProps) => (
    <div className="flex items-center justify-center w-8">
        <div className={`h-[2px] w-full transition-all duration-700 ${isActive
            ? status === 'done' ? 'bg-green-400 shadow-[0_0_12px_#4ade80]' : 'bg-cyan-400 shadow-[0_0_12px_#22d3ee]'
            : 'bg-white/5'
            }`} />
    </div>
);

export default NodeConnector;
