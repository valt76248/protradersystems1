
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bitcoin, Copy, CheckCircle2, ExternalLink, Info, ShieldCheck, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface CryptoPaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (hash?: string) => void;
}

const WALLET_ADDRESS = "TVk2qAy4m4NckAZHWHK5fiaKRRMJ1Lb6xC";

const CryptoPaymentModal = ({ isOpen, onClose, onConfirm }: CryptoPaymentModalProps) => {
    const { t } = useLanguage();
    const { toast } = useToast();
    const [step, setStep] = useState<'details' | 'confirm'>('details');
    const [txHash, setTxHash] = useState('');
    const [isCopying, setIsCopying] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(WALLET_ADDRESS);
        setIsCopying(true);
        toast({
            title: "Скопировано",
            description: "Адрес кошелька скопирован в буфер обмена",
        });
        setTimeout(() => setIsCopying(false), 2000);
    };

    const handleComplete = () => {
        if (!txHash && step === 'confirm') {
            toast({
                title: "Ошибка",
                description: "Пожалуйста, введите хеш транзакции (TxID)",
                variant: "destructive"
            });
            return;
        }
        onConfirm(txHash);
        setStep('details');
        setTxHash('');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#0b101a] border-white/10 text-white sm:max-w-lg p-0 overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"></div>

                <div className="p-6">
                    <DialogHeader className="mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                                    <Bitcoin className="w-6 h-6 text-orange-500" />
                                </div>
                                <div>
                                    <DialogTitle className="text-xl font-bold tracking-tight">
                                        {step === 'details' ? "Оплата курса (USDT/TRX)" : "Подтверждение оплаты"}
                                    </DialogTitle>
                                    <DialogDescription className="text-gray-400 text-sm">
                                        {step === 'details' ? "Переведите оплату на указанный адрес" : "Введите данные транзакции для проверки"}
                                    </DialogDescription>
                                </div>
                            </div>
                        </div>
                    </DialogHeader>

                    {step === 'details' ? (
                        <div className="space-y-6">
                            {/* QR Section */}
                            <div className="flex flex-col items-center">
                                <div className="relative group p-1 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10">
                                    <div className="bg-white p-3 rounded-xl shadow-lg">
                                        <img
                                            src="/images/usdt-trc20-qr.png"
                                            alt="QR Code"
                                            className="w-40 h-40 object-contain"
                                        />
                                    </div>
                                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-blue-600 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-xl">
                                        USDT TRC-20
                                    </div>
                                </div>
                            </div>

                            {/* Wallet Address */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Адрес кошелька</label>
                                <div className="flex items-center gap-2 p-1.5 bg-white/5 border border-white/10 rounded-xl group hover:border-blue-500/50 transition-all">
                                    <code className="flex-1 px-3 py-2 text-sm text-blue-300 font-mono truncate">
                                        {WALLET_ADDRESS}
                                    </code>
                                    <Button
                                        size="sm"
                                        onClick={handleCopy}
                                        className={`${isCopying ? 'bg-green-600 hover:bg-green-500' : 'bg-white/10 hover:bg-white/20'} rounded-lg transition-all h-9`}
                                    >
                                        {isCopying ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    </Button>
                                    <a
                                        href={`https://tronscan.org/#/address/${WALLET_ADDRESS}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Посмотреть в Tronscan"
                                        className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all flex items-center justify-center"
                                    >
                                        <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white" />
                                    </a>
                                </div>
                            </div>

                            {/* Info Box */}
                            <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-2xl flex gap-3">
                                <div className="shrink-0 pt-1">
                                    <Info className="w-4 h-4 text-blue-400" />
                                </div>
                                <div className="space-y-1 text-xs text-gray-400 leading-relaxed">
                                    <p><strong className="text-white">Сеть:</strong> Используйте только сеть <span className="text-orange-400 font-bold underline">TRC-20 (TRON)</span>. Потеря средств при переводе в других сетях не компенсируется.</p>
                                    <p><strong className="text-white">Время:</strong> Оплата зачисляется автоматически после 1 подтверждения сети.</p>
                                </div>
                            </div>

                            <Button
                                onClick={() => setStep('confirm')}
                                className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 group transition-all"
                            >
                                Я перевел оплату
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Хеш транзакции (TxID)</label>
                                <Input
                                    placeholder="Введите 64-значный хеш транзакции..."
                                    value={txHash}
                                    onChange={(e) => setTxHash(e.target.value)}
                                    className="h-14 bg-white/5 border-white/10 rounded-xl focus:border-purple-500/50 focus:ring-purple-500/20 text-blue-300 font-mono text-sm"
                                />
                                <div className="flex gap-2 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                                    <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                                    <p className="text-[11px] text-gray-400">Нам нужен TxID для подтверждения операции. Вы можете найти его в истории транзакций вашего кошелька.</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    variant="ghost"
                                    onClick={() => setStep('details')}
                                    className="flex-1 h-14 hover:bg-white/10 rounded-2xl border border-white/5"
                                >
                                    Назад
                                </Button>
                                <Button
                                    onClick={handleComplete}
                                    className="flex-[2] h-14 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold rounded-2xl shadow-xl shadow-green-500/20"
                                >
                                    Завершить
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer status bar */}
                <div className="bg-white/5 p-4 border-t border-white/5 flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Gateway Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">256-bit Encrypted</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CryptoPaymentModal;
