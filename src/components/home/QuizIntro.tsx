import React from 'react';
import { m } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Rocket, Briefcase, Zap, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuizIntro = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const features = [
        {
            title: t('quiz.intro.desktop.feature1.title'),
            desc: t('quiz.intro.desktop.feature1.desc'),
            icon: Target,
            color: "from-blue-500 to-cyan-400"
        },
        {
            title: t('quiz.intro.desktop.feature2.title'),
            desc: t('quiz.intro.desktop.feature2.desc'),
            icon: Rocket,
            color: "from-purple-500 to-pink-500"
        },
        {
            title: t('quiz.intro.desktop.feature3.title'),
            desc: t('quiz.intro.desktop.feature3.desc'),
            icon: Briefcase,
            color: "from-amber-400 to-orange-500"
        }
    ];

    const mobileFeatures = [
        {
            title: t('quiz.intro.mobile.feature1.title'),
            desc: t('quiz.intro.mobile.feature1.desc'),
            icon: Zap,
            color: "from-blue-500 to-cyan-400"
        },
        {
            title: t('quiz.intro.mobile.feature2.title'),
            desc: t('quiz.intro.mobile.feature2.desc'),
            icon: TrendingUp,
            color: "from-purple-500 to-pink-500"
        }
    ];

    return (
        <section className="relative py-20 overflow-hidden bg-trading-dark">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Desktop Version */}
                <div className="hidden md:block max-w-4xl mx-auto text-center">
                    <m.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl lg:text-5xl font-bold mb-8 leading-tight"
                    >
                        <span className="block text-trading-accent mb-2">
                            {t('quiz.intro.desktop.title1')}
                        </span>
                        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                            {t('quiz.intro.desktop.title2')}
                        </span>
                    </m.h2>

                    <m.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-xl text-gray-300 mb-10 leading-relaxed"
                    >
                        {t('quiz.intro.desktop.text')}
                    </m.p>

                    <m.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-trading-card/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-12"
                    >
                        <p className="text-lg text-blue-300 font-medium mb-8">
                            {t('quiz.intro.desktop.middle')}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {features.map((item, idx) => (
                                <m.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + idx * 0.1 }}
                                    className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors text-left"
                                >
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg`}>
                                        <item.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h4 className="text-white font-bold mb-2">{item.title}</h4>
                                    <p className="text-sm text-gray-400">{item.desc}</p>
                                </m.div>
                            ))}
                        </div>
                    </m.div>

                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                    >
                        <Button
                            onClick={() => navigate('/pre-registration')}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-7 text-xl rounded-2xl shadow-xl shadow-blue-900/20 group transition-all duration-300 hover:scale-105"
                        >
                            {t('quiz.intro.desktop.cta')}
                            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </m.div>
                </div>

                {/* Mobile Version */}
                <div className="md:hidden">
                    <m.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold mb-6 text-center leading-tight"
                    >
                        <span className="block text-trading-accent mb-1">
                            {t('quiz.intro.mobile.title1')}
                        </span>
                        <span className="block text-white">
                            {t('quiz.intro.mobile.title2')}
                        </span>
                    </m.h2>

                    <m.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-lg text-gray-300 mb-8 text-center"
                    >
                        {t('quiz.intro.mobile.text')}
                    </m.p>

                    <div className="space-y-4 mb-8">
                        <p className="text-blue-300 font-medium text-center mb-4">
                            {t('quiz.intro.mobile.middle')}
                        </p>

                        {mobileFeatures.map((item, idx) => (
                            <m.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5"
                            >
                                <div className={`shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                                    <item.icon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">{item.title}</h4>
                                    <p className="text-xs text-gray-400">{item.desc}</p>
                                </div>
                            </m.div>
                        ))}
                    </div>

                    <m.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-sm text-gray-400 mb-8 text-center px-4 italic"
                    >
                        {t('quiz.intro.mobile.footer')}
                    </m.p>

                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="sticky bottom-4 left-0 right-0 px-4"
                    >
                        <Button
                            onClick={() => navigate('/pre-registration')}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6 text-lg rounded-xl shadow-2xl group active:scale-95 transition-all"
                        >
                            {t('quiz.intro.mobile.cta')}
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </m.div>
                </div>
            </div>
        </section>
    );
};

export default QuizIntro;
