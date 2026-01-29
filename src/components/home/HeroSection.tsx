import React from 'react';
import { motion } from 'framer-motion';
import StartTrainingButton from '@/components/shared/StartTrainingButton';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import AuraButton from '../ui/AuraButton';
import { ShieldCheck } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center pts-noise overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 z-10 bg-[radial-gradient(1200px_700px_at_50%_0%,rgba(34,211,238,0.15),transparent_70%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 z-0 bg-black bg-fixed bg-[url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center"
          aria-hidden="true"
        />

      </div>

      <div className="relative mx-auto flex max-w-[1100px] flex-col px-4 pb-14 pt-8 md:pt-16 z-20">
        <div className="mx-auto max-w-[820px] text-center">
          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto inline-flex items-center gap-2 text-[11px] md:text-[13px] font-bold tracking-[0.4em] text-cyan-200/80 mb-6"
            style={{
              textShadow: '0 0 10px rgba(34,211,238,0.4), 0 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            <span className="opacity-90 uppercase">
              {t('hero.badge').split('•')[0].trim()}
            </span>
            <span className="opacity-40">•</span>
            <span className="opacity-90 uppercase">
              {t('hero.badge').split('•')[1]?.trim() || ''}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2 text-[42px] leading-[1.05] sm:text-[68px] lg:text-[84px] tracking-tight"
          >
            <span className="pts-hero-title block">
              <span className="accent">{t('hero.title_primary')}</span>
              <br />
              <span className="text-white">{t('hero.title_secondary')}</span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 text-[16px] leading-7 text-white font-medium sm:text-[19px] max-w-3xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Buttons Area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex flex-col items-center justify-center gap-6"
          >
            <div className="w-full flex justify-center">
              <StartTrainingButton className="pts-cta h-14 w-full max-w-[520px] text-[18px] md:text-[22px] font-black text-emerald-400 hover:scale-[1.05] active:scale-[0.95] transition-all duration-300 uppercase tracking-[0.3em] bg-transparent border-none" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
              <AuraButton
                onClick={() => navigate('/pre-registration')}
                variant="ghost-glow-cyan"
                className="text-base md:text-lg font-bold"
              >
                {t('hero.preRegistration')}
              </AuraButton>

              <AuraButton
                onClick={() => navigate('/about')}
                variant="ghost-glow-white"
                className="text-base md:text-lg font-bold"
              >
                {t('hero.about')}
              </AuraButton>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
