import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuraButton from '@/components/ui/AuraButton';
import { Card, CardContent } from '@/components/ui/card';
import {
    Terminal, Send, Play, RefreshCw, Layers, CheckCircle,
    AlertCircle, Eye, Info, Database, Mail, UserPlus,
    Activity, ShieldCheck, Zap, ArrowRight, Settings2,
    BarChart3, Binary, Rocket, Target, TrendingUp, MessageSquare,
    UserCheck, DollarSign, Ghost
} from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

// --- Types & Config ---

type WorkflowID =
    | 'pre-registration'
    | 'quiz-lead'
    | 'referral-signup'
    | 'referral-purchase'
    | 'nps-response'
    | 'submit-testimonial'
    | 'apollo-enrich'
    | 'clay-enrich'
    | 'daily-analytics'
    | 'winback-campaign';

interface WorkflowDef {
    id: WorkflowID;
    name: string;
    description: string;
    webhook: string;
    icon: React.ReactNode;
    color: string;
    nodes: string[];
    defaultPayload: any;
}

const WORKFLOWS: WorkflowDef[] = [
    {
        id: 'pre-registration',
        name: 'Flywheel: Pre-Registration',
        description: 'Сбор заявок на обучение с обогащением в CRM и Brevo.',
        webhook: 'https://n8n.protradersystems.com/webhook/pre-registration',
        icon: <UserPlus className="w-5 h-5" />,
        color: 'from-cyan-500 to-blue-600',
        nodes: ['Webhook: Pre-Registration', 'Save to Supabase', 'Add to Brevo', 'Send Confirmation Email', 'Notify Admin (Telegram)', 'Respond Success'],
        defaultPayload: {
            firstName: "Alex",
            lastName: "Trader",
            email: "alex@protrader.com",
            phone: "+380501234567",
            messenger: "Telegram",
            telegramNick: "@alextrade",
            instagramNick: "@alex_insta",
            income: "1000-3000$",
            problems: ["Психология", "Мани-менеджмент"],
            mainRequest: "Хочу выйти на стабильность",
            desiredResult: "5-10% в месяц",
            whyNow: "Хочу начать новый год с обучения",
            readyToPay: "ready"
        }
    },
    {
        id: 'quiz-lead',
        name: 'Flywheel: Quiz Lead Engine',
        description: 'Сегментация студентов по знаниям и авто-рассылка уроков.',
        webhook: 'https://n8n.protradersystems.com/webhook/quiz-lead',
        icon: <Binary className="w-5 h-5" />,
        color: 'from-purple-500 to-indigo-600',
        nodes: ['Webhook: Quiz Lead', 'Save to Supabase', 'Add to Brevo', 'Is Advanced?', 'Email: Segment', 'Notify Admin1', 'Respond Success1'],
        defaultPayload: {
            email: "student@trading.com",
            score: 8,
            percentage: 67,
            refCode: "QUIZ_MOD"
        }
    },
    {
        id: 'referral-signup',
        name: 'Flywheel: Referral Signup',
        description: 'Регистрация связки пригласивший-приглашенный.',
        webhook: 'https://n8n.protradersystems.com/webhook/new-referral-signup',
        icon: <UserCheck className="w-5 h-5" />,
        color: 'from-pink-500 to-rose-600',
        nodes: ['Webhook: New Referral Signup', 'Find Referrer', 'Found Referrer?', 'Create Referral Record', 'Notify Referrer', 'Notify Admin1', 'Respond Success2'],
        defaultPayload: {
            referral_code: "ALPHA_TRUST",
            referred_email: "new_trader@example.com",
            referred_user_id: "usr_9988"
        }
    },
    {
        id: 'referral-purchase',
        name: 'Flywheel: Referral Purchase',
        description: 'Зачисление выплаты после покупки курса приглашенным.',
        webhook: 'https://n8n.protradersystems.com/webhook/referral-purchase',
        icon: <DollarSign className="w-5 h-5" />,
        color: 'from-emerald-500 to-green-700',
        nodes: ['Webhook: Purchase with Referral', 'Find Pending Referral', 'Has Pending Referral?', 'Get Referrer Stats', 'Mark Referral Completed', 'Notify Admin2', 'Respond Success3'],
        defaultPayload: {
            referral_code: "ALPHA_TRUST",
            course_name: "Pro Trader Systems",
            amount: 1700,
            is_vip: true
        }
    },
    {
        id: 'nps-response',
        name: 'Flywheel: NPS Feedback',
        description: 'Обработка оценок качества и обратной связи.',
        webhook: 'https://n8n.protradersystems.com/webhook/nps-response',
        icon: <MessageSquare className="w-5 h-5" />,
        color: 'from-yellow-400 to-amber-600',
        nodes: ['Webhook: NPS Response', 'Save NPS to Supabase', 'Notify Admin3', 'Respond NPS'],
        defaultPayload: {
            user_id: "usr_5566",
            email: "student@trading.com",
            score: 9,
            feedback: "Все отлично, спасибо!"
        }
    },
    {
        id: 'submit-testimonial',
        name: 'Flywheel: Testimonial submission',
        description: 'Прием отзывов с выдачей промокода за активность.',
        webhook: 'https://n8n.protradersystems.com/webhook/submit-testimonial',
        icon: <Activity className="w-5 h-5" />,
        color: 'from-blue-400 to-cyan-500',
        nodes: ['Webhook', 'Save Testimonial', 'Notify Admin5', 'Send Promo Code', 'Respond Testimonial'],
        defaultPayload: {
            name: "Alex Trader",
            email: "alex@example.com",
            text: "Курс изменил мой подход к рынку!",
            rating: 5,
            location: "Киев",
            telegram_handle: "@alextrade"
        }
    },
    {
        id: 'apollo-enrich',
        name: 'Flywheel: Apollo Enrichment',
        description: 'Интеллектуальный поиск данных о лиде.',
        webhook: 'https://n8n.protradersystems.com/webhook/enrich-lead',
        icon: <Target className="w-5 h-5" />,
        color: 'from-blue-600 to-indigo-700',
        nodes: ['Webhook: Enrich Lead', 'Apollo.io Enrich', 'Save Enriched Data', 'Notify Admin2', 'Respond'],
        defaultPayload: {
            email: "alex@protrader.com"
        }
    },
    {
        id: 'clay-enrich',
        name: 'Flywheel: Clay Enrichment',
        description: 'Глубокое обогащение для B2B сегмента.',
        webhook: 'https://n8n.protradersystems.com/webhook/clay-enrich',
        icon: <Layers className="w-5 h-5" />,
        color: 'from-orange-500 to-red-600',
        nodes: ['Webhook: Clay Enrich', 'Add to Clay Table', 'Notify Admin3', 'Respond1'],
        defaultPayload: {
            email: "alex@protrader.com",
            name: "Alex Trader",
            score: 9,
            segment: "advanced"
        }
    },
    {
        id: 'daily-analytics',
        name: 'Flywheel: Daily Analytics',
        description: 'Сбор статистики за 24 часа в Telegram.',
        webhook: 'https://n8n.protradersystems.com/webhook/daily_analytics_summary',
        icon: <TrendingUp className="w-5 h-5" />,
        color: 'from-green-500 to-teal-600',
        nodes: ['Schedule', 'Supabase Summary', 'Send Daily Report'],
        defaultPayload: {
            force: true
        }
    },
    {
        id: 'winback-campaign',
        name: 'Flywheel: Win-back Campaign',
        description: 'Реактивация спящих пользователей.',
        webhook: 'https://n8n.protradersystems.com/webhook/winback-manual',
        icon: <Ghost className="w-5 h-5" />,
        color: 'from-slate-500 to-gray-700',
        nodes: ['Trigger', 'Get Inactive Users', 'Send Win-back Email', 'Report to Admin'],
        defaultPayload: {
            days_inactive: 60,
            segment: "all"
        }
    }
];

