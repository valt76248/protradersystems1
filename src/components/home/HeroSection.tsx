import React from 'react';
import { motion } from 'framer-motion';
import StartTrainingButton from '@/components/shared/StartTrainingButton';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import AuraButton from '../ui/AuraButton';
import TextReveal from '@/components/shared/TextReveal';

const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="relative w-full py-20 px-4 md:py-32 overflow-hidden no-select min-h-[90vh] flex items-center justify-center">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-background z-0" />

      {/* Hero Image Background - User's Mansion */}
      <div className="absolute inset-0 z-0 hero-bg-fixed bg-fixed" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] z-0" />

      {/* Content Container */}
      <div className="relative max-w-6xl mx-auto text-center z-10">

        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-block mb-4"
        >
          <div className="inline-block">
            <span className="text-[#22D3EE] font-bold text-xs md:text-sm tracking-[0.3em] uppercase whitespace-pre-line leading-tight">
              {t('hero.badge')}
            </span>
          </div>
        </motion.div>

        {/* Main Title - Static 3D Pancake Style */}
        <h1 className="text-5xl md:text-7xl lg:text-9xl mb-8 tracking-tight leading-none flex flex-col items-center select-none">
          <span className="text-[#22D3EE] text-3d-pancake">
            {t('hero.title_line1')}
          </span>
          <span className="text-[#22D3EE] text-3d-pancake">
            {t('hero.title_line2')}
          </span>
          <span className="text-white text-3d-pancake mt-2">
            {t('hero.title_line3')}
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl lg:text-2xl mb-12 text-white font-medium max-w-4xl mx-auto leading-relaxed text-shadow-hero-subtitle"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center items-center space-y-8 sm:space-y-0 sm:space-x-12 mb-16 relative z-20"
        >
          <StartTrainingButton />

          <AuraButton
            onClick={() => navigate('/pre-registration')}
            variant="ghost-glow-cyan"
            size="lg"
          >
            {t('hero.preRegistration')}
          </AuraButton>

          <AuraButton
            onClick={() => navigate('/about')}
            variant="ghost-glow-white"
            size="lg"
          >
            {t('hero.about')}
          </AuraButton>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
