
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bitcoin, CreditCard } from "lucide-react";

interface CryptoPaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const CryptoPaymentModal = ({ isOpen, onClose, onConfirm }: CryptoPaymentModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-trading-card border-gray-700 text-white sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl flex items-center gap-2">
                        <Bitcoin className="w-6 h-6 text-orange-500" />
                        Оплата курса
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Сканируйте QR-код для быстрой оплаты через Telegram Wallet.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center justify-center p-6 space-y-6">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                        <div className="relative bg-white p-4 rounded-xl">
                            <img
                                src="/images/telegram-wallet-qr.png"
                                alt="Telegram Wallet QR"
                                className="w-48 h-48 object-contain"
                            />
                        </div>
                        <p className="mt-2 text-center text-sm font-medium text-blue-400">@WALLET</p>
                    </div>

                    <div className="w-full space-y-3">
                        <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg text-sm text-gray-300">
                            <p>1. Отсканируйте код приложением камеры или Telegram</p>
                            <p>2. Оплатите выбранный курс</p>
                            <p>3. Нажмите кнопку ниже для подтверждения завершения</p>
                        </div>
                    </div>

                    <Button
                        onClick={onConfirm}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold h-12"
                    >
                        Я оплатил, завершить
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CryptoPaymentModal;
