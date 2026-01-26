
import React, { useEffect, useState } from 'react';
import { BookOpen, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import StartTrainingButton from '@/components/shared/StartTrainingButton';
import PremiumCard from '@/components/ui/PremiumCard';
import { supabase } from '@/lib/supabaseClient';
import { CourseModule } from '@/types/material';
import { Loader } from '@/components/ui/loader';

const CourseOverview = () => {
  const { t } = useLanguage();

  const staticModules = [
    {
      id: 'm1',
      title: t('home.course.module1.title'),
      topics: [
        t('home.course.module1.topic1'),
        t('home.course.module1.topic2'),
        t('home.course.module1.topic3')
      ]
    },
    {
      id: 'm2',
      title: t('home.course.module2.title'),
      topics: [
        t('home.course.module2.topic1'),
        t('home.course.module2.topic2'),
        t('home.course.module2.topic3'),
        t('home.course.module2.topic4'),
        t('home.course.module2.topic5'),
        t('home.course.module2.topic6')
      ]
    },
    {
      id: 'm3',
      title: t('home.course.module3.title'),
      topics: [
        t('home.course.module3.topic1'),
        t('home.course.module3.topic2'),
        t('home.course.module3.topic3'),
        t('home.course.module3.topic4'),
        t('home.course.module3.topic5')
      ]
    },
    {
      id: 'm4',
      title: t('home.course.module4.title'),
      topics: [t('home.course.module4.topic1')]
    },
    {
      id: 'm5',
      title: t('home.course.module5.title'),
      topics: [t('home.course.module5.topic1')]
    },
    {
      id: 'm6',
      title: t('home.course.module6.title'),
      topics: [t('home.course.module6.topic1')]
    }
  ];

  return (
    <div className="w-full py-12 px-4 no-select relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            {t('home.course-structure')}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {t('home.course-description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {staticModules.map((module) => (
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
                      <span className="text-base text-gray-300 group-hover:text-white transition-colors">
                        {topic}
                      </span>
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
    </div>
  );
};

export default CourseOverview;
