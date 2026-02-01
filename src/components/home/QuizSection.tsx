
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import { quizService } from '@/services/quizService';

// Sub-components
import QuizQuestion from './quiz/QuizQuestion';
import QuizEmailGate from './quiz/QuizEmailGate';
import QuizResult from './quiz/QuizResult';

const QuizSection = () => {
    const { t } = useLanguage();
    const { toast } = useToast();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [showEmailGate, setShowEmailGate] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [telegram, setTelegram] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailSubmitted, setEmailSubmitted] = useState(false);

    // Define correct answers index (0-3) for 12 questions
    const correctAnswers = [1, 2, 0, 0, 2, 1, 1, 1, 2, 0, 1, 1];
    const totalQuestions = 12;

    const handleAnswerClick = (index: number) => {
        if (isAnswerChecked) return;

        setSelectedAnswer(index);
        setIsAnswerChecked(true);

        if (index === correctAnswers[currentQuestion]) {
            setScore(score + 1);
        }

        // Auto advance after short delay
        setTimeout(() => {
            if (currentQuestion < totalQuestions - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedAnswer(null);
                setIsAnswerChecked(false);
            } else {
                // Show email gate before results
                setShowEmailGate(true);
            }
        }, 1500);
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            toast({
                title: "Ошибка",
                description: "Введите корректный email",
                variant: "destructive"
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const urlParams = new URLSearchParams(window.location.search);
            const refCode = urlParams.get('ref');

            let segment = 'beginner';
            const percentage = Math.round((score / totalQuestions) * 100);
            if (percentage >= 70) segment = 'advanced';
            else if (percentage >= 40) segment = 'intermediate';

            const result = await quizService.submitResults({
                email: email.trim(),
                telegram: telegram.trim(),
                score: Number(score),
                percentage: percentage,
                segment: segment,
                refCode: refCode,
                source: 'quiz'
            });

            if (!result.success && result.status !== 502) {
                console.warn("Quiz submission partially failed:", result.message);
            }

            setEmailSubmitted(true);

            toast({
                title: "Отлично! 🎉",
                description: "Результаты сохранены"
            });

            setTimeout(() => {
                setShowEmailGate(false);
                setShowResult(true);
            }, 1500);

        } catch (error) {
            console.error('Error in handleEmailSubmit:', error);
            setShowEmailGate(false);
            setShowResult(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const skipEmailAndShowResults = () => {
        setShowEmailGate(false);
        setShowResult(true);
    };

    const restartQuiz = () => {
        setScore(0);
        setCurrentQuestion(0);
        setShowResult(false);
        setShowEmailGate(false);
        setSelectedAnswer(null);
        setIsAnswerChecked(false);
        setEmail('');
        setEmailSubmitted(false);
    };

    const percentage = (score / totalQuestions) * 100;

    const getResultMessage = () => {
        if (percentage === 100) return t('quiz.result.perfect');
        if (percentage >= 70) return t('quiz.result.good');
        if (percentage >= 40) return t('quiz.result.average');
        return t('quiz.result.poor');
    };

    const getRecommendation = () => {
        if (percentage >= 70) {
            return {
                title: "Вы готовы к системному трейдингу!",
                text: "С вашим уровнем знаний курс Pro Trader Systems поможет выйти на стабильный результат.",
                cta: "Записаться на курс",
                link: "/courses"
            };
        }
        if (percentage >= 40) {
            return {
                title: "Хорошая база, но есть пробелы",
                text: "Рекомендуем начать с бесплатных материалов для новичков.",
                cta: "Бесплатное обучение",
                link: "/beginner-training"
            };
        }
        return {
            title: "Начните с основ",
            text: "Пройдите наш бесплатный курс для начинающих — 9 видео-уроков с нуля.",
            cta: "Начать бесплатно",
            link: "/beginner-training"
        };
    };

    if (showEmailGate) {
        return (
            <QuizEmailGate
                email={email}
                setEmail={setEmail}
                telegram={telegram}
                setTelegram={setTelegram}
                isSubmitting={isSubmitting}
                emailSubmitted={emailSubmitted}
                onSubmit={handleEmailSubmit}
                onSkip={skipEmailAndShowResults}
            />
        );
    }

    if (showResult) {
        return (
            <QuizResult
                score={score}
                totalQuestions={totalQuestions}
                percentage={percentage}
                resultMessage={getResultMessage()}
                recommendation={getRecommendation()}
                onRestart={restartQuiz}
            />
        );
    }

    return (
        <section id="quiz" className="py-20 bg-gradient-to-b from-trading-dark to-trading-card/30 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-trading-accent/5 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        {t('quiz.title')}
                    </h2>
                    <p className="text-gray-400">
                        {t('quiz.subtitle')}
                    </p>
                </div>

                <QuizQuestion
                    currentQuestion={currentQuestion}
                    totalQuestions={totalQuestions}
                    selectedAnswer={selectedAnswer}
                    isAnswerChecked={isAnswerChecked}
                    correctAnswers={correctAnswers}
                    onAnswerClick={handleAnswerClick}
                />
            </div>
        </section>
    );
};

export default QuizSection;
