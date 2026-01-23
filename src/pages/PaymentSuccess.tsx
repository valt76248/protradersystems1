
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Play, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const PaymentSuccess = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-trading-dark text-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">{t('payment.success.title')}</h1>
            <p className="text-xl text-gray-300">
              {t('payment.success.subtitle')}
            </p>
          </div>

          <Card className="bg-trading-card border-gray-800 mb-8">
            <CardHeader>
              <CardTitle>{t('payment.success.order_details')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 text-left">
                <div>
                  <p className="text-gray-400">{t('payment.success.order_number')}</p>
                  <p className="font-semibold">#TRD-2024-001234</p>
                </div>
                <div>
                  <p className="text-gray-400">{t('payment.success.purchase_date')}</p>
                  <p className="font-semibold">{new Date().toLocaleDateString(language === 'uk' ? 'uk-UA' : 'ru-RU')}</p>
                </div>
                <div>
                  <p className="text-gray-400">{t('payment.success.course')}</p>
                  <p className="font-semibold">ProTrader Systems</p>
                </div>
                <div>
                  <p className="text-gray-400">{t('payment.success.amount')}</p>
                  <p className="font-semibold">$499 USDT</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card className="bg-trading-card border-gray-800">
              <CardContent className="p-6 text-center">
                <Play className="h-8 w-8 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{t('payment.success.start_learning')}</h3>
                <p className="text-sm text-gray-400 mb-4">
                  {t('payment.success.start_now')}
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  {t('payment.success.go_to_course')}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-trading-card border-gray-800">
              <CardContent className="p-6 text-center">
                <Download className="h-8 w-8 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{t('payment.success.download')}</h3>
                <p className="text-sm text-gray-400 mb-4">
                  {t('payment.success.download_desc')}
                </p>
                <Button variant="outline" className="w-full border-gray-700">
                  {t('payment.success.download_btn')}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-trading-card border-gray-800">
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 text-purple-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{t('payment.success.email')}</h3>
                <p className="text-sm text-gray-400 mb-4">
                  {t('payment.success.email_desc')}
                </p>
                <Button variant="outline" className="w-full border-gray-700">
                  {t('payment.success.resend')}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">{t('payment.success.welcome')}</h3>
            <p className="text-gray-300 mb-4">
              {t('payment.success.access')}
            </p>
            <div className="grid gap-2 md:grid-cols-2 text-left max-w-2xl mx-auto">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>{t('payment.success.feature1')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>{t('payment.success.feature2')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>{t('payment.success.feature3')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>{t('payment.success.feature4')}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => window.location.href = '/account'}
            >
              {t('payment.success.account')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-700"
              onClick={() => window.location.href = '/courses'}
            >
              {t('payment.success.other_courses')}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;
