import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

import { Send, CheckCircle2, Sparkles, MessageCircle, Phone, User, Mail, DollarSign, Target, Heart } from 'lucide-react';

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

    const incomeOptions = [
        { key: 'prereg.income.option1', value: 'до 500 $' },
        { key: 'prereg.income.option2', value: 'от 500$ до 1.000$' },
        { key: 'prereg.income.option3', value: 'от 1.000$ до 2.000$' },
        { key: 'prereg.income.option4', value: 'более 2.000$' }
    ];

    const problemOptions = [
        { key: 'prereg.problem.financial', value: 'Финансовые трудности' },
        { key: 'prereg.problem.relationships', value: 'Проблемы в отношениях' },
        { key: 'prereg.problem.procrastination', value: 'Прокрастинация' },
        { key: 'prereg.problem.depression', value: 'Депрессия, апатия' },
        { key: 'prereg.problem.laziness', value: 'Лень, отсутствие интереса к жизни' },
        { key: 'prereg.problem.fears', value: 'Страхи и тревоги' },
        { key: 'prereg.problem.self_esteem', value: 'Низкая самооценка' },
        { key: 'prereg.problem.health', value: 'Проблемы со здоровьем' },
        { key: 'prereg.problem.other', value: 'Другой' }
    ];

    const messengerOptions = ['WhatsApp', 'Telegram', 'Viber'];

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
            const response = await fetch('https://n8n.protradersystems.com/webhook/pre-registration', {
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
                        <Button
                            onClick={() => navigate('/')}
                            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90"
                        >
                            {t('prereg.success.back')}
                        </Button>
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

                        {/* Personal Info Card */}
                        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                    <User className="w-5 h-5 text-cyan-400" />
                                </div>
                                <h2 className="text-xl font-semibold text-white">{t('prereg.contact_info')}</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-gray-300">{t('prereg.first_name')}</Label>
                                    <Input
                                        required
                                        placeholder={t('prereg.first_name_placeholder')}
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-cyan-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-300">{t('prereg.last_name')}</Label>
                                    <Input
                                        required
                                        placeholder={t('prereg.last_name_placeholder')}
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-cyan-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-300 flex items-center gap-2">
                                        <Mail className="w-4 h-4" /> {t('prereg.email')}
                                    </Label>
                                    <Input
                                        type="email"
                                        required
                                        placeholder="example@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-cyan-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-300 flex items-center gap-2">
                                        <Phone className="w-4 h-4" /> {t('prereg.phone')}
                                    </Label>
                                    <Input
                                        type="tel"
                                        required
                                        placeholder={t('prereg.phone_placeholder')}
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-cyan-500"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 space-y-2">
                                <Label className="text-gray-300 flex items-center gap-2">
                                    <MessageCircle className="w-4 h-4" /> {t('prereg.messenger')}
                                </Label>
                                <RadioGroup
                                    value={formData.messenger}
                                    onValueChange={(value) => setFormData({ ...formData, messenger: value })}
                                    className="flex flex-wrap gap-4 mt-3"
                                >
                                    {messengerOptions.map((option) => (
                                        <div key={option} className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value={option}
                                                id={option}
                                                className="border-gray-500 text-cyan-500"
                                            />
                                            <Label htmlFor={option} className="text-gray-300 cursor-pointer">{option}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mt-6">
                                <div className="space-y-2">
                                    <Label className="text-gray-300">{t('prereg.telegram_nick')}</Label>
                                    <Input
                                        placeholder="@username"
                                        value={formData.telegramNick}
                                        onChange={(e) => setFormData({ ...formData, telegramNick: e.target.value })}
                                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-cyan-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-300">{t('prereg.instagram_nick')}</Label>
                                    <Input
                                        placeholder="@username"
                                        value={formData.instagramNick}
                                        onChange={(e) => setFormData({ ...formData, instagramNick: e.target.value })}
                                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-cyan-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Income Card */}
                        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <DollarSign className="w-5 h-5 text-green-400" />
                                </div>
                                <h2 className="text-xl font-semibold text-white">{t('prereg.income')}</h2>
                            </div>

                            <RadioGroup
                                value={formData.income}
                                onValueChange={(value) => setFormData({ ...formData, income: value })}
                                className="grid md:grid-cols-2 gap-3"
                            >
                                {incomeOptions.map((option) => (
                                    <div
                                        key={option.key}
                                        className={`flex items-center space-x-3 p-4 rounded-xl border transition-all cursor-pointer ${formData.income === option.value
                                            ? 'border-cyan-500 bg-cyan-500/10'
                                            : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                                            }`}
                                    >
                                        <RadioGroupItem
                                            value={option.value}
                                            id={`income-${option.key}`}
                                            className="border-gray-500 text-cyan-500"
                                        />
                                        <Label htmlFor={`income-${option.key}`} className="text-gray-300 cursor-pointer flex-1">{t(option.key)}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        {/* Problems Card */}
                        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                                    <Heart className="w-5 h-5 text-purple-400" />
                                </div>
                                <h2 className="text-xl font-semibold text-white">{t('prereg.problems')}</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-3">
                                {problemOptions.map((problem) => (
                                    <label
                                        key={problem.key}
                                        className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors
                                            ${formData.problems.includes(problem.value)
                                                ? 'border-purple-500 bg-purple-500/10'
                                                : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                                            }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={formData.problems.includes(problem.value)}
                                            onChange={() => handleProblemToggle(problem.value)}
                                            className="w-5 h-5 rounded border-gray-500 bg-transparent text-purple-500 focus:ring-purple-500 focus:ring-offset-0"
                                        />
                                        <span className="text-gray-300">{t(problem.key)}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Goals Card */}
                        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                                    <Target className="w-5 h-5 text-amber-400" />
                                </div>
                                <h2 className="text-xl font-semibold text-white">{t('prereg.goals')}</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-gray-300">{t('prereg.main_request')}</Label>
                                    <Textarea
                                        required
                                        placeholder={t('prereg.main_request_placeholder')}
                                        value={formData.mainRequest}
                                        onChange={(e) => setFormData({ ...formData, mainRequest: e.target.value })}
                                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-cyan-500 min-h-[100px]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-gray-300">{t('prereg.desired_result')}</Label>
                                    <Textarea
                                        required
                                        placeholder={t('prereg.desired_result_placeholder')}
                                        value={formData.desiredResult}
                                        onChange={(e) => setFormData({ ...formData, desiredResult: e.target.value })}
                                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-cyan-500 min-h-[100px]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-gray-300">{t('prereg.why_now')}</Label>
                                    <Textarea
                                        required
                                        placeholder={t('prereg.why_now_placeholder')}
                                        value={formData.whyNow}
                                        onChange={(e) => setFormData({ ...formData, whyNow: e.target.value })}
                                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-cyan-500 min-h-[100px]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Ready to Pay Card */}
                        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-cyan-400" />
                                </div>
                                <h2 className="text-xl font-semibold text-white">{t('prereg.ready_to_pay')}</h2>
                            </div>

                            <RadioGroup
                                value={formData.readyToPay}
                                onValueChange={(value) => setFormData({ ...formData, readyToPay: value })}
                                className="space-y-3"
                            >
                                <div
                                    className={`flex items-center space-x-3 p-4 rounded-xl border transition-all cursor-pointer ${formData.readyToPay === 'ready'
                                        ? 'border-cyan-500 bg-cyan-500/10'
                                        : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                                        }`}
                                >
                                    <RadioGroupItem
                                        value="ready"
                                        id="ready"
                                        className="border-gray-500 text-cyan-500"
                                    />
                                    <Label htmlFor="ready" className="text-gray-300 cursor-pointer flex-1">
                                        {t('prereg.ready_yes')}
                                    </Label>
                                </div>
                                <div
                                    className={`flex items-center space-x-3 p-4 rounded-xl border transition-all cursor-pointer ${formData.readyToPay === 'need-consultation'
                                        ? 'border-cyan-500 bg-cyan-500/10'
                                        : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                                        }`}
                                >
                                    <RadioGroupItem
                                        value="need-consultation"
                                        id="need-consultation"
                                        className="border-gray-500 text-cyan-500"
                                    />
                                    <Label htmlFor="need-consultation" className="text-gray-300 cursor-pointer flex-1">
                                        {t('prereg.ready_consultation')}
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center pt-4">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                size="lg"
                                className="bg-gradient-to-r from-cyan-500 via-purple-500 to-amber-500 hover:opacity-90 text-white font-semibold px-12 py-6 text-lg rounded-xl shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40"
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
                            </Button>
                        </div>

                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PreRegistration;
