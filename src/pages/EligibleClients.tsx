import React from 'react';
import LegalPageLayout from '../components/layout/LegalPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';

const EligibleClients = () => {
    const { t } = useLanguage();
    return (
        <LegalPageLayout title={t('legal.eligible_clients_title')}>
            <div
                className="text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t('legal.eligible_clients_content') }}
            />
        </LegalPageLayout>

    );
};

export default EligibleClients;
