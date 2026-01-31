
export interface PreRegistrationData {
    firstName: string;
    lastName: string;
    email: string;
    messenger: string;
    phone: string;
    telegramNick: string;
    instagramNick: string;
    income: string;
    problems: string[];
    mainRequest: string;
    desiredResult: string;
    whyNow: string;
    readyToPay: string;
}

export const registrationService = {
    async submitPreRegistration(data: PreRegistrationData) {
        // Use hardcoded URL as primary source for stability, but allow env override
        const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://n8n.protradersystems.com/webhook/pre-registration';

        try {
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const targetUrl = (isLocal && webhookUrl.includes('n8n.protradersystems.com'))
                ? webhookUrl.replace('https://n8n.protradersystems.com', '/n8n-api')
                : webhookUrl;

            const response = await fetch(targetUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                console.error("n8n response error:", response.status, response.statusText);
                throw new Error(`n8n error: ${response.status}`);
            }

            const text = await response.text();
            if (!text) {
                // If response is OK but empty, return success
                return { success: true };
            }

            try {
                return JSON.parse(text);
            } catch (e) {
                return { success: true }; // Treat non-JSON ok response as success
            }
        } catch (error) {
            console.warn("n8n shipment failed, trying fallback to Web3Forms:", error);

            // FALLBACK: Use Web3Forms if n8n is not reachable or fails
            const WEB3FORMS_ACCESS_KEY = '4ac5598f-e101-4897-869e-7d01f5a52abf';

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    subject: `Новая заявка (Fallback): ${data.firstName} ${data.lastName}`,
                    from_name: `${data.firstName} ${data.lastName}`.trim(),
                    email: data.email,
                    phone: data.phone,
                    messenger: data.messenger,
                    telegram: data.telegramNick || 'Не указан',
                    instagram: data.instagramNick || 'Не указан',
                    income: data.income,
                    problems: data.problems.join(', '),
                    expected_result: data.desiredResult,
                    key_factor: "Via Registration Service",
                    main_request: data.mainRequest,
                    why_choose_you: data.whyNow,
                    ready_to_invest: data.readyToPay,
                    date: new Date().toLocaleString('ru-RU')
                })
            });

            const result = await response.json();
            if (!result.success) {
                throw new Error(result.message || 'Web3Forms error');
            }
            return result;
        }
    }
};
