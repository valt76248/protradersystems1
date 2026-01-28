
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
        if (!webhookUrl) throw new Error("Missing VITE_N8N_WEBHOOK_URL");

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const text = await response.text();

        if (!text) {
            throw new Error("Server returned empty response.");
        }

        try {
            return JSON.parse(text);
        } catch (e) {
            console.error("Failed to parse response", text);
            throw new Error("Invalid response format from server");
        }
    }
};
