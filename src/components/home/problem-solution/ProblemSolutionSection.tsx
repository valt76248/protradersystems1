import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { m, useScroll, useTransform } from 'framer-motion';
import ProblemSolutionCard, { ProblemSolutionItem } from './ProblemSolutionCard';

const ProblemSolutionSection = () => {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const problemsSolutions: ProblemSolutionItem[] = [
        {
            problem: t('problems.base.problem'),
            problemDesc: t('problems.base.problemDesc'),
            solution: t('problems.base.solution'),
            solutionDesc: t('problems.base.solutionDesc'),
        },
        {
            problem: t('problems.system.problem'),
            problemDesc: t('problems.system.problemDesc'),
            solution: t('problems.system.solution'),
            solutionDesc: t('problems.system.solutionDesc'),
        },
        {
            problem: t('problems.isolation.problem'),
            problemDesc: t('problems.isolation.problemDesc'),
            solution: t('problems.isolation.solution'),
            solutionDesc: t('problems.isolation.solutionDesc'),
        },
        {
            problem: t('problems.deposit.problem'),
            problemDesc: t('problems.deposit.problemDesc'),
            solution: t('problems.deposit.solution'),
            solutionDesc: t('problems.deposit.solutionDesc'),
        },
        {
            problem: t('problems.burnout.problem'),
            problemDesc: t('problems.burnout.problemDesc'),
            solution: t('problems.burnout.solution'),
            solutionDesc: t('problems.burnout.solutionDesc'),
        },
        {
            problem: t('problems.chaos.problem'),
            problemDesc: t('problems.chaos.problemDesc'),
            solution: t('problems.chaos.solution'),
            solutionDesc: t('problems.chaos.solutionDesc'),
        },
        {
            problem: t('problems.time.problem'),
            problemDesc: t('problems.time.problemDesc'),
            solution: t('problems.time.solution'),
            solutionDesc: t('problems.time.solutionDesc'),
        },
        {
            problem: t('problems.signals.problem'),
            problemDesc: t('problems.signals.problemDesc'),
            solution: t('problems.signals.solution'),
            solutionDesc: t('problems.signals.solutionDesc'),
        },
    ];

    const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="bg-trading-dark relative"
            style={{ height: `${problemsSolutions.length * 80 + 100}vh` }}
        >
            <div className="absolute inset-0 z-0 opacity-100 bg-ledger-desk" />
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center relative z-10">

                {/* Header - Stays at top */}
                <m.div
                    style={{ opacity: titleOpacity }}
                    className="absolute top-8 left-0 right-0 z-30 pointer-events-none"
                >
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-5xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 pb-2">
                            {t('problems.title')}
                        </h2>
                        <h3 className="text-xl md:text-3xl text-center font-normal text-gray-400">
                            {t('problems.subtitle')}
                        </h3>
                    </div>
                </m.div>

                {/* Cards Container */}
                <div className="w-full h-full flex items-center justify-center relative">
                    {problemsSolutions.map((item, index) => {
                        const step = 1 / problemsSolutions.length;
                        const start = index * step;
                        const end = (index + 1) * step;

                        // Calculate transform values based on progress
                        const opacity = useTransform(scrollYProgress,
                            [start - step * 0.5, start, end, end + step * 0.5],
                            [0, 1, 1, 0]
                        );

                        const y = useTransform(scrollYProgress,
                            [start, end],
                            ["0%", "-100%"]
                        );

                        const scale = useTransform(scrollYProgress,
                            [start, end],
                            [1, 0.8]
                        );

                        return (
                            <m.div
                                key={index}
                                style={{
                                    position: 'absolute',
                                    zIndex: problemsSolutions.length - index,
                                    opacity,
                                    y,
                                    scale,
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    willChange: 'transform, opacity'
                                }}
                            >
                                <ProblemSolutionCard
                                    item={item}
                                    index={index}
                                    total={problemsSolutions.length}
                                />
                            </m.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProblemSolutionSection;
