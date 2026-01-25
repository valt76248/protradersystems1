import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Calculator, TrendingUp, DollarSign, Info } from 'lucide-react';
import AuraButton from '@/components/ui/AuraButton';
import { cn } from '@/lib/utils';

// Constants
const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'AUD', 'CAD'];
const SYMBOLS = [
    { value: 'EURUSD', label: 'EUR/USD', type: 'forex' },
    { value: 'GBPUSD', label: 'GBP/USD', type: 'forex' },
    { value: 'USDJPY', label: 'USD/JPY', type: 'forex' },
    { value: 'GOLD', label: 'XAU/USD (Gold)', type: 'metal' },
    { value: 'BTCUSD', label: 'BTC/USD', type: 'crypto' },
    { value: 'US30', label: 'US30 (Dow Jones)', type: 'index' },
    { value: 'GER40', label: 'GER40 (DAX)', type: 'index' },
];

interface CalculatorFormData {
    accountCurrency: string;
    balance: string;
    riskPercent: string;
    stopLossPips: string;
    symbol: string;
    includeSpread: boolean;
    spreadPips: string;
}

interface CalculationResult {
    lotSize: number;
    riskAmount: number;
    pipValue: number;
}

export default function LotCalculator() {
    const [formData, setFormData] = useState<CalculatorFormData>({
        accountCurrency: 'USD',
        balance: '1000',
        riskPercent: '1',
        stopLossPips: '20',
        symbol: 'EURUSD',
        includeSpread: false,
        spreadPips: '1',
    });

    const [result, setResult] = useState<CalculationResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (field: keyof CalculatorFormData, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setResult(null);
        setError(null);
    };

    const handleCalculate = () => {
        setLoading(true);
        setError(null);

        // Simulation de calcul
        setTimeout(() => {
            try {
                const balance = parseFloat(formData.balance);
                const risk = parseFloat(formData.riskPercent);
                const sl = parseFloat(formData.stopLossPips) + (formData.includeSpread ? parseFloat(formData.spreadPips) : 0);

                if (isNaN(balance) || isNaN(risk) || isNaN(sl) || sl <= 0) {
                    throw new Error('Пожалуйста, введите корректные данные');
                }

                const riskAmount = (balance * risk) / 100;

                // Simplified pip value calculation for demonstration
                // In a real app, this would use live rates or a more complex formula
                let pipValuePerLot = 10; // Standard for many pairs at 1.0 lot
                if (formData.symbol === 'USDJPY') pipValuePerLot = 9.25;
                if (formData.symbol === 'GOLD') pipValuePerLot = 1;
                if (formData.symbol === 'BTCUSD') pipValuePerLot = 0.01;
                if (formData.symbol === 'US30') pipValuePerLot = 1;

                const lotSize = riskAmount / (sl * pipValuePerLot);

                setResult({
                    lotSize: Math.round(lotSize * 100) / 100,
                    riskAmount: Math.round(riskAmount * 100) / 100,
                    pipValue: Math.round((riskAmount / sl) * 100) / 100
                });
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }, 600);
    };

    return (
        <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm overflow-hidden">
            <CardHeader className="border-b border-gray-800 bg-gray-900/30">
                <CardTitle className="flex items-center gap-3 text-2xl text-white">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Calculator className="h-6 w-6 text-blue-400" />
                    </div>
                    Калькулятор лота
                </CardTitle>
                <CardDescription className="text-gray-400">
                    Рассчитайте оптимальный размер позиции на основе вашего риска
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Форма */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Валюта счёта */}
                    <div className="space-y-2">
                        <Label className="text-gray-300">Валюта счёта</Label>
                        <Select value={formData.accountCurrency} onValueChange={v => handleInputChange('accountCurrency', v)}>
                            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600">
                                {CURRENCIES.map(c => (
                                    <SelectItem key={c} value={c} className="text-white hover:bg-gray-700">{c}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Баланс */}
                    <div className="space-y-2">
                        <Label className="text-gray-300">Баланс счёта</Label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                            <Input
                                type="number"
                                placeholder="1000"
                                value={formData.balance}
                                onChange={e => handleInputChange('balance', e.target.value)}
                                className="pl-9 bg-gray-800 border-gray-600 text-white"
                            />
                        </div>
                    </div>

                    {/* Риск % */}
                    <div className="space-y-2">
                        <Label className="text-gray-300">Риск на сделку (%)</Label>
                        <div className="relative">
                            <TrendingUp className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                            <Input
                                type="number"
                                placeholder="1"
                                value={formData.riskPercent}
                                onChange={e => handleInputChange('riskPercent', e.target.value)}
                                className="pl-9 bg-gray-800 border-gray-600 text-white"
                            />
                        </div>
                    </div>

                    {/* Стоп-лосс */}
                    <div className="space-y-2">
                        <Label className="text-gray-300">Стоп-лосс (pips)</Label>
                        <Input
                            type="number"
                            placeholder="50"
                            value={formData.stopLossPips}
                            onChange={e => handleInputChange('stopLossPips', e.target.value)}
                            className="bg-gray-800 border-gray-600 text-white"
                        />
                    </div>

                    {/* Инструмент */}
                    <div className="space-y-2">
                        <Label className="text-gray-300">Валютная пара</Label>
                        <Select value={formData.symbol} onValueChange={v => handleInputChange('symbol', v)}>
                            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600 max-h-60">
                                {SYMBOLS.map(s => (
                                    <SelectItem key={s.value} value={s.value} className="text-white hover:bg-gray-700">
                                        {s.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Учитывать спред */}
                    <div className="md:col-span-2 space-y-3">
                        <div className="flex items-center gap-3">
                            <Switch
                                checked={formData.includeSpread}
                                onCheckedChange={v => handleInputChange('includeSpread', v)}
                            />
                            <Label className="text-gray-300">Учитывать спред</Label>
                        </div>
                        {formData.includeSpread && (
                            <Input
                                type="number"
                                placeholder="Спред в pips"
                                value={formData.spreadPips}
                                onChange={e => handleInputChange('spreadPips', e.target.value)}
                                className="bg-gray-800 border-gray-600 text-white max-w-[200px]"
                            />
                        )}
                    </div>
                </div>

                {/* Кнопка расчёта */}
                <AuraButton
                    onClick={handleCalculate}
                    disabled={loading}
                    variant="ghost-glow-blue"
                    size="lg"
                    className="w-full text-lg"
                >
                    {loading ? 'Расчёт...' : 'Рассчитать'}
                </AuraButton>

                {error && (
                    <Alert variant="destructive" className="bg-red-500/10 border-red-500/50 text-red-400">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {/* Результаты */}
                {result && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-blue-600/10 border border-blue-500/30 p-4 rounded-xl text-center">
                            <p className="text-sm text-gray-400 mb-1">Рекомендуемый лот</p>
                            <p className="text-3xl font-bold text-blue-400">{result.lotSize}</p>
                        </div>
                        <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl text-center">
                            <p className="text-sm text-gray-400 mb-1">Сумма риска ({formData.riskPercent}%)</p>
                            <p className="text-3xl font-bold text-white">${result.riskAmount}</p>
                        </div>
                        <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl text-center">
                            <p className="text-sm text-gray-400 mb-1">Стоимость пункта</p>
                            <p className="text-3xl font-bold text-white">${result.pipValue}</p>
                        </div>
                    </div>
                )}

                {/* Info Box */}
                <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700 text-sm text-gray-400">
                    <p className="font-semibold text-gray-300 mb-2">📖 Как использовать калькулятор лота?</p>
                    <p className="mb-3">
                        Калькулятор помогает определить оптимальный размер позиции (лот) на основе вашего допустимого риска и размера стоп-лосса.
                    </p>
                    <p className="font-medium text-gray-300 mb-1">Пример:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-500">
                        <li>Счёт: $10,000, Риск: 2% ($200), Стоп-лосс: 50 pips</li>
                        <li>Pip Value для EUR/USD ≈ $10 за лот</li>
                        <li>Лот = $200 / (50 × $10) = <strong className="text-blue-400">0.40 лота</strong></li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}