// --- Components ---

const NodeConnector = ({ isActive }: { isActive: boolean }) => (
    <div className="flex items-center justify-center w-8">
        <div className={`h-[2px] w-full transition-all duration-500 ${isActive ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-white/10'}`} />
    </div>
);

const LabNode = ({ name, isDone, active }: { name: string, isDone: boolean, active: boolean }) => (
    <m.div
        animate={{
            scale: active ? 1.05 : 1,
            borderColor: active || isDone ? 'rgba(34, 211, 238, 0.5)' : 'rgba(255, 255, 255, 0.1)'
        }}
        data-testid={`lab-node-${name.toLowerCase().replace(/\s+/g, '-')}`}
        className={`px-4 py-2 rounded-lg border backdrop-blur-sm flex flex-col items-center justify-center min-w-[120px] transition-colors ${isDone ? 'bg-cyan-500/10' : 'bg-black/20'}`}
    >
        <span className={`text-[10px] uppercase tracking-tighter mb-1 ${isDone ? 'text-cyan-400' : 'text-gray-500'}`}>
            {isDone ? 'Processed' : 'Waiting'}
        </span>
        <span className={`text-xs font-bold ${isDone || active ? 'text-white' : 'text-gray-400'}`}>{name}</span>
        {active && (
            <m.div
                layoutId="node-pulse"
                className="absolute inset-0 border-2 border-cyan-400 rounded-lg animate-pulse"
            />
        )}
    </m.div>
);

