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
          className="absolute inset-0 z-0 bg-black bg-fixed bg-[url('/images/hero_main_perfect.png')] bg-no-repeat bg-[length:60%_auto] bg-[60%_85%]"
          aria-hidden="true"
        />
        {/* Darkening gradient: blurred edges to black */}
        <div
          className="absolute inset-0 z-[5] bg-[linear-gradient(to_right,#000_0%,transparent_20%,transparent_80%,#000_100%)]"
          aria-hidden="true"
        />

      </div>

      <div className="relative mx-auto flex max-w-[1100px] flex-col px-4 pb-14 pt-8 md:pt-16 z-20">
        <div className="mx-auto max-w-[700px] text-center">
          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto inline-flex items-center gap-2 text-[11px] md:text-[13px] font-bold tracking-[0.4em] text-cyan-200 mb-6"
            style={{
              textShadow: '0 0 12px rgba(0,0,0,1), 0 2px 4px rgba(0,0,0,1), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
            }}
          >
            <span className="opacity-100 uppercase">
              {t('hero.badge').split('•')[0].trim()}
            </span>
            <span className="opacity-60">•</span>
            <span className="opacity-100 uppercase">
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
            className="mt-8 text-[16px] leading-7 text-white font-bold sm:text-[20px] max-w-[540px] mx-auto whitespace-pre-line"
            style={{
              textShadow: '0 2px 8px rgba(0,0,0,1), 0 4px 16px rgba(0,0,0,0.8), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
            }}
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
