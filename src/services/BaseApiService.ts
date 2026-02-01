
export interface ApiRequestOptions {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
}

export interface ApiResponse<T = any> {
    success: boolean;
    status: number;
    data?: T;
    error: string | null;
    duration: number;
}

export class BaseApiService {
    protected async request<T = any>(url: string, options: ApiRequestOptions = {}): Promise<ApiResponse<T>> {
        const isLocal = typeof window !== 'undefined' &&
            (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

        // Handle n8n-specific proxy logic
        const targetUrl = (isLocal && url.includes('n8n.protradersystems.com'))
            ? url.replace('https://n8n.protradersystems.com', '/n8n-api')
            : url;

        const startTime = performance.now();
        try {
            const response = await fetch(targetUrl, {
                method: options.method || 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                body: options.body ? JSON.stringify(options.body) : undefined
            });

            const duration = Math.round(performance.now() - startTime);
            const responseText = await response.text();

            let data: any;
            try {
                data = responseText ? JSON.parse(responseText) : { success: response.ok };
            } catch (e) {
                data = {
                    status: response.status,
                    ok: response.ok,
                    message: "Response not JSON",
                    raw: responseText.substring(0, 1000)
                };
            }

            return {
                success: response.ok,
                status: response.status,
                data,
                error: response.ok ? null : `HTTP Error ${response.status}: ${data.message || response.statusText || 'Unknown Error'}`,
                duration
            };
        } catch (error: any) {
            return {
                success: false,
                status: 0,
                error: `Network Error: ${error.message}`,
                duration: Math.round(performance.now() - startTime)
            };
        }
    }
}