const N8NLab = () => {
    const { toast } = useToast();
    const [activeWorkflow, setActiveWorkflow] = useState<WorkflowDef>(WORKFLOWS[0]);
    const [payload, setPayload] = useState<any>(WORKFLOWS[0].defaultPayload);
    const [response, setResponse] = useState<any>(null);
    const [status, setStatus] = useState<'idle' | 'running' | 'done'>('idle');
    const [e2eStatus, setE2eStatus] = useState<'idle' | 'running' | 'done'>('idle');
    const [activeNodeIndex, setActiveNodeIndex] = useState(-1);
    const [logs, setLogs] = useState<{ time: string, msg: string, type: 'info' | 'success' | 'error' }[]>([]);

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
        addLog(`Инициализация [${activeWorkflow.name}]...`, 'info');

        // Start step-by-step animation
        for (let i = 0; i < activeWorkflow.nodes.length - 1; i++) {
            setActiveNodeIndex(i);
            addLog(`Текущий узел: ${activeWorkflow.nodes[i]}`, 'info');
            await new Promise(r => setTimeout(r, 600));
        }

        try {
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const targetUrl = isLocal
                ? activeWorkflow.webhook.replace('https://n8n.protradersystems.com', '/n8n-api')
                : activeWorkflow.webhook;

            const startTime = performance.now();
            const res = await fetch(targetUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const duration = Math.round(performance.now() - startTime);
            const data = await res.json().catch(() => ({ status: res.status, ok: res.ok }));

            setResponse(data);
            setActiveNodeIndex(activeWorkflow.nodes.length - 1);
            setStatus('done');
            addLog(`Запрос успешно обработан за ${duration}ms`, 'success');

            toast({
                title: "Симуляция завершена",
                description: `Webhook n8n вернул ответ 200 OK`,
            });
        } catch (error: any) {
            addLog(`Ошибка отправки: ${error.message}`, 'error');
            setResponse({ error: error.message });
            setStatus('done');
            setActiveNodeIndex(-1);
        }
    };

    const runE2ECheck = async () => {
        setE2eStatus('running');
        addLog(`Запуск автоматического E2E сценария...`, 'info');
        setResponse(null);

        try {
            const res = await fetch('/api/run-n8n-test');
            const data = await res.json();

            setResponse(data);
            setE2eStatus('done');

            if (data.success) {
                addLog(`E2E тест пройден успешно!`, 'success');
                toast({ title: "Тест завершен", description: "Сценарий Playwright выполнен без ошибок." });
            } else {
                addLog(`E2E тест провален. Проверьте консоль.`, 'error');
                toast({ title: "Тест провален", description: "Обнаружены ошибки в логике n8n.", variant: "destructive" });
            }
        } catch (error: any) {
            addLog(`Критическая ошибка запуска: ${error.message}`, 'error');
            setE2eStatus('done');
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30 font-sans">
            <Header />

            <main className="pt-24 pb-12 px-4 md:px-8 max-w-[1600px] mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                        n8n Workflow Lab
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Центр управления и отладки системных импульсов</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* --- Sidebar: Workflow Selector --- */}
                    <div className="w-full lg:w-80 flex flex-col gap-4">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                                <Settings2 className="w-3 h-3" />
                                Available Systems
                            </h2>
                            <div className="space-y-2">
                                {WORKFLOWS.map((wf) => (
                                    <button
                                        key={wf.id}
                                        onClick={() => setActiveWorkflow(wf)}
                                        data-testid={`workflow-select-${wf.id}`}
                                        className={`w-full p-4 rounded-xl border transition-all duration-300 text-left group relative overflow-hidden ${activeWorkflow.id === wf.id
                                            ? 'bg-white/10 border-white/20'
                                            : 'bg-transparent border-white/5 hover:border-white/10 hover:bg-white/5'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 relative z-10">
                                            <div className={`p-2 rounded-lg bg-gradient-to-br ${wf.color} shadow-lg`}>
                                                {wf.icon}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-white uppercase tracking-tight">{wf.name}</div>
                                                <div className="text-[10px] text-gray-500 truncate w-40">{wf.description}</div>
                                            </div>
                                        </div>
                                        {activeWorkflow.id === wf.id && (
                                            <m.div layoutId="active-bg" className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent pointer-events-none" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* System Stats (Mock) */}
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                                <BarChart3 className="w-3 h-3" />
                                Live Metrics
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                                    <div className="text-[10px] text-gray-500 uppercase">Uptime</div>
                                    <div className="text-sm font-mono text-green-400">99.9%</div>
                                </div>
                                <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                                    <div className="text-[10px] text-gray-500 uppercase">Requests</div>
                                    <div className="text-sm font-mono text-cyan-400">{logs.length}</div>
                                </div>
                            </div>
                        </div>

                        {/* E2E Automation Section */}
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 shadow-lg">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-3 flex items-center gap-2">
                                <Rocket className="w-3 h-3" />
                                Automated Auditor
                            </h2>
                            <p className="text-[10px] text-gray-500 mb-4 leading-relaxed">
                                Запускает Playwright-робота, который имитирует действия пользователя и проверяет ответ n8n.
                            </p>
                            <AuraButton
                                onClick={runE2ECheck}
                                disabled={e2eStatus === 'running'}
                                variant="ghost-glow-gold"
                                size="default"
                                className="w-full bg-amber-500/10 text-amber-500 border-amber-500/30"
                            >
                                {e2eStatus === 'running' ? (
                                    <RefreshCw className="w-3 h-3 mr-2 animate-spin" />
                                ) : (
                                    <Play className="w-3 h-3 mr-2" />
                                )}
                                {e2eStatus === 'running' ? 'Running Specs...' : 'Run E2E Automaton'}
                            </AuraButton>
                        </div>
                    </div>

                    {/* --- Center: Visualizer & Lab --- */}
                    <div className="flex-grow flex flex-col gap-6">

                        {/* Visual Node Flow */}
                        <Card className="bg-[#0f172a] border-white/10 overflow-hidden shadow-2xl relative">
                            <div className="absolute top-0 right-0 p-4">
                                <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
                                    <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
                                    SYNCING WITH N8N.PROTRADERSYSTEMS.COM
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex flex-wrap justify-center items-center gap-0 min-h-[100px]">
                                    {activeWorkflow.nodes.map((node, i) => (
                                        <React.Fragment key={node}>
                                            <LabNode
                                                name={node}
                                                isDone={i < activeNodeIndex || status === 'done'}
                                                active={i === activeNodeIndex && status === 'running'}
                                            />
                                            {i < activeWorkflow.nodes.length - 1 && (
                                                <NodeConnector isActive={i < activeNodeIndex || status === 'done'} />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white/5 border-t border-white/5 p-4 flex justify-between items-center">
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-cyan-400" />
                                        Active Path
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-white/10" />
                                        Pending
                                    </div>
                                </div>
                                <AuraButton
                                    onClick={runSimulation}
                                    disabled={status === 'running'}
                                    variant="ghost-glow-cyan"
                                    size="default"
                                    data-testid="execute-pulse-button"
                                    className="bg-cyan-500/10"
                                >
                                    {status === 'running' ? (
                                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                    ) : (
                                        <Zap className="w-4 h-4 mr-2" />
                                    )}
                                    Execute Logic Pulse
                                </AuraButton>
                            </div>
                        </Card>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 flex-grow">
                            {/* Editor */}
                            <Card className="bg-[#0f172a] border-white/10 flex flex-col">
                                <div className="p-3 border-b border-white/10 flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Payload Source</span>
                                    <div className="flex gap-2">
                                        <AuraButton
                                            size="default"
                                            variant="ghost"
                                            className="h-7 text-[10px] px-2 border-white/5"
                                            onClick={() => setPayload(activeWorkflow.defaultPayload)}
                                        >
                                            Reset
                                        </AuraButton>
                                    </div>
                                </div>
                                <textarea
                                    className="flex-grow min-h-[350px] bg-transparent p-6 font-mono text-sm text-cyan-300 focus:outline-none resize-none leading-relaxed"
                                    title="JSON Payload Editor"
                                    data-testid="payload-editor"
                                    value={JSON.stringify(payload, null, 2)}
                                    onChange={(e) => {
                                        try {
                                            setPayload(JSON.parse(e.target.value));
                                        } catch (err) { }
                                    }}
                                    spellCheck={false}
                                />
                            </Card>

                            {/* Logs & Response */}
                            <div className="flex flex-col gap-6">
                                {/* Response Terminal */}
                                <Card className="bg-black/40 border-white/10 h-1/2 flex flex-col overflow-hidden">
                                    <div className="p-3 bg-black flex items-center gap-2 border-b border-white/5">
                                        <Terminal className="w-3 h-3 text-purple-400" />
                                        <span className="text-[10px] uppercase font-bold text-gray-500">Output Stream</span>
                                    </div>
                                    <div className="p-4 font-mono text-xs overflow-auto flex-grow text-purple-200" data-testid="output-stream">
                                        {response ? (
                                            <m.pre initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                {JSON.stringify(response, null, 2)}
                                            </m.pre>
                                        ) : (
                                            <div className="text-gray-700 italic flex items-center justify-center h-full">Waiting for kernel response...</div>
                                        )}
                                    </div>
                                </Card>

                                {/* Console */}
                                <Card className="bg-black border border-white/10 h-1/2 flex flex-col overflow-hidden">
                                    <div className="p-3 flex items-center gap-2 border-b border-white/5">
                                        <Activity className="w-3 h-3 text-cyan-400" />
                                        <span className="text-[10px] uppercase font-bold text-gray-500">Telemetry Log</span>
                                    </div>
                                    <div className="p-3 overflow-auto font-mono text-[10px] space-y-1">
                                        {logs.map((log, i) => (
                                            <div key={i} className="flex gap-2 border-b border-white/5 pb-1">
                                                <span className="text-gray-700 select-none">[{log.time}]</span>
                                                <span className={
                                                    log.type === 'success' ? 'text-green-500' :
                                                        log.type === 'error' ? 'text-red-500' :
                                                            'text-cyan-500/80'
                                                }>
                                                    {log.msg}
                                                </span>
                                            </div>
                                        ))}
                                        {logs.length === 0 && <div className="text-gray-800 italic">Core initialized. System ready.</div>}
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Legend / Info */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                        <ShieldCheck className="w-6 h-6 text-green-400 mb-4" />
                        <h4 className="font-bold text-sm mb-2">Endpoint Security</h4>
                        <p className="text-xs text-gray-500">Все запросы отправляются через SSL-шифрование напрямую в доверенный шлюз n8n.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                        <Zap className="w-6 h-6 text-yellow-400 mb-4" />
                        <h4 className="font-bold text-sm mb-2">Real-time Execution</h4>
                        <p className="text-xs text-gray-500">Симуляция визуализирует путь данных по вашим функциональным узлам в n8n.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                        <Layers className="w-6 h-6 text-blue-400 mb-4" />
                        <h4 className="font-bold text-sm mb-2">Multi-Process Support</h4>
                        <p className="text-xs text-gray-500">Поддержка всех ключевых сценариев: от регистрации до реферальных бонусов.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                        <Database className="w-6 h-6 text-purple-400 mb-4" />
                        <h4 className="font-bold text-sm mb-2">Data Persistence</h4>
                        <p className="text-xs text-gray-500">Убедитесь, что ноды "Supabase" или "Postgres" корректно сохраняют приходящие данные.</p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default N8NLab;
