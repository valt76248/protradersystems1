
import React from 'react';
import { Target } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';

export interface GoalsSelectionProps {
    formData: {
        mainRequest: string;
        desiredResult: string;
        whyNow: string;
    };
    onChange: (data: Partial<GoalsSelectionProps['formData']>) => void;
}

const GoalsSelection: React.FC<GoalsSelectionProps> = ({ formData, onChange }) => {
    const { t } = useLanguage();

    return (
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <Target className="w-5 h-5 text-amber-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">{t('prereg.goals')}</h2>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <Label className="text-gray-300">{t('prereg.main_request')}</Label>
                    <Textarea
                        required
                        placeholder={t('prereg.main_request_placeholder')}
                        value={formData.mainRequest}
                        onChange={(e) => onChange({ mainRequest: e.target.value })}
                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-cyan-500 min-h-[100px]"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-gray-300">{t('prereg.desired_result')}</Label>
                    <Textarea
                        required
                        placeholder={t('prereg.desired_result_placeholder')}
                        value={formData.desiredResult}
                        onChange={(e) => onChange({ desiredResult: e.target.value })}
                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-cyan-500 min-h-[100px]"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-gray-300">{t('prereg.why_now')}</Label>
                    <Textarea
                        required
                        placeholder={t('prereg.why_now_placeholder')}
                        value={formData.whyNow}
                        onChange={(e) => onChange({ whyNow: e.target.value })}
                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-cyan-500 min-h-[100px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default GoalsSelection;
