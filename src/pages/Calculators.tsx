import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LotCalculator from '@/components/calculators/LotCalculator';
import MarginCalculator from '@/components/calculators/MarginCalculator';
import SwapCalculator from '@/components/calculators/SwapCalculator';
import CompoundCalculator from '@/components/calculators/CompoundCalculator';
import RiskOfRuinCalculator from '@/components/calculators/RiskOfRuinCalculator';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Calculator, Wallet, TrendingUp, Moon, ShieldAlert } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import SEO from '@/components/utils/SEO';

export default function Calculators() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('lot');

    // URL для Production API (будет заменено на реальный домен после деплоя Workers)
    // Для тестирования можно использовать локальный адрес
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <SEO title="Calculators" description="Professional trading calculators for Risk, Lot size, Margin, and Compound interest." />
            <Header />

            <main className="container mx-auto px-4 py-24 md:py-32">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            {t('calc.title')}
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            {t('calc.subtitle')}
                        </p>
                    </div>

                    <Tabs defaultValue="lot" value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-muted/50 p-1 border border-border mb-8 rounded-xl h-auto">
                            <TabsTrigger
                                value="lot"
                                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white py-3 rounded-lg flex items-center gap-2 transition-all"
                            >
                                <Calculator className="h-4 w-4" />
                                <span className="hidden md:inline">{t('calc.lot')}</span>
                                <span className="md:hidden">{t('calc.lot_short')}</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="margin"
                                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white py-3 rounded-lg flex items-center gap-2 transition-all"
                            >
                                <Wallet className="h-4 w-4" />
                                <span className="hidden md:inline">{t('calc.margin')}</span>
                                <span className="md:hidden">{t('calc.margin')}</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="swap"
                                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white py-3 rounded-lg flex items-center gap-2 transition-all"
                            >
                                <Moon className="h-4 w-4" />
                                <span className="hidden md:inline">{t('calc.swap')}</span>
                                <span className="md:hidden">{t('calc.swap')}</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="compound"
                                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white py-3 rounded-lg flex items-center gap-2 transition-all"
                            >
                                <TrendingUp className="h-4 w-4" />
                                <span className="hidden md:inline">{t('calc.compound')}</span>
                                <span className="md:hidden">{t('calc.compound_short')}</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="ruin"
                                className="data-[state=active]:bg-rose-600 data-[state=active]:text-white py-3 rounded-lg flex items-center gap-2 transition-all"
                            >
                                <ShieldAlert className="h-4 w-4" />
                                <span className="hidden md:inline">{t('calc.risk')}</span>
                                <span className="md:hidden">{t('calc.risk')}</span>
                            </TabsTrigger>
                        </TabsList>

                        <div className="animate-in fade-in duration-300">
                            <TabsContent value="lot" className="mt-0">
                                <LotCalculator apiUrl={API_URL} />
                            </TabsContent>

                            <TabsContent value="margin" className="mt-0">
                                <MarginCalculator apiUrl={API_URL} />
                            </TabsContent>

                            <TabsContent value="swap" className="mt-0">
                                <SwapCalculator apiUrl={API_URL} />
                            </TabsContent>

                            <TabsContent value="compound" className="mt-0">
                                <CompoundCalculator apiUrl={API_URL} />
                            </TabsContent>

                            <TabsContent value="ruin" className="mt-0">
                                <RiskOfRuinCalculator apiUrl={API_URL} />
                            </TabsContent>
                        </div>
                    </Tabs>

                    <div className="mt-12 p-6 bg-card/30 border border-border rounded-xl text-center">
                        <p className="text-muted-foreground text-sm">
                            {t('calc.disclaimer')}
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
