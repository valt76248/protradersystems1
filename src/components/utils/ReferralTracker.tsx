
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ReferralTracker = () => {
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const ref = params.get('ref');

        if (ref) {
            // Store the referral code in localStorage
            // We use a prefix to keep it organized
            localStorage.setItem('referral_code', ref.toUpperCase());

            // Also store the timestamp to handle expiration if needed (default 30 days)
            localStorage.setItem('referral_timestamp', Date.now().toString());

            console.log('Referral code captured:', ref.toUpperCase());
        }
    }, [location]);

    return null; // This component doesn't render anything
};

export default ReferralTracker;
