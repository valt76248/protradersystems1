import React from 'react';
import { m, useReducedMotion } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import CourseOverview from '../components/home/CourseOverview';
import ChartPreview from '../components/home/trading/ChartPreview';
import TradingSection from '../components/home/trading/TradingSection';
import AnalyticsSection from '../components/home/info/AnalyticsSection';
import ProtectionOverlay from '../components/shared/ProtectionOverlay';
import QuizSection from '../components/home/QuizSection';
import ProblemSolutionSection from '../components/home/problem-solution/ProblemSolutionSection';
import FAQSection from '../components/home/info/FAQSection';
import InfoSection from '../components/home/info/InfoSection';
import PhilosophySection from '../components/home/info/PhilosophySection';
import TradingResultsSection from '../components/home/trading/TradingResultsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import SEO from '../components/utils/SEO';
import AuraBackground from '../components/ui/AuraBackground';
import { useLanguage } from '@/contexts/LanguageContext';

const Home = () => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-transparent text-white no-select no-drag">
      <SEO title={t('seo.home.title')} description={t('seo.home.description')} />
      <ProtectionOverlay />
      <AuraBackground />
      <Header />

      <main className="flex-grow">
        <m.div
          variants={containerVariants}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          animate="visible"
        >
          <m.section variants={itemVariants}><HeroSection /></m.section>
          <m.section variants={itemVariants}><QuizSection /></m.section>
          <m.section variants={itemVariants}><TradingSection /></m.section>
          <m.section variants={itemVariants}><PhilosophySection /></m.section>
          <m.section variants={itemVariants}><CourseOverview /></m.section>
          <m.section variants={itemVariants}><AnalyticsSection /></m.section>
          <m.section variants={itemVariants}><ProblemSolutionSection /></m.section>
          <m.section variants={itemVariants}><TradingResultsSection /></m.section>
          <m.section variants={itemVariants}><ChartPreview /></m.section>
          <m.section variants={itemVariants}><TestimonialsSection /></m.section>
          <m.section variants={itemVariants}><FAQSection /></m.section>
          <m.section variants={itemVariants}><InfoSection /></m.section>
        </m.div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
