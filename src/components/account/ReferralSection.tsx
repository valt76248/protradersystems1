import React, { useState, useEffect } from 'react';
import { Copy, Share2, Gift, CheckCircle, DollarSign, Users, TrendingUp, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { useLanguage } from '@/contexts/LanguageContext';

interface ReferralStats {
    totalReferrals: number;
    successfulReferrals: number;
    pendingReferrals: number;
    totalEarnings: number;
    pendingEarnings: number;
}

interface ReferralSectionProps {
    userId: string;
}

export const ReferralSection: React.FC<ReferralSectionProps> = ({ userId }) => {
    const { toast } = useToast();
    const { t } = useLanguage();
    const [copied, setCopied] = useState(false);
    const [stats, setStats] = useState<ReferralStats>({
        totalReferrals: 0,
        successfulReferrals: 0,
        pendingReferrals: 0,
        totalEarnings: 0,
        pendingEarnings: 0
    });

    // Generate referral link
    const referralCode = userId.slice(0, 8).toUpperCase();
    const referralLink = `${window.location.origin}/?ref=${referralCode}`;

    // Recalculated Commission: 5% of Main Course (699) = ~35.
    // VIP Commission: 10% of Main Course = ~70.
    const getCommissionAmount = (count: number) => {
        const baseRate = count >= 3 ? 0.10 : 0.05;
        return 699 * baseRate;
    };

    useEffect(() => {
        if (userId) {
            fetchReferralStats();
        }
    }, [userId]);

    const fetchReferralStats = async () => {
        try {
            // Fetch referral stats from Supabase
            const { data, error } = await supabase
                .from('referrals')
                .select('*')
                .eq('referrer_id', userId);

            if (error) {
                console.error('Error fetching referrals:', error);
                return;
            }

            if (data) {
                const successful = data.filter(r => r.status === 'completed');
                const pending = data.filter(r => r.status === 'pending');

                // Calculate based on current tier
                const commissionPerSale = getCommissionAmount(successful.length);

                setStats({
                    totalReferrals: data.length,
                    successfulReferrals: successful.length,
                    pendingReferrals: pending.length,
                    totalEarnings: successful.length * commissionPerSale,
                    pendingEarnings: pending.length * commissionPerSale
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(referralLink);
            setCopied(true);
            toast({
                title: t('referral.section.copy_success'),
                description: t('referral.section.copy_success_desc')
            });
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const shareToTelegram = () => {
        const text = encodeURIComponent(t('referral.section.share_text'));
        const url = encodeURIComponent(referralLink);
        window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
    };

    const shareLink = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'ProTrader Systems',
                    text: t('referral.section.share_text'),
                    url: referralLink
                });
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            copyToClipboard();
        }
    };

    return (
        <div className="space-y-6">
            {/* Main Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-green-900/30 to-green-800/20 border-green-800/50">
                    <CardContent className="p-4 text-center">
                        <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
                        <div className="text-3xl font-bold text-green-400">${Math.round(stats.totalEarnings)}</div>
                        <div className="text-xs text-gray-400">{t('referral.section.stats.earned')}</div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 border-yellow-800/50">
                    <CardContent className="p-4 text-center">
                        <TrendingUp className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                        <div className="text-3xl font-bold text-yellow-400">${Math.round(stats.pendingEarnings)}</div>
                        <div className="text-xs text-gray-400">{t('referral.section.stats.pending')}</div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border-purple-800/50">
                    <CardContent className="p-4 text-center">
                        <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                        <div className="text-3xl font-bold text-purple-400">{stats.successfulReferrals}</div>
                        <div className="text-xs text-gray-400">{t('referral.section.stats.successful')}</div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border-blue-800/50">
                    <CardContent className="p-4 text-center">
                        <Gift className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                        <div className="text-3xl font-bold text-blue-400">{stats.pendingReferrals}</div>
                        <div className="text-xs text-gray-400">{t('referral.section.stats.waiting')}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Referral Link Card */}
            <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-800/50">
                <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                            <DollarSign className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">{t('referral.section.title')}</h3>
                            <p className="text-sm text-gray-400">{t('referral.section.commission_note')}</p>
                        </div>
                    </div>

                    {/* Referral Link Input */}
                    <div className="mb-6">
                        <label className="text-sm text-gray-400 mb-2 block">{t('referral.section.link_label')}</label>
                        <div className="bg-gray-900 rounded-lg p-3 flex items-center gap-2 border border-gray-700">
                            <code className="flex-1 text-sm text-green-400 truncate font-mono">{referralLink}</code>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={copyToClipboard}
                                className="shrink-0"
                            >
                                {copied ? (
                                    <CheckCircle className="h-5 w-5 text-green-400" />
                                ) : (
                                    <Copy className="h-5 w-5 text-gray-400" />
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Share Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                            onClick={copyToClipboard}
                            variant="outline"
                            className="flex-1 border-purple-700 text-purple-400 hover:bg-purple-900/30"
                        >
                            <Copy className="h-4 w-4 mr-2" />
                            {t('referral.section.copy_link')}
                        </Button>
                        <Button
                            onClick={shareToTelegram}
                            className="flex-1 bg-[#0088cc] hover:bg-[#0077b5]"
                        >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            {t('referral.section.share_tg')}
                        </Button>
                        <Button
                            onClick={shareLink}
                            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        >
                            <Share2 className="h-4 w-4 mr-2" />
                            {t('referral.section.share')}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* How It Works */}
            <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6">
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Gift className="h-5 w-5 text-purple-400" />
                        {t('referral.section.how_it_works')}
                    </h4>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="flex items-start gap-3">
                            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white text-sm font-bold flex items-center justify-center shrink-0">1</span>
                            <div>
                                <h5 className="font-semibold text-white mb-1">{t('referral.section.step1_title')}</h5>
                                <p className="text-sm text-gray-400">{t('referral.section.step1_desc')}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white text-sm font-bold flex items-center justify-center shrink-0">2</span>
                            <div>
                                <h5 className="font-semibold text-white mb-1">{t('referral.section.step2_title')}</h5>
                                <p className="text-sm text-gray-400">{t('referral.section.step2_desc')}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white text-sm font-bold flex items-center justify-center shrink-0">3</span>
                            <div>
                                <h5 className="font-semibold text-white mb-1">{t('referral.section.step3_title')}</h5>
                                <p className="text-sm text-gray-400">{t('referral.section.step3_desc')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Benefits */}
                    <div className="mt-6 pt-6 border-t border-gray-800">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <CheckCircle className="h-4 w-4 text-green-400" />
                                {t('referral.section.benefit1')}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <CheckCircle className="h-4 w-4 text-green-400" />
                                {t('referral.section.benefit2')}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <CheckCircle className="h-4 w-4 text-green-400" />
                                {t('referral.section.benefit3')}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <CheckCircle className="h-4 w-4 text-green-400" />
                                {t('referral.section.benefit4')}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* VIP Partner Info */}
            <Card className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-800/50">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold mb-2">
                                {t('referral.section.vip_title')}
                            </Badge>
                            <h4 className="text-lg font-bold text-white">{t('referral.section.vip_condition')}</h4>
                            <p className="text-sm text-gray-400">{t('referral.section.vip_desc')}</p>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold text-yellow-400">{stats.successfulReferrals}/3</div>
                            <div className="text-xs text-gray-400">{t('referral.section.vip_progress')}</div>
                        </div>
                    </div>

                    {/* Progress bar to VIP */}
                    <div className="mt-4">
                        <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all"
                                style={{ width: `${Math.min(stats.successfulReferrals / 3 * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ReferralSection;
