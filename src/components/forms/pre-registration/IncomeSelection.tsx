
import React from 'react';
import { DollarSign } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useLanguage } from '@/contexts/LanguageContext';

interface IncomeSelectionProps {
    value: string;
    onChange: (value: string) => void;
}

const IncomeSelection: React.FC<IncomeSelectionProps> = ({ value, onChange }) => {
    const { t } = useLanguage();

    const incomeOptions = [
        { key: 'prereg.income.option1', value: 'до 500 $' },
        { key: 'prereg.income.option2', value: 'от 500$ до 1.000$' },
        { key: 'prereg.income.option3', value: 'от 1.000$ до 2.000$' },
        { key: 'prereg.income.option4', value: 'более 2.000$' }
    ];

    return (
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">{t('prereg.income')}</h2>
            </div>

            <RadioGroup
                value={value}
                onValueChange={onChange}
                className="grid md:grid-cols-2 gap-3"
            >
                {incomeOptions.map((option) => (
                    <div
                        key={option.key}
                        className={`flex items-center space-x-3 p-4 rounded-xl border transition-all cursor-pointer ${value === option.value
                            ? 'border-cyan-500 bg-cyan-500/10'
                            : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                            }`}
                    >
                        <RadioGroupItem
                            value={option.value}
                            id={`income-${option.key}`}
                            className="border-gray-500 text-cyan-500"
                        />
                        <Label htmlFor={`income-${option.key}`} className="text-gray-300 cursor-pointer flex-1">{t(option.key)}</Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default IncomeSelection;
