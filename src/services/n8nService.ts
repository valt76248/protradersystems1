
import { BaseApiService } from './BaseApiService';

class N8NService extends BaseApiService {
    async executeWebhook(url: string, payload: any) {
        return this.request(url, {
            method: 'POST',
            body: payload
        });
    }

    async runE2ETest() {
        try {
            const res = await fetch('/api/run-n8n-test');
            return await res.json();
        } catch (error: any) {
            return {
                success: false,
                error: error.message
            };
        }
    }
}

export const n8nService = new N8NService();
