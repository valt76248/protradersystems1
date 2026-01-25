
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuraButton from '@/components/ui/AuraButton';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Send, CheckCircle2 } from 'lucide-react';
import ContactInfo from '@/components/forms/pre-registration/ContactInfo';
import IncomeSelection from '@/components/forms/pre-registration/IncomeSelection';
import ProblemSelection from '@/components/forms/pre-registration/ProblemSelection';
import GoalsSelection from '@/components/forms/pre-registration/GoalsSelection';
import PaymentReadiness from '@/components/forms/pre-registration/PaymentReadiness';

const PreRegistration = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { t } = useLanguage();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        messenger: '',
        phone: '',
        telegramNick: '',
        instagramNick: '',
        income: '',
        problems: [] as string[],
        mainRequest: '',
        desiredResult: '',
        whyNow: '',
        readyToPay: ''
    });

    const handleProblemToggle = (problem: string) => {
        setFormData(prev => ({
            ...prev,
            problems: prev.problems.includes(problem)
                ? prev.problems.filter(p => p !== problem)
                : [...prev.problems, problem]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Version 2: Send to n8n Webhook
            const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
            if (!webhookUrl) throw new Error("Missing VITE_N8N_WEBHOOK_URL");

            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const text = await response.text();
            console.log("Raw response:", text);

            if (!text) {
                throw new Error("Server returned empty response. Check n8n Executions log.");
            }

            const result = JSON.parse(text);

            setIsSubmitted(true);
            toast({
                title: t('prereg.toast.success'),
                description: t('prereg.toast.success_desc'),
            });
        } catch (error: any) {
            console.error("Submission error:", error);
            toast({
                title: t('prereg.toast.error'),
                description: `${error.message}`,
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-trading-dark">
                <Header />
                <div className="flex items-center justify-center min-h-[80vh] px-4">
                    <div className="text-center max-w-md">
                        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center animate-pulse">
                            <CheckCircle2 className="w-12 h-12 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-4">{t('prereg.success.title')}</h1>
                        <p className="text-gray-400 mb-8">
                            {t('prereg.success.message')}
                        </p>
                        <AuraButton
                            onClick={() => navigate('/')}
                            variant="ghost-glow-white"
                            size="lg"
                        >
                            {t('prereg.success.back')}
                        </AuraButton>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-trading-dark">
            <Header />

            {/* Hero Section */}
            <div className="relative py-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-trading-dark to-cyan-900/20" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(86,70,252,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(86,70,252,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />

                <div className="relative max-w-4xl mx-auto px-4 text-center">
                    {/* Mystical Eye Image */}
                    <div className="w-28 h-28 mx-auto mb-6">
                        <img
                            src="/mystic-eye.png"
                            alt="Мистический символ"
                            className="w-full h-full object-contain"
                        />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400">
                        {t('prereg.title')}
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        {t('prereg.subtitle')}
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <div className="relative py-12 px-4">
                <div className="max-w-3xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-8">

                        <ContactInfo
                            formData={formData}
                            onChange={(data) => setFormData(prev => ({ ...prev, ...data }))}
                        />

                        <IncomeSelection
                            value={formData.income}
                            onChange={(value) => setFormData(prev => ({ ...prev, income: value }))}
                        />

                        <ProblemSelection
                            selectedProblems={formData.problems}
                            onToggle={handleProblemToggle}
                        />

                        <GoalsSelection
                            formData={formData}
                            onChange={(data) => setFormData(prev => ({ ...prev, ...data }))}
                        />

                        <PaymentReadiness
                            value={formData.readyToPay}
                            onChange={(value) => setFormData(prev => ({ ...prev, readyToPay: value }))}
                        />

                        {/* Submit Button */}
                        <div className="text-center pt-4">
                            <AuraButton
                                type="submit"
                                disabled={isSubmitting}
                                variant="ghost-glow-cyan"
                                size="lg"
                                className="px-12"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        {t('prereg.submitting')}
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Send className="w-5 h-5" />
                                        {t('prereg.submit')}
                                    </span>
                                )}
                            </AuraButton>
                        </div>

                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PreRegistration;
