
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuraButton from '@/components/ui/AuraButton';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Send, CheckCircle2 } from 'lucide-react';
import ContactInfo from '@/components/forms/pre-registration/ContactInfo';
import IncomeSelection from '@/components/forms/pre-registration/IncomeSelection';
import ProblemSelection from '@/components/forms/pre-registration/ProblemSelection';
import GoalsSelection from '@/components/forms/pre-registration/GoalsSelection';
import PaymentReadiness from '@/components/forms/pre-registration/PaymentReadiness';
import { registrationService } from '@/services/registrationService';
import CryptoPaymentModal from '@/components/payment/CryptoPaymentModal';

const PreRegistration = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const intent = searchParams.get('intent');

    const { toast } = useToast();
    const { t } = useLanguage();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

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
        readyToPay: intent === 'payment' ? 'ready' : (intent === 'consultation' ? 'need-consultation' : '')
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
            const result = await registrationService.submitPreRegistration(formData);
            console.log("Response:", result);

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
                <CryptoPaymentModal
                    isOpen={isPaymentModalOpen}
                    onClose={() => setIsPaymentModalOpen(false)}
                    onConfirm={(hash) => {
                        setIsPaymentModalOpen(false);
                        console.log("Payment confirmed with hash:", hash);
                        toast({
                            title: t('prereg.payment_confirmed'),
                            description: hash ? `TxID: ${hash.substring(0, 10)}...` : undefined
                        });
                        navigate('/');
                    }}
                />
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

                        <div className="flex flex-col gap-4 justify-center items-center">
                            {/* Option to Pay if they are ready */}
                            {formData.readyToPay === 'ready' && (
                                <AuraButton
                                    onClick={() => setIsPaymentModalOpen(true)}
                                    variant="primary"
                                    size="lg"
                                    className="w-full"
                                >
                                    {t('course.checkout')} (Crypto)
                                </AuraButton>
                            )}

                            <AuraButton
                                onClick={() => navigate('/')}
                                variant="ghost-glow-white"
                                size="lg"
                                className="w-full"
                            >
                                {formData.readyToPay === 'ready' ? t('prereg.success.back') : t('prereg.success.complete')}
                            </AuraButton>
                        </div>
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
                    <div className="w-32 h-32 mx-auto mb-6 relative group">
                        <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl group-hover:bg-cyan-500/30 transition-colors animate-pulse-subtle" />
                        <img
                            src="/images/protrader_logo_main.jpg"
                            alt="ProTrader Systems Logo"
                            className="relative w-full h-full object-contain rounded-full border border-white/10 shadow-2xl shadow-cyan-500/20"
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
