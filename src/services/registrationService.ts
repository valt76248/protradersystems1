
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
        const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

        // If n8n webhook is available, use it
        if (webhookUrl) {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const text = await response.text();
            if (!text) throw new Error("Server returned empty response.");
            try {
                return JSON.parse(text);
            } catch (e) {
                console.error("Failed to parse response", text);
                return { success: true }; // Treat as success if we got a response
            }
        }

        // FALLBACK: Use Web3Forms if n8n is not configured
        const WEB3FORMS_ACCESS_KEY = '4ac5598f-e101-4897-869e-7d01f5a52abf';
        console.warn("VITE_N8N_WEBHOOK_URL not set, falling back to Web3Forms");

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
};
