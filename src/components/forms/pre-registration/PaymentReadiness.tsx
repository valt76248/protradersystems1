
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useLanguage } from '@/contexts/LanguageContext';

interface PaymentReadinessProps {
    value: string;
    onChange: (value: string) => void;
}

const PaymentReadiness: React.FC<PaymentReadinessProps> = ({ value, onChange }) => {
    const { t } = useLanguage();

    return (
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">{t('prereg.ready_to_pay')}</h2>
            </div>

            <RadioGroup
                value={value}
                onValueChange={onChange}
                className="space-y-3"
            >
                <div
                    className={`flex items-center space-x-3 p-4 rounded-xl border transition-all cursor-pointer ${value === 'ready'
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                        }`}
                >
                    <RadioGroupItem
                        value="ready"
                        id="ready"
                        className="border-gray-500 text-cyan-500"
                    />
                    <Label htmlFor="ready" className="text-gray-300 cursor-pointer flex-1">
                        {t('prereg.ready_yes')}
                    </Label>
                </div>
                <div
                    className={`flex items-center space-x-3 p-4 rounded-xl border transition-all cursor-pointer ${value === 'need-consultation'
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                        }`}
                >
                    <RadioGroupItem
                        value="need-consultation"
                        id="need-consultation"
                        className="border-gray-500 text-cyan-500"
                    />
                    <Label htmlFor="need-consultation" className="text-gray-300 cursor-pointer flex-1">
                        {t('prereg.ready_consultation')}
                    </Label>
                </div>
            </RadioGroup>
        </div>
    );
};

export default PaymentReadiness;
