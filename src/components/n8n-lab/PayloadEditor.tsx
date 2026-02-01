
import React from 'react';
import { Card } from '@/components/ui/card';
import { FileJson, Copy, Code2 } from 'lucide-react';

interface PayloadEditorProps {
    payload: any;
    setPayload: (p: any) => void;
    scenarios?: { name: string; payload: any }[];
    onCopy: (text: string) => void;
    onGenerateCurl: () => void;
}

const PayloadEditor = ({ payload, setPayload, scenarios, onCopy, onGenerateCurl }: PayloadEditorProps) => {
    return (
        <Card className="bg-[#0f172a] border-white/10 flex flex-col overflow-hidden group">
            <div className="p-3 bg-white/5 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FileJson className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Input Payload</span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => onCopy(JSON.stringify(payload, null, 2))}
                        className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-gray-500 hover:text-white"
                        title="Copy JSON"
                    >
                        <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                        onClick={onGenerateCurl}
                        className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-gray-500 hover:text-white"
                        title="Copy as cURL"
                    >
                        <Code2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
            <div className="relative flex-grow min-h-[300px]">
                <textarea
                    className="absolute inset-0 w-full h-full bg-transparent p-6 font-mono text-sm text-cyan-200/80 focus:outline-none resize-none leading-relaxed selection:bg-cyan-500/30"
                    value={JSON.stringify(payload, null, 2)}
                    onChange={(e) => {
                        try { setPayload(JSON.parse(e.target.value)); } catch (err) { }
                    }}
                    spellCheck={false}
                    aria-label="JSON Payload Editor"
                    title="JSON Payload Editor"
                    data-testid="payload-editor"
                />
            </div>
            {scenarios && (
                <div className="p-2 border-t border-white/10 bg-black/40 flex flex-wrap gap-2">
                    {scenarios.map((sc, i) => (
                        <button
                            key={i}
                            onClick={() => setPayload(sc.payload)}
                            className="px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-tight bg-white/10 text-gray-400 hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors"
                        >
                            {sc.name}
                        </button>
                    ))}
                </div>
            )}
        </Card>
    );
};

export default PayloadEditor;
