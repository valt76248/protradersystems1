import LegalPageLayout from '../components/layout/LegalPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';

const PublicOffer = () => {
    const { t } = useLanguage();
    return (
        <LegalPageLayout title={t('legal.public_offer')}>
            <div
                className="text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t('offer.content') }}
            />
        </LegalPageLayout>
    );
};


export default PublicOffer;
