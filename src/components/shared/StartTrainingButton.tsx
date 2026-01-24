import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface StartTrainingButtonProps {
    className?: string;
    size?: 'default' | 'sm' | 'lg' | 'icon';
    text?: string;
}

const StartTrainingButton = ({ className, size = 'lg', text }: StartTrainingButtonProps) => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    const handleStartLearning = () => {
        navigate('/courses');
    };

    return (
        <Button
            onClick={handleStartLearning}
            size={size}
            className={`bg-transparent hover:bg-transparent text-lime-400 font-black text-2xl border-none p-0 h-auto transition-all duration-300 hover:scale-110 hover:text-lime-300 hover:drop-shadow-[0_0_25px_rgba(132,204,22,1)] ${className}`}
        >
            {text || t('hero.start') || "НАЧАТЬ ОБУЧЕНИЕ"}
        </Button>
    );
};

export default StartTrainingButton;
