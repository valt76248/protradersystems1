
import React from 'react';
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

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-trading-dark text-white no-select no-drag">
      <ProtectionOverlay />
      <Header />

      <main className="flex-grow">
        <HeroSection />
        <QuizSection />
        <TradingSection />
        <PhilosophySection />
        <CourseOverview />
        <AnalyticsSection />
        <ProblemSolutionSection />
        <TradingResultsSection />
        <ChartPreview />
        <TestimonialsSection />
        <FAQSection />
        <InfoSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
