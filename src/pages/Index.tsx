import React from 'react';
import { motion } from 'framer-motion';
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

const Index = () => {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1], // Custom cubic-bezier for premium feel
      },
    },
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-transparent text-white no-select no-drag">
      <SEO title="Home" description="Advanced trading education and tools for professional traders." />
      <ProtectionOverlay />
      <AuraBackground />
      <Header />

      <main className="flex-grow">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.section variants={itemVariants}><HeroSection /></motion.section>
          <motion.section variants={itemVariants}><QuizSection /></motion.section>
          <motion.section variants={itemVariants}><TradingSection /></motion.section>
          <motion.section variants={itemVariants}><PhilosophySection /></motion.section>
          <motion.section variants={itemVariants}><CourseOverview /></motion.section>
          <motion.section variants={itemVariants}><AnalyticsSection /></motion.section>
          <motion.section variants={itemVariants}><ProblemSolutionSection /></motion.section>
          <motion.section variants={itemVariants}><TradingResultsSection /></motion.section>
          <motion.section variants={itemVariants}><ChartPreview /></motion.section>
          <motion.section variants={itemVariants}><TestimonialsSection /></motion.section>
          <motion.section variants={itemVariants}><FAQSection /></motion.section>
          <motion.section variants={itemVariants}><InfoSection /></motion.section>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
