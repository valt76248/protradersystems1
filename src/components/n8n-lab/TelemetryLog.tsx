
import React from 'react';
import { Card } from '@/components/ui/card';
import { Activity } from 'lucide-react';

interface LogEntry {
    time: string;
    msg: string;
    type: 'info' | 'success' | 'error';
}

interface TelemetryLogProps {
    logs: LogEntry[];
}

const TelemetryLog = ({ logs }: TelemetryLogProps) => {
    return (
        <Card className="bg-black border border-white/10 h-2/5 flex flex-col overflow-hidden">
            <div className="p-3 bg-black/40 border-b border-white/10 flex items-center gap-2">
                <Activity className="w-3 h-3 text-cyan-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Telemetry Log</span>
            </div>
            <div className="p-3 overflow-y-auto font-mono text-[10px] space-y-2 flex-grow scrollbar-thin scrollbar-thumb-white/10">
                {logs.map((log, i) => (
                    <div key={i} className="flex gap-3 group">
                        <span className="text-gray-700 select-none shrink-0">[{log.time}]</span>
                        <span className={
                            log.type === 'success' ? 'text-green-400' :
                                log.type === 'error' ? 'text-red-400' :
                                    'text-blue-400/80'
                        }>
                            {log.msg}
                        </span>
                    </div>
                ))}
                {logs.length === 0 && <div className="text-gray-800 italic uppercase text-[9px] tracking-widest py-4 text-center">System Initialized. Ready for command.</div>}
            </div>
        </Card>
    );
};

export default TelemetryLog;
