
import React from 'react';
import { Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProblemSelectionProps {
    selectedProblems: string[];
    onToggle: (problem: string) => void;
}

const ProblemSelection: React.FC<ProblemSelectionProps> = ({ selectedProblems, onToggle }) => {
    const { t } = useLanguage();

    const problemOptions = [
        { key: 'prereg.problem.financial', value: 'Финансовые трудности' },
        { key: 'prereg.problem.relationships', value: 'Проблемы в отношениях' },
        { key: 'prereg.problem.procrastination', value: 'Прокрастинация' },
        { key: 'prereg.problem.depression', value: 'Депрессия, апатия' },
        { key: 'prereg.problem.laziness', value: 'Лень, отсутствие интереса к жизни' },
        { key: 'prereg.problem.fears', value: 'Страхи и тревоги' },
        { key: 'prereg.problem.self_esteem', value: 'Низкая самооценка' },
        { key: 'prereg.problem.health', value: 'Проблемы со здоровьем' },
        { key: 'prereg.problem.other', value: 'Другой' }
    ];

    return (
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-purple-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">{t('prereg.problems')}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
                {problemOptions.map((problem) => (
                    <label
                        key={problem.key}
                        className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors
                            ${selectedProblems.includes(problem.value)
                                ? 'border-purple-500 bg-purple-500/10'
                                : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                            }`}
                    >
                        <input
                            type="checkbox"
                            checked={selectedProblems.includes(problem.value)}
                            onChange={() => onToggle(problem.value)}
                            className="w-5 h-5 rounded border-gray-500 bg-transparent text-purple-500 focus:ring-purple-500 focus:ring-offset-0"
                        />
                        <span className="text-gray-300">{t(problem.key)}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default ProblemSelection;
