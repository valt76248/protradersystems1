
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bitcoin, CheckCircle, Infinity, BookOpen, Shield, Users } from 'lucide-react';
import { FeaturesSection } from '@/components/course-ui/FeaturesSection';

const Courses = () => {
  const { t } = useLanguage();

  const courseFeatures = [
    t('courses.feature1'),
    t('courses.feature2'),
    t('courses.feature3'),
    t('courses.feature4'),
  ];

  const handleCryptoPayment = () => {
    // Redirect to crypto payment page
    window.location.href = '/pre-registration';
  };

  return (
    <div className="min-h-screen flex flex-col bg-trading-dark text-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('courses.catalog-title')}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('courses.catalog-description')}
          </p>
        </div>

        <div className="flex justify-center">
          <div className="max-w-md w-full">
            <Card className="bg-trading-card border-gray-800 overflow-hidden group hover:border-blue-500 transition-colors">
              <div className="relative">
                <img
                  src="/images/elite_mentorship.png"
                  alt="ProTrader Systems: Elite Mentorship"
                  className="w-full h-56 object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  {t('courses.badge_pro')}
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-xl mb-2">ProTrader Systems</CardTitle>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4 text-blue-400" />
                    <span>{t('courses.sessions_count')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Infinity className="h-4 w-4 text-green-400" />
                    <span>{t('courses.lifetime')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-purple-400" />
                    <span>{t('courses.community')}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-300 mb-4">
                  {t('courses.description_new')}
                </p>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">{t('course.what_you_learn')}</h4>
                  <ul className="space-y-1">
                    {courseFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-green-400">$499</span>
                    <span className="text-sm text-gray-500">USDT</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Shield className="h-3 w-3" />
                    <span>{t('courses.secure')}</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold"
                  onClick={handleCryptoPayment}
                >
                  <Bitcoin className="mr-2 h-4 w-4" />
                  {t('courses.pay_crypto')}
                </Button>

                <p className="text-xs text-center text-gray-500 mt-3">
                  {t('courses.crypto_note')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <FeaturesSection />
      </main>

      <Footer />
    </div>
  );
};

export default Courses;
