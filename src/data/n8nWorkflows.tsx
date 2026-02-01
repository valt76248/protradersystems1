import React from 'react';
import {
    UserPlus, Binary, UserCheck, DollarSign, MessageSquare,
    Activity, Target, Layers, TrendingUp, Ghost
} from 'lucide-react';

export type WorkflowID =
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

export interface WorkflowDef {
    id: WorkflowID;
    name: string;
    description: string;
    longDescription: string;
    webhook: string;
    icon: React.ReactNode;
    color: string;
    nodes: string[];
    defaultPayload: any;
    scenarios?: { name: string; payload: any }[];
}

export const WORKFLOWS: WorkflowDef[] = [
    {
        id: 'pre-registration',
        name: 'Flywheel: Pre-Registration',
        description: 'Сбор заявок на обучение с обогащением в CRM и Brevo.',
        longDescription: 'Основной процесс захвата лидов для профессионального курса. Сохраняет данные в Supabase, синхронизирует с Brevo CRM (Список #2), отправляет подтверждение пользователю и уведомление админу в Telegram.',
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
            income: "1000-3000$",
            problems: ["Психология", "Мани-менеджмент"],
            mainRequest: "Хочу выйти на стабильность",
            desiredResult: "5-10% в месяц",
            readyToPay: "ready"
        },
        scenarios: [
            {
                name: "Hot Lead (Ready to Pay)",
                payload: { firstName: "Ivan", email: "ivan@pro.com", readyToPay: "ready", income: "5000$+" }
            },
            {
                name: "Warm Lead (Needs Consultation)",
                payload: { firstName: "Mariya", email: "mariya@trade.com", readyToPay: "later", problems: ["Risk Management"] }
            }
        ]
    },
    {
        id: 'quiz-lead',
        name: 'Flywheel: Quiz Lead Engine',
        description: 'Сегментация студентов по знаниям и авто-рассылка уроков.',
        longDescription: 'Процессинг результатов квизов. Присваивает сегмент (Beginner/Intermediate/Advanced) и отправляет персонализированную цепочку писем в зависимости от уровня знаний.',
        webhook: 'https://n8n.protradersystems.com/webhook/quiz-lead',
        icon: <Binary className="w-5 h-5" />,
        color: 'from-purple-500 to-indigo-600',
        nodes: ['Webhook: Quiz Lead', 'Save to Supabase', 'Add to Brevo', 'Is Advanced?', 'Email: Segment', 'Notify Admin1', 'Respond Success1'],
        defaultPayload: {
            email: "student@trading.com",
            telegram: "@student_trade",
            score: 8,
            percentage: 67,
            refCode: "QUIZ_MOD"
        }
    },
    {
        id: 'referral-signup',
        name: 'Flywheel: Referral Signup',
        description: 'Регистрация связки пригласивший-приглашенный.',
        longDescription: 'Отслеживание вирального цикла. Проверяет реферальный код, создает запись в БД и уведомляет пригласившего о новом потенциальном бонусе.',
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
        longDescription: 'Финализация выплат. Рассчитывает комиссию ($170 или $340 VIP), обновляет статус реферала и уведомляет партнера о зачислении средств.',
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
        longDescription: 'Мониторинг лояльности. Категоризирует ответы на Promoter/Passive/Detractor. При низких оценках мгновенно уведомляет поддержку для вмешательства.',
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
        longDescription: 'Автоматизация сбора социального доказательства. Сохраняет отзыв в очередь модерации и выдает промокод THANKYOU20 в качестве вознаграждения.',
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
        longDescription: 'Обогащение данных лидов через Apollo.io. Подтягивает LinkedIn профили, должности и данные о компании для качественной подготовки куратора к консультации.',
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
        longDescription: 'Продвинутое обогащение через Clay для поиска специфических данных в разных источниках.',
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
        longDescription: 'Ежедневный отчет эффективности. Считает количество лидов, распределение сегментов и средний NPS за последние 24 часа.',
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
        longDescription: 'Возврат потерянных клиентов. Находит пользователей, не активных более 60 дней, и отправляет им спецпредложение со скидкой 15%.',
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
