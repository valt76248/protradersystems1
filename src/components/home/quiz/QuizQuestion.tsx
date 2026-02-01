
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface QuizQuestionProps {
    currentQuestion: number;
    totalQuestions: number;
    selectedAnswer: number | null;
    isAnswerChecked: boolean;
    correctAnswers: number[];
    onAnswerClick: (index: number) => void;
}

const QuizQuestion = ({
    currentQuestion,
    totalQuestions,
    selectedAnswer,
    isAnswerChecked,
    correctAnswers,
    onAnswerClick
}: QuizQuestionProps) => {
    const { t } = useLanguage();

    return (
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 shadow-xl relative min-h-[400px]">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5 rounded-t-2xl overflow-hidden">
                <motion.div
                    className="h-full bg-trading-accent progress-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />
            </div>

            <div className="mb-8 mt-4">
                <span className="text-sm font-medium text-trading-accent tracking-wider uppercase">
                    Вопрос {currentQuestion + 1} / {totalQuestions}
                </span>
                <h3 className="text-2xl font-bold text-white mt-2 leading-relaxed">
                    {t(`quiz.question.${currentQuestion + 1}`)}
                </h3>
            </div>

            <div className="space-y-3">
                {[1, 2, 3, 4].map((optIndex, index) => {
                    const isCorrect = index === correctAnswers[currentQuestion];
                    const isSelected = selectedAnswer === index;

                    let buttonStyle = "bg-white/5 border-white/10 text-gray-200 hover:bg-white/10 hover:border-white/20";

                    if (isAnswerChecked) {
                        if (isCorrect) {
                            buttonStyle = "bg-green-500/20 border-green-500/50 text-green-200";
                        } else if (isSelected) {
                            buttonStyle = "bg-red-500/20 border-red-500/50 text-red-200";
                        } else {
                            buttonStyle = "bg-white/5 border-white/10 text-gray-500 opacity-50";
                        }
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => onAnswerClick(index)}
                            disabled={isAnswerChecked}
                            className={`w-full p-4 text-left rounded-xl border transition-all duration-200 flex items-center justify-between group ${buttonStyle}`}
                        >
                            <span className="text-lg">{t(`quiz.q${currentQuestion + 1}.opt${optIndex}`)}</span>
                            {isAnswerChecked && isCorrect && (
                                <span className="text-green-400">✓</span>
                            )}
                            {isAnswerChecked && isSelected && !isCorrect && (
                                <span className="text-red-400">✕</span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default QuizQuestion;
