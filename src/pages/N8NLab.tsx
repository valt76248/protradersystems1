
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuraBackground from '@/components/ui/AuraBackground';
import PremiumCard from '@/components/ui/PremiumCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Activity, ShieldCheck, Zap, BookOpen, Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { WORKFLOWS } from '@/data/n8nWorkflows';
import type { WorkflowDef } from '@/data/n8nWorkflows';
import { n8nService } from '@/services/n8nService';

// Sub-components
import LabHero from '@/components/n8n-lab/LabHero';
import WorkflowSidebar from '@/components/n8n-lab/WorkflowSidebar';
import LogicPipeline from '@/components/n8n-lab/LogicPipeline';
import PayloadEditor from '@/components/n8n-lab/PayloadEditor';
import OutputStream from '@/components/n8n-lab/OutputStream';
import TelemetryLog from '@/components/n8n-lab/TelemetryLog';

const N8NLab = () => {
    const { toast } = useToast();
    const [activeWorkflow, setActiveWorkflow] = useState<WorkflowDef>(WORKFLOWS[0]);
    const [payload, setPayload] = useState<any>(WORKFLOWS[0].defaultPayload);
    const [response, setResponse] = useState<any>(null);
    const [status, setStatus] = useState<'idle' | 'running' | 'done'>('idle');
    const [e2eStatus, setE2eStatus] = useState<'idle' | 'running' | 'done'>('idle');
    const [activeNodeIndex, setActiveNodeIndex] = useState(-1);
    const [logs, setLogs] = useState<{ time: string, msg: string, type: 'info' | 'success' | 'error' }[]>([]);
    const [activeTab, setActiveTab] = useState('sim');

    useEffect(() => {
        setPayload(activeWorkflow.defaultPayload);
        setResponse(null);
        setStatus('idle');
        setActiveNodeIndex(-1);
    }, [activeWorkflow]);

    const addLog = (msg: string, type: 'info' | 'success' | 'error' = 'info') => {
        setLogs(prev => [{ time: new Date().toLocaleTimeString(), msg, type }, ...prev.slice(0, 49)]);
    };

    const runSimulation = async () => {
        setStatus('running');
        setResponse(null);
        setActiveNodeIndex(0);
        addLog(`Initiating Kernel Pulse [${activeWorkflow.name}]...`, 'info');

        // Step-by-step animation before real call
        const totalNodes = activeWorkflow.nodes.length;
        const animationSteps = Math.min(totalNodes - 1, 3); // Animate first few

        for (let i = 1; i <= animationSteps; i++) {
            await new Promise(r => setTimeout(r, 400));
            setActiveNodeIndex(i);
            const nodeName = activeWorkflow.nodes[i];
            addLog(`Propagating to: ${nodeName}`, 'info');

            if (nodeName.toLowerCase().includes('telegram') || nodeName.toLowerCase().includes('notify')) {
                addLog(`[TELEGRAM] Dispatching message to bot API...`, 'info');
            }
        }

        const result = await n8nService.executeWebhook(activeWorkflow.webhook, payload);

        if (result.success) {
            setResponse(result.data);
            setStatus('done');
            setActiveNodeIndex(totalNodes - 1);
            addLog(`Pulse completed successfully in ${result.duration}ms`, 'success');
            toast({
                title: "Pulse Executed",
                description: "Workflow processed successfully.",
            });
        } else {
            addLog(`Kernel Error: ${result.error || 'Request failed'}`, 'error');
            setResponse(result.data || { error: result.error });
            setStatus('done');
            setActiveNodeIndex(-1);
            toast({
                title: "Pulse Failed",
                description: result.error,
                variant: "destructive"
            });
        }
    };

    const runE2ECheck = async () => {
        setE2eStatus('running');
        addLog(`Starting Automated Spec Verification...`, 'info');

        const result = await n8nService.runE2ETest();

        setE2eStatus('done');
        if (result.success) {
            addLog(`E2E Audit: SUCCESS. All assertions passed.`, 'success');
            toast({ title: "Audit Passed", description: "System integrity verified." });
        } else {
            addLog(`E2E Audit: FAILED. Logic anomalies detected.`, 'error');
            if (result.stderr) {
                const cleanStderr = result.stderr.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
                addLog(`Stderr: ${cleanStderr.substring(0, 2000)}`, 'error');
            }
            if (result.stdout) {
                const cleanStdout = result.stdout.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
                addLog(`Stdout: ${cleanStdout.substring(0, 2000)}`, 'error');
            }
            toast({ title: "Audit Failed", description: "Check logs for details.", variant: "destructive" });
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: "Copied", description: "Content copied to clipboard." });
    };

    const generateCurl = () => {
        const curl = `curl -X POST "${activeWorkflow.webhook}" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(payload, null, 2)}'`;
        copyToClipboard(curl);
    };

    const sendToAgent = () => {
        const report = `
### N8N LAB SESSION REPORT
**Date:** ${new Date().toLocaleString()}
**Active Workflow:** ${activeWorkflow.name}
**Webhook:** ${activeWorkflow.webhook}

**Input Payload:**
\`\`\`json
${JSON.stringify(payload, null, 2)}
\`\`\`

**Last Response:**
\`\`\`json
${JSON.stringify(response, null, 2)}
\`\`\`

**Telemetry Logs:**
\`\`\`
${logs.map(l => `[${l.time}] ${l.type.toUpperCase()}: ${l.msg}`).slice(0, 50).join('\n')}
\`\`\`

**System Info:**
- Platform: ${navigator.platform}
- Localhost Proxy: ${window.location.hostname === 'localhost' ? 'Active' : 'N/A'}
- Audit Status: ${e2eStatus}
`;
        copyToClipboard(report);
        toast({
            title: "Report Ready",
            description: "Lab state copied to clipboard. Please paste it into the agent chat.",
        });
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30 font-sans">
            <AuraBackground />
            <Header />

            <main className="pt-24 pb-20 px-4 md:px-8 max-w-[1600px] mx-auto relative z-10">
                <LabHero
                    e2eStatus={e2eStatus}
                    onRunAudit={runE2ECheck}
                    onSendToAgent={sendToAgent}
                />

                <div className="flex flex-col xl:flex-row gap-8">
                    <WorkflowSidebar
                        activeWorkflow={activeWorkflow}
                        setActiveWorkflow={setActiveWorkflow}
                    />

                    {/* --- Content Area --- */}
                    <div className="flex-grow flex flex-col gap-6 min-w-0">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <div className="flex items-center justify-between mb-4 bg-white/5 p-1.5 rounded-xl border border-white/10">
                                <TabsList className="bg-transparent border-none">
                                    <TabsTrigger value="sim" className="data-[state=active]:bg-white/10 data-[state=active]:text-cyan-400">
                                        <Activity className="w-3.5 h-3.5 mr-2" />
                                        Kernel Pulse
                                    </TabsTrigger>
                                    <TabsTrigger value="docs" className="data-[state=active]:bg-white/10 data-[state=active]:text-purple-400">
                                        <BookOpen className="w-3.5 h-3.5 mr-2" />
                                        Documentation
                                    </TabsTrigger>
                                </TabsList>

                                <div className="hidden md:flex items-center gap-4 px-4 text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                        Stream: Active
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Globe className="w-3 h-3" />
                                        US-EAST-1
                                    </div>
                                </div>
                            </div>

                            <TabsContent value="sim" className="space-y-6 mt-0">
                                <LogicPipeline
                                    activeWorkflow={activeWorkflow}
                                    status={status}
                                    activeNodeIndex={activeNodeIndex}
                                    onRunSimulation={runSimulation}
                                />

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[auto] lg:h-[600px]">
                                    <PayloadEditor
                                        payload={payload}
                                        setPayload={setPayload}
                                        scenarios={activeWorkflow.scenarios}
                                        onCopy={copyToClipboard}
                                        onGenerateCurl={generateCurl}
                                    />

                                    <div className="flex flex-col gap-4">
                                        <OutputStream response={response} status={status} />
                                        <TelemetryLog logs={logs} />
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="docs" className="mt-0">
                                <PremiumCard className="bg-[#0f172a]/80 p-8 md:p-12">
                                    <div className="max-w-3xl mx-auto">
                                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${activeWorkflow.color} w-fit mb-6 shadow-2xl ring-8 ring-white/5`}>
                                            {React.cloneElement(activeWorkflow.icon as React.ReactElement, { className: "w-8 h-8 text-white" })}
                                        </div>
                                        <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">{activeWorkflow.name}</h2>
                                        <p className="text-cyan-400 font-mono text-sm mb-8">{activeWorkflow.description}</p>

                                        <div className="space-y-8 text-gray-400 leading-relaxed font-medium">
                                            <section>
                                                <h3 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
                                                    <div className="w-6 h-[1px] bg-cyan-500" />
                                                    Objective & Logic
                                                </h3>
                                                <p>{activeWorkflow.longDescription}</p>
                                            </section>

                                            <section>
                                                <h3 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
                                                    <div className="w-6 h-[1px] bg-purple-500" />
                                                    Node Distribution
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {activeWorkflow.nodes.map((node, i) => (
                                                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 group hover:border-cyan-500/30 transition-all duration-300">
                                                            <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-[10px] font-bold text-gray-500 group-hover:text-cyan-400 transition-colors">
                                                                {i + 1}
                                                            </div>
                                                            <span className="text-xs text-gray-300 font-bold">{node}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>

                                            <section className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/10">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <ShieldCheck className="w-5 h-5 text-cyan-400" />
                                                    <h3 className="text-white text-xs font-black uppercase tracking-widest mt-1">Status: Production Ready</h3>
                                                </div>
                                                <p className="text-xs">
                                                    Этот ворклоу полностью интегрирован в экосистему и синхронизирован с базой данных Supabase.
                                                    Любые изменения в n8n будут автоматически отражены в поведении фронтенда.
                                                </p>
                                            </section>
                                        </div>
                                    </div>
                                </PremiumCard>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>

                {/* --- Legend footer --- */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8"
                >
                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-500 group">
                        <ShieldCheck className="w-6 h-6 text-cyan-400 mb-6 group-hover:scale-110 transition-transform" />
                        <h4 className="font-bold text-sm mb-3 uppercase tracking-wider">Secure Gateway</h4>
                        <p className="text-[11px] text-gray-500 leading-relaxed font-medium">Direct SSL-encrypted tunnel to n8n.protradersystems.com. No intermediaries.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-500 group">
                        <Zap className="w-6 h-6 text-amber-400 mb-6 group-hover:scale-110 transition-transform" />
                        <h4 className="font-bold text-sm mb-3 uppercase tracking-wider">Pulse Simulation</h4>
                        <p className="text-[11px] text-gray-500 leading-relaxed font-medium">Simulates propagation logic across and through decentralized functional nodes.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-500 group">
                        <Activity className="w-6 h-6 text-purple-400 mb-6 group-hover:scale-110 transition-transform" />
                        <h4 className="font-bold text-sm mb-3 uppercase tracking-wider">Open Protocol</h4>
                        <p className="text-[11px] text-gray-500 leading-relaxed font-medium">Native support for all flywheel scenarios from registration to Win-back campaigns.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-500 group">
                        <Globe className="w-6 h-6 text-green-400 mb-6 group-hover:scale-110 transition-transform" />
                        <h4 className="font-bold text-sm mb-3 uppercase tracking-wider">Data Consistency</h4>
                        <p className="text-[11px] text-gray-500 leading-relaxed font-medium">Deterministic verification of Supabase & Brevo persistence layers.</p>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default N8NLab;
