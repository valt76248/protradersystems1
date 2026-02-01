
import { supabase } from '@/lib/supabaseClient';
import { BaseApiService } from './BaseApiService';

export interface QuizLeadData {
    email: string;
    telegram?: string;
    score: number;
    percentage: number;
    segment: string;
    refCode: string | null;
    source: string;
}

class QuizService extends BaseApiService {
    async submitResults(data: QuizLeadData) {
        // 1. Save to Supabase
        const { error: supabaseError } = await supabase
            .from('quiz_leads')
            .insert({
                email: data.email,
                telegram: data.telegram || null,
                quiz_score: data.score,
                quiz_percentage: data.percentage,
                segment: data.segment,
                referral_code: data.refCode,
                source: data.source,
                created_at: new Date().toISOString()
            });

        if (supabaseError) {
            console.warn('Supabase save failed, continuing to webhook:', supabaseError);
        }

        // 2. Trigger n8n webhook
        const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_QUIZ || 'https://n8n.protradersystems.com/webhook/quiz-lead';

        const isLocal = typeof window !== 'undefined' &&
            (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

        // Note: For quiz-lead, n8n expects /webhook-test/ on localhost for some reason as per previous logic
        const targetUrl = (isLocal && !webhookUrl.includes('/webhook-test/'))
            ? webhookUrl.replace('/webhook/', '/webhook-test/')
            : webhookUrl;

        return this.request(targetUrl, {
            method: 'POST',
            body: {
                ...data,
                timestamp: new Date().toISOString(),
                is_test: isLocal ? "true" : "false"
            }
        });
    }
}

export const quizService = new QuizService();
