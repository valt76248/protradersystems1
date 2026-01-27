import React from 'react';
import LegalPageLayout from '../components/layout/LegalPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';

const PrivacyPolicy = () => {
    const { t } = useLanguage();

    return (
        <LegalPageLayout title={t('privacy.title')}>
            <div
                className="text-zinc-400 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t('privacy.content') }}
            />
        </LegalPageLayout>
    );
};

export default PrivacyPolicy;

