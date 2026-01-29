import React from 'react';
import { Target, TrendingUp, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const PhilosophySection = () => {
    const { t } = useLanguage();



    return (
        <section className="w-full bg-trading-dark pb-24 relative overflow-hidden">
            {/* 1. Full Width Image Banner */}
            {/* 1. Full Width Image Banner */}
            <div
                className="w-full h-[85vh] md:h-[100vh] relative bg-black"
                aria-label="Trading Philosophy - Compass and Discipline"
                role="img"
            >
                <div
                    className="absolute inset-0 bg-no-repeat bg-center bg-cover bg-fixed md:bg-[length:100%_auto] bg-[position:center_30%]"
                    style={{
                        backgroundImage: "url('/images/discipline_bg.png')",
                    }}
                />

                {/* Centered Text Overlay - No Darkening Overlay as requested */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-center px-4"
                    >
                        <h2
                            className="text-4xl md:text-7xl font-serif italic font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#2563eb] to-[#0ddbbd] mb-6 filter drop-shadow-[2px_2px_2px_rgba(0,0,0,0.9)]"
                            style={{
                                // Adding a subtle stroke to match the reference's distinct edging if needed, 
                                // but the drop-shadow usually handles the 'pop'.
                                // WebkitTextStroke: '1px rgba(0,0,0,0.3)', 
                            }}
                        >
                            Дисциплина и Риск-менеджмент
                        </h2>
                        <p className="text-white/90 text-lg md:text-2xl font-light tracking-wide max-w-3xl mx-auto drop-shadow-md">
                            {/* {t('features.card2.desc')} - Using direct text as placeholder if translation not exact match for the image */}
                            Основа стабильного успеха и долгосрочного роста капитала
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* 2. Content Container */}
            <div className="max-w-[1100px] mx-auto px-4 relative z-20 mt-16">
                {/* Removed Previous Badge since it's now a hero Overlay */}



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
