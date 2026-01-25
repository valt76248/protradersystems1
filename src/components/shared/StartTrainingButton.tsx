import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import AuraButton from '@/components/ui/AuraButton';
import { cn } from '@/lib/utils';

interface StartTrainingButtonProps {
    className?: string;
    size?: 'default' | 'sm' | 'lg' | 'icon';
    text?: string;
}

const StartTrainingButton = ({ className, text }: StartTrainingButtonProps) => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    const handleStartLearning = () => {
        navigate('/courses');
    };

    return (
        <AuraButton
            onClick={handleStartLearning}
            variant="ghost-glow-green"
            size="xl"
            className={cn("w-full md:w-auto tracking-widest", className)}
        >
            {text || t('hero.start') || "НАЧАТЬ ОБУЧЕНИЕ"}
        </AuraButton>
    );
};

export default StartTrainingButton;
