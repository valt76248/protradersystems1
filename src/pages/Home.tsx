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
import QuizIntro from '../components/home/QuizIntro';
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
  return (
    <div className="relative min-h-screen flex flex-col bg-transparent text-white no-select no-drag">
      <SEO title={t('seo.home.title')} description={t('seo.home.description')} />
      <ProtectionOverlay />
      <AuraBackground />
      <Header />

      <main className="flex-grow">
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <m.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}><HeroSection /></m.section>
          <m.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}><QuizIntro /></m.section>
          <m.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}><QuizSection /></m.section>
          <m.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}><TradingSection /></m.section>
          <m.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}><PhilosophySection /></m.section>
          <m.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}><CourseOverview /></m.section>
          <m.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}><AnalyticsSection /></m.section>
          <m.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}><ProblemSolutionSection /></m.section>
          <m.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}><TradingResultsSection /></m.section>
          <m.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}><ChartPreview /></m.section>
          <m.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}><TestimonialsSection /></m.section>
          <m.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}><FAQSection /></m.section>
          <m.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}><InfoSection /></m.section>
        </m.div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
