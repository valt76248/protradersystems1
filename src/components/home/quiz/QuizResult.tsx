
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Recommendation {
    title: string;
    text: string;
    cta: string;
    link: string;
}

interface QuizResultProps {
    score: number;
    totalQuestions: number;
    percentage: number;
    resultMessage: string;
    recommendation: Recommendation;
    onRestart: () => void;
}

const QuizResult = ({
    score,
    totalQuestions,
    percentage,
    resultMessage,
    recommendation,
    onRestart
}: QuizResultProps) => {
    const { t } = useLanguage();

    return (
        <section className="py-20 bg-trading-dark relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-2xl text-center">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl animate-fade-in">
                    <div className="text-6xl mb-6">
                        {percentage >= 70 ? '🏆' : percentage >= 40 ? '📊' : '📚'}
                    </div>

                    <h2 className="text-3xl font-bold mb-4 text-white">{t('quiz.title')}</h2>
                    <p className="text-xl text-gray-300 mb-4">{resultMessage}</p>

                    <div className="text-5xl font-bold text-trading-accent mb-6">
                        {score} / {totalQuestions}
                    </div>

                    {/* Progress Ring */}
                    <div className="w-32 h-32 mx-auto mb-8 relative">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="64"
                                cy="64"
                                r="56"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                className="text-gray-700"
                            />
                            <circle
                                cx="64"
                                cy="64"
                                r="56"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                strokeDasharray={`${percentage * 3.51} 351`}
                                className={`${percentage >= 70 ? 'text-green-500' : percentage >= 40 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000`}
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">{Math.round(percentage)}%</span>
                        </div>
                    </div>

                    {/* Recommendation Card */}
                    <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl p-6 mb-8 text-left border border-purple-800/50">
                        <h3 className="text-lg font-bold text-white mb-2">{recommendation.title}</h3>
                        <p className="text-gray-400 mb-4">{recommendation.text}</p>
                        <Button
                            onClick={() => window.location.href = recommendation.link}
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        >
                            {recommendation.cta}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>

                    <Button
                        onClick={onRestart}
                        variant="ghost"
                        className="btn-glow-base glow-white hover:bg-transparent mt-4"
                    >
                        {t('quiz.button.restart')}
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default QuizResult;
