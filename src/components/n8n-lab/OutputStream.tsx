
import React from 'react';
import { Card } from '@/components/ui/card';
import { Terminal, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface OutputStreamProps {
    response: any;
    status: 'idle' | 'running' | 'done';
}

const OutputStream = ({ response, status }: OutputStreamProps) => {
    return (
        <Card className="bg-black/60 border-white/10 h-3/5 flex flex-col overflow-hidden">
            <div className="p-3 bg-black border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-purple-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Output Stream</span>
                </div>
                {status === 'done' && (
                    <div className="text-[9px] font-mono text-cyan-500">200 OK</div>
                )}
            </div>
            <div
                className="p-5 font-mono text-xs overflow-auto flex-grow text-purple-200/80 leading-relaxed scrollbar-thin scrollbar-thumb-white/10"
                data-testid="output-stream"
            >
                {response ? (
                    <motion.pre initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {JSON.stringify(response, null, 2)}
                        {response.raw && (
                            <div className="mt-4 p-3 bg-red-950/30 border border-red-500/50 rounded-lg">
                                <div className="text-[10px] font-bold text-red-400 mb-1 uppercase tracking-wider">Raw System Error:</div>
                                <div className="text-[9px] text-red-300 break-words opacity-70">
                                    {response.raw}
                                </div>
                            </div>
                        )}
                    </motion.pre>
                ) : (
                    <div className="text-gray-800 italic flex flex-col items-center justify-center h-full gap-3">
                        <Activity className="w-8 h-8 opacity-10 animate-pulse" />
                        <span className="text-[10px] uppercase tracking-widest">Waiting for kernel response...</span>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default OutputStream;
