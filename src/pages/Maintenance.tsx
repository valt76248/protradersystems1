
import React from 'react';
import { Construction } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Maintenance = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen w-full bg-[#020617] flex items-center justify-center p-4">
            {/* Background gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-blue-900/20 rounded-full blur-[120px]" />
                <div className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-purple-900/20 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-md w-full bg-slate-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl text-center">
                <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-blue-500/10 rounded-full ring-1 ring-blue-500/50 animate-pulse">
                        <Construction className="w-12 h-12 text-blue-400" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-white mb-2 font-heading tracking-tight">
                    {t('maintenance.title')}
                </h1>

                <p className="text-slate-200 mb-4 font-semibold">
                    {t('maintenance.subtitle')}
                </p>

                <p className="text-slate-400 mb-8 leading-relaxed">
                    {t('maintenance.description')}
                </p>

                <div className="p-4 bg-slate-800/50 rounded-lg border border-white/5 text-sm text-slate-500">
                    <p>{t('maintenance.check_back')}</p>
                </div>
            </div>
        </div>
    );
};

export default Maintenance;
