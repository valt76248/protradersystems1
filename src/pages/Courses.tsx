
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bitcoin, CheckCircle, Infinity, BookOpen, Shield, Users } from 'lucide-react';
import { FeaturesSection } from '@/components/course-ui/FeaturesSection';

import { useNavigate } from 'react-router-dom';
import SEO from '@/components/utils/SEO';

const Courses = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const courses = [
    {
      id: 'pro-systems',
      title: 'ProTrader Systems',
      badge: t('courses.badge_pro'),
      image: '/images/elite_mentorship.png',
      sessions: t('courses.sessions_count'),
      description: t('courses.description_new'),
      price: t('courses.pro.price'),
      features: [
        t('courses.feature1'),
        t('courses.feature2'),
        t('courses.feature3'),
        t('courses.feature4'),
        t('courses.community'),
      ]
    },
    {
      id: 'master-mindset',
      title: t('courses.psychology.title'),
      subtitle: t('courses.psychology.subtitle'),
      badge: t('courses.psychology.badge'),
      image: '/images/psychology_course.png',
      sessions: '12 уроков',
      description: t('courses.psychology.description'),
      price: t('courses.psychology.price'),
      features: [
        t('courses.psychology.feature1'),
        t('courses.psychology.feature2'),
        t('courses.psychology.feature3'),
        t('courses.psychology.feature4'),
        t('courses.psychology.feature5'),
      ]
    },
    {
      id: 'vip-mentorship',
      title: t('courses.vip.title'),
      subtitle: t('courses.vip.subtitle'),
      badge: t('courses.vip.badge'),
      image: '/images/vip_support_v2.png',
      sessions: t('courses.lifetime'),
      description: t('courses.vip.description'),
      price: t('courses.vip.price'),
      features: [
        t('courses.vip.feature1'),
        t('courses.vip.feature2'),
        t('courses.vip.feature3'),
        t('courses.vip.feature4'),
        t('courses.vip.feature5'),
      ]
    }
  ];

  const handleCryptoPayment = () => {
    navigate('/pre-registration');
  };

  return (
    <div className="min-h-screen flex flex-col bg-trading-dark text-white">
      <SEO
        title={t('seo.courses.title')}
        description={t('seo.courses.description')}
      />

      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 glow-text-sky leading-tight px-4">{t('courses.catalog-title')}</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
            {t('courses.catalog-description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto px-4">
          {courses.map((course) => (
            <div key={course.id} className="flex flex-col h-full">
              <Card className="bg-trading-card/50 backdrop-blur-xl border-white/10 overflow-hidden group hover:border-blue-500/50 transition-all duration-500 flex flex-col h-full shadow-2xl hover:shadow-blue-500/10">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-none shadow-lg px-3 py-1">
                    {course.badge}
                  </Badge>
                </div>

                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-2xl font-bold group-hover:text-blue-400 transition-colors">
                      {course.title}
                    </CardTitle>
                  </div>
                  {course.subtitle && (
                    <p className="text-blue-400 font-medium text-sm mb-3">{course.subtitle}</p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-full">
                      <BookOpen className="h-3.5 w-3.5 text-blue-400" />
                      <span>{course.sessions}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-full">
                      <Infinity className="h-3.5 w-3.5 text-green-400" />
                      <span>{t('courses.lifetime')}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col grow">
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="mb-8 grow">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
                      {t('course.what_you_learn')}
                    </h4>
                    <ul className="space-y-3">
                      {course.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm text-gray-300">
                          <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-6 p-4 bg-white/5 rounded-2xl border border-white/5 shadow-inner">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-white">${course.price}</span>
                        <span className="text-sm font-bold text-gray-500">USDT</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium bg-black/20 px-2 py-1 rounded-lg">
                        <Shield className="h-3.5 w-3.5 text-emerald-500" />
                        <span>{t('courses.secure')}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <Button
                        className="w-full h-12 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold text-base rounded-2xl shadow-xl shadow-orange-500/20 transform active:scale-[0.98] transition-all"
                        onClick={() => navigate('/pre-registration?intent=payment')}
                      >
                        <Bitcoin className="mr-2 h-5 w-5" />
                        {t('courses.pay_crypto')}
                      </Button>

                      <Button
                        variant="ghost"
                        className="w-full h-12 border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 font-bold text-base rounded-2xl transition-all"
                        onClick={() => navigate('/pre-registration?intent=consultation')}
                      >
                        {t('courses.consultation')}
                      </Button>
                    </div>

                    <p className="text-[10px] text-center text-gray-600 mt-4 uppercase tracking-widest font-bold">
                      {t('courses.crypto_note')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <FeaturesSection />
      </main>

      <Footer />
    </div>
  );
};

export default Courses;
