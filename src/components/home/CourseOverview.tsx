import React from 'react';
import { CheckCircle, BookOpen } from 'lucide-react';
import { getAllModules } from '@/services/courseService';
import { useLanguage } from '@/contexts/LanguageContext';
import StartTrainingButton from '@/components/shared/StartTrainingButton';
import PremiumCard from '@/components/ui/PremiumCard';

const CourseOverview = () => {
  const { t } = useLanguage();
  const modules = getAllModules();

  return (
    <div className="w-full py-12 px-4 no-select relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">{t('home.course-structure')}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {t('home.course-description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module) => (
            <PremiumCard key={module.id} className="h-full overflow-hidden">
              <div className="p-8 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <BookOpen className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{module.title}</h3>
                </div>

                <ul className="space-y-4 flex-grow">
                  {module.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex items-start group">
                      <div className="mr-3 mt-1.5 p-0.5 rounded-full bg-blue-500/20 group-hover:bg-blue-500/40 transition-colors">
                        <CheckCircle className="h-3 w-3 text-blue-400" />
                      </div>
                      <span className="text-base text-gray-300 group-hover:text-white transition-colors">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </PremiumCard>
          ))}
        </div>

        <div className="mt-20 text-center">
          <StartTrainingButton />
        </div>
      </div>
    </div >
  );
};

export default CourseOverview;
