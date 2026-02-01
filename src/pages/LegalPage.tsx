
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import LegalPageLayout from '../components/layout/LegalPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';

const LegalPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const { t } = useLanguage();

    const config: Record<string, { titleKey: string; contentKey: string; className?: string }> = {
        'public-offer': {
            titleKey: 'legal.public_offer',
            contentKey: 'offer.content',
            className: 'text-gray-300'
        },
        'privacy-policy': {
            titleKey: 'privacy.title',
            contentKey: 'privacy.content',
            className: 'text-zinc-400'
        },
        'eligible-clients': {
            titleKey: 'legal.eligible_clients_title',
            contentKey: 'legal.eligible_clients_content',
            className: 'text-gray-300'
        }
    };

    const page = slug ? config[slug] : null;

    if (!page) {
        return <Navigate to="/404" replace />;
    }

    return (
        <LegalPageLayout title={t(page.titleKey)}>
            <div
                className={`${page.className} leading-relaxed`}
                dangerouslySetInnerHTML={{ __html: t(page.contentKey) }}
            />
        </LegalPageLayout>
    );
};

export default LegalPage;
