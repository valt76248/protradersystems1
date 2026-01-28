import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Copy, X, CheckCircle, ExternalLink, AlertCircle, Info, ChevronLeft } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/contexts/LanguageContext';

// 👇 ВСТАВТЕ СЮДИ СВОЮ АДРЕСУ ГАМАНЦЯ
const MY_WALLET = "TVk2qAy4m4NckAZHWHK5fiaKRRMJ1Lb6xC";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseId: string;
    courseTitle: string;
    price: number;
    userId: string;
}

export default function PaymentModal({
    isOpen,
    onClose,
    courseId,
    courseTitle,
    price,
    userId
}: PaymentModalProps) {
    const [hash, setHash] = useState('');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<'payment' | 'success'>('payment');
    const { toast } = useToast();
    const { t } = useLanguage();

    if (!isOpen) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(MY_WALLET);
        toast({
            title: `✓ ${t('payment.modal.copied')}`,
            description: t('payment.modal.copied_desc')
        });
    };

    const validateTxHash = (txHash: string): boolean => {
        // TRC-20 transaction hash is 64 characters (hexadecimal)
        const tronHashRegex = /^[a-fA-F0-9]{64}$/;
        return tronHashRegex.test(txHash.trim());
    };

    const handleSubmit = async () => {
        const trimmedHash = hash.trim();

        if (!trimmedHash) {
            toast({
                title: t('payment.modal.error'),
                description: t('payment.modal.input_hash_error'),
                variant: "destructive"
            });
            return;
        }

        if (!validateTxHash(trimmedHash)) {
            toast({
                title: t('payment.modal.invalid_format'),
                description: t('payment.modal.invalid_format_desc'),
                variant: "destructive"
            });
            return;
        }

        setLoading(true);
        try {
            // Check if this hash was already used
            const { data: existingOrder } = await supabase
                .from('orders')
                .select('id')
                .eq('tx_hash', trimmedHash)
                .single();

            if (existingOrder) {
                toast({
                    title: t('payment.modal.error'),
                    description: t('payment.modal.hash_used'),
                    variant: "destructive"
                });
                setLoading(false);
                return;
            }

            // Create order
            const { error } = await supabase
                .from('orders')
                .insert([{
                    user_id: userId,
                    course_id: courseId,
                    amount: price,
                    tx_hash: trimmedHash,
                    status: 'pending',
                    created_at: new Date().toISOString()
                }]);

            if (error) throw error;

            setStep('success');
            toast({
                title: `✓ ${t('payment.modal.submitted')}`,
                description: t('payment.modal.submitted_desc'),
            });

        } catch (error: any) {
            console.error('Payment error:', error);
            toast({
                title: t('payment.modal.error'),
                description: error.message || t('payment.modal.submit_error'),
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setHash('');
        setStep('payment');
        onClose();
    };

    const openTronscan = () => {
        window.open(`https://tronscan.org/#/address/${MY_WALLET}`, '_blank');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative animate-in slide-in-from-bottom duration-300">

                {/* Декоративний фон */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                {/* Кнопка Назад */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 left-4 z-50 text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg cursor-pointer pointer-events-auto flex items-center gap-1 text-sm font-medium"
                    type="button"
                    aria-label={t('payment.modal.back')}
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span>{t('payment.modal.back')}</span>
                </button>

                {/* Кнопка закриття */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-50 text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg cursor-pointer pointer-events-auto"
                    type="button"
                    aria-label={t('payment.modal.close')}
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-6 md:p-8 relative z-10">
                    {step === 'payment' ? (
                        <>
                            <div className="mb-6 pt-6">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                    {t('payment.modal.title')}
                                </h2>
                                <p className="text-gray-400">
                                    <span className="text-blue-400 font-semibold">{courseTitle}</span>
                                </p>
                            </div>

                            {/* Інструкції */}
                            <Alert className="mb-6 bg-blue-900/20 border-blue-800/50">
                                <Info className="h-4 w-4 text-blue-400" />
                                <AlertDescription className="text-sm text-gray-300">
                                    <strong className="text-blue-400">{t('payment.modal.step1')}</strong> {t('payment.modal.step1_desc').replace('{price}', price.toString())}<br />
                                    <strong className="text-blue-400">{t('payment.modal.step2')}</strong> {t('payment.modal.step2_desc')}<br />
                                    <strong className="text-blue-400">{t('payment.modal.step3')}</strong> {t('payment.modal.step3_desc')}
                                </AlertDescription>
                            </Alert>

                            {/* Блок з гаманцем */}
                            <div className="bg-gray-800/50 backdrop-blur p-5 rounded-xl mb-6 border border-gray-700">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-xs text-gray-400 uppercase font-semibold">
                                        {t('payment.modal.send_usdt').replace('{price}', price.toString())}
                                    </p>
                                    <button
                                        onClick={openTronscan}
                                        className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                                    >
                                        {t('payment.modal.verify')} <ExternalLink className="h-3 w-3" />
                                    </button>
                                </div>

                                {/* QR Code */}
                                <div className="flex justify-center mb-4">
                                    <div className="bg-white p-2 rounded-xl">
                                        <img
                                            src="/images/usdt-trc20-qr.png"
                                            alt="USDT TRC-20 QR Code"
                                            className="w-32 h-32 md:w-36 md:h-36 object-contain"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mb-3">
                                    <code className="flex-1 bg-black/50 p-3 rounded-lg text-xs md:text-sm text-yellow-400 font-mono break-all border border-gray-700">
                                        {MY_WALLET}
                                    </code>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={handleCopy}
                                        className="shrink-0 bg-gray-700 border-gray-600 hover:bg-gray-600 h-10 w-10"
                                    >
                                        <Copy className="w-4 h-4 text-white" />
                                    </Button>
                                </div>

                                <Alert className="bg-red-900/20 border-red-800/50">
                                    <AlertCircle className="h-4 w-4 text-red-400" />
                                    <AlertDescription className="text-xs text-red-300">
                                        {t('payment.modal.network_alert')}
                                    </AlertDescription>
                                </Alert>
                            </div>

                            {/* Форма для хешу */}
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm text-gray-300 mb-2 block font-medium">
                                        {t('payment.modal.hash_label')}
                                    </label>
                                    <Input
                                        placeholder={t('payment.modal.hash_placeholder')}
                                        value={hash}
                                        onChange={(e) => setHash(e.target.value)}
                                        className="bg-gray-800 border-gray-700 text-white h-12 font-mono text-sm"
                                        maxLength={64}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        {t('payment.modal.hash_hint')}
                                    </p>
                                </div>

                                <Button
                                    onClick={handleSubmit}
                                    className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg font-semibold shadow-lg hover:shadow-green-900/50 transition-all"
                                    disabled={loading || !hash.trim()}
                                >
                                    {loading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            {t('payment.modal.verifying')}
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="mr-2 h-5 w-5" />
                                            {t('payment.modal.confirm')}
                                        </>
                                    )}
                                </Button>
                            </div>

                            <p className="text-xs text-gray-500 text-center mt-4">
                                {t('payment.modal.auto_access_note')}
                            </p>
                        </>
                    ) : (
                        // Success Screen
                        <div className="text-center py-8">
                            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-500">
                                <CheckCircle className="w-12 h-12 text-white" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-3">
                                {t('payment.modal.success_title')}
                            </h3>
                            <p className="text-gray-400 mb-6 max-w-sm mx-auto">
                                {t('payment.modal.success_desc')}
                            </p>

                            <Alert className="bg-blue-900/20 border-blue-800/50 mb-6">
                                <Info className="h-4 w-4 text-blue-400" />
                                <AlertDescription className="text-sm text-gray-300">
                                    {t('payment.modal.success_email_note')}
                                </AlertDescription>
                            </Alert>

                            <Button
                                onClick={handleClose}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                {t('payment.modal.close')}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
