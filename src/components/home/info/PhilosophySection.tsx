import React from 'react';
import { Target, TrendingUp, Shield, ShieldAlert, BarChart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const PhilosophySection = () => {
    const { t } = useLanguage();

    const systemFeatures = [
        {
            title: t('features.card1.title'),
            desc: t('features.card1.desc'),
            icon: <Target className="h-6 w-6 text-cyan-400" />,
        },
        {
            title: t('features.card2.title'),
            desc: t('features.card2.desc'),
            icon: <ShieldAlert className="h-6 w-6 text-cyan-400" />,
        },
        {
            title: t('features.card3.title'),
            desc: t('features.card3.desc'),
            icon: <BarChart className="h-6 w-6 text-cyan-400" />,
        },
    ];

    return (
        <section className="w-full bg-trading-dark pb-24 relative overflow-hidden">
            {/* 1. Full Width Image Banner */}
            <div
                className="w-full h-[80vh] md:h-[100vh] relative bg-black bg-fixed bg-philosophy-vintage"
                aria-label="Trading Philosophy - Compass and Discipline"
                role="img"
            />

            {/* 2. Content Container */}
            <div className="max-w-[1100px] mx-auto px-4 relative z-20 -mt-20 md:-mt-32">
                {/* Discipline & Risk Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="w-fit mx-auto bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 mb-20 shadow-2xl"
                >
                    <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-center md:text-left">
                        <div className="p-4 bg-yellow-500/10 rounded-full">
                            <Shield className="w-12 h-12 text-yellow-500" />
                        </div>
                        <div>
                            <h4 className="text-2xl font-bold text-white mb-2">Дисциплина и Риск-менеджмент</h4>
                            <p className="text-gray-300 text-lg">Основа стабильного успеха и долгосрочного роста капитала</p>
                        </div>
                    </div>
                </motion.div>

                {/* Section "О системе" (from image) */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight"
                        >
                            {t('features.title')}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-white/60 max-w-2xl mx-auto"
                        >
                            {t('features.subtitle')}
                        </motion.p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {systemFeatures.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_-60px_rgba(34,211,238,0.45)] backdrop-blur hover:bg-white/10 transition-all duration-300 group"
                            >
                                <div className="p-3 rounded-2xl bg-white/5 w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-white/60 leading-relaxed font-medium">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Philosophy and Goals Text */}
                <div className="space-y-16">
                    <div className="text-center space-y-4">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold text-white leading-tight"
                        >
                            Философия и цели <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                                системы ProTrader Systems
                            </span>
                        </motion.h2>
                        <div className="h-1 w-24 bg-purple-500 rounded-full mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg text-gray-300 leading-relaxed">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <p>
                                Торговая система <span className="text-white font-medium">ProTrader Systems</span> представляет собой комплексный, основанный на строгих правилах подход к трейдингу. Ее основная цель — идентификация и использование устойчивых трендовых движений.
                            </p>
                            <p>
                                Система создана для того, чтобы дать трейдеру преимущество за счет своевременного входа в тренд и грамотного сопровождения позиции.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <p>
                                Ключевая философия заключается в торговле исключительно по направлению основного тренда. Мы отказываемся от фиксированных целей по прибыли в пользу максимизации каждого движения.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <div className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl border border-white/10">
                                    <Target className="w-5 h-5 text-purple-400" />
                                    <span className="text-sm font-medium">Торговля по тренду</span>
                                </div>
                                <div className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl border border-white/10">
                                    <TrendingUp className="w-5 h-5 text-green-400" />
                                    <span className="text-sm font-medium">Максимизация прибыли</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Quote Block */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto mt-12"
                    >
                        <blockquote className="relative p-10 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-3xl border border-white/5">
                            <p className="relative z-10 text-xl md:text-2xl text-center text-gray-200 font-light italic leading-relaxed font-serif">
                                "Обучение в этой системе напоминает сборку высокоточного механизма: сначала вы изучаете каждую деталь (индикаторы), затем понимаете среду, в которой он работает (режимы цены), и только после этого приступаете к запуску (входам) сопровождению и управлению процессом (выходам)."
                            </p>
                        </blockquote>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PhilosophySection;
