
import React from 'react';
import { Mail, CheckCircle, ArrowRight, Sparkles, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

interface QuizEmailGateProps {
    email: string;
    setEmail: (email: string) => void;
    telegram: string;
    setTelegram: (telegram: string) => void;
    isSubmitting: boolean;
    emailSubmitted: boolean;
    onSubmit: (e: React.FormEvent) => void;
    onSkip: () => void;
}

const QuizEmailGate = ({
    email,
    setEmail,
    telegram,
    setTelegram,
    isSubmitting,
    emailSubmitted,
    onSubmit,
    onSkip
}: QuizEmailGateProps) => {
    const { t } = useLanguage();

    return (
        <section className="py-20 bg-trading-dark relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-4 max-w-lg text-center">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-purple-800/50 shadow-2xl animate-fade-in">
                    {!emailSubmitted ? (
                        <>
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Sparkles className="h-8 w-8 text-white" />
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                                {t('quiz.ready')}
                            </h2>

                            <p className="text-gray-400 mb-6">
                                {t('quiz.email_gate_desc')}
                            </p>

                            <form onSubmit={onSubmit} className="space-y-4">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                                    <Input
                                        type="email"
                                        placeholder={t('quiz.email_placeholder')}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <Send className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                                    <Input
                                        type="text"
                                        placeholder={t('quiz.telegram')}
                                        value={telegram}
                                        onChange={(e) => setTelegram(e.target.value)}
                                        className="pl-10 h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg font-semibold"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        t('quiz.sending')
                                    ) : (
                                        <>
                                            {t('quiz.get_results')}
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </>
                                    )}
                                </Button>
                            </form>

                            <button
                                onClick={onSkip}
                                className="mt-4 text-sm text-gray-500 hover:text-gray-400 transition-colors"
                            >
                                {t('quiz.skip')}
                            </button>

                            <p className="mt-6 text-xs text-gray-600">
                                {t('quiz.spam_note')}
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold mb-3 text-white">{t('quiz.done')}</h2>
                            <p className="text-gray-400">{t('quiz.loading_results')}</p>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default QuizEmailGate;
