import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface LegalPageLayoutProps {
    children: React.ReactNode;
    title: string;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ children, title }) => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-trading-dark text-gray-300">
            <Header />
            <main className="flex-grow pt-8 pb-16 px-4">
                <div className="max-w-4xl mx-auto bg-trading-card/50 p-8 md:p-12 rounded-2xl border border-white/5 shadow-xl backdrop-blur-sm">
                    {/* Top Back Button */}
                    <button
                        type="button"
                        onClick={() => {
                            if (window.history.length > 1) {
                                navigate(-1);
                            } else {
                                navigate('/');
                            }
                        }}
                        className="mb-6 flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>{t('legal.back')}</span>
                    </button>

                    <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white border-b border-gray-700 pb-4">
                        {title}
                    </h1>
                    <div className="prose prose-invert prose-gray max-w-none mb-12">
                        {children}
                    </div>

                    {/* Footer Navigation */}
                    <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <button
                            type="button"
                            onClick={() => {
                                // Simple check to see if we can go back, else go home
                                if (window.history.length > 1) {
                                    navigate(-1);
                                } else {
                                    navigate('/');
                                }
                            }}
                            className="relative z-10 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group cursor-pointer"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span>{t('legal.back')}</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors cursor-pointer"
                        >
                            {t('nav.overview')}
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default LegalPageLayout;

