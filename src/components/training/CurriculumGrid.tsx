
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ListVideo, Play, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Video {
    id: string;
    title: string;
}

interface CurriculumGridProps {
    playlist: Video[];
    currentVideoId: string;
    completedVideos: string[];
    onVideoSelect: (id: string) => void;
}

export const CurriculumGrid: React.FC<CurriculumGridProps> = ({
    playlist,
    currentVideoId,
    completedVideos,
    onVideoSelect,
}) => {
    const { t } = useLanguage();

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <ListVideo className="text-primary" />
                {t('beginner.playlist-title')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {playlist.map((video, index) => {
                    const isActive = video.id === currentVideoId;
                    const isCompleted = completedVideos.includes(video.id);

                    return (
                        <Card
                            key={video.id}
                            className={`bg-trading-card border-gray-800 overflow-hidden hover:border-primary/50 transition-all cursor-pointer group ${isActive ? 'ring-2 ring-primary border-primary' : ''
                                }`}
                            onClick={() => onVideoSelect(video.id)}
                        >
                            <div className="relative aspect-video bg-black">
                                <img
                                    src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                                    alt={t(video.title)}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                    <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center text-white">
                                        <Play size={24} fill="currentColor" />
                                    </div>
                                </div>
                                {isCompleted && (
                                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                        <CheckCircle size={12} />
                                        {t('training.completed')}
                                    </div>
                                )}
                                {isActive && (
                                    <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 animate-pulse">
                                        <Play size={12} fill="currentColor" />
                                        {t('training.playing_now') || 'Сейчас играет'}
                                    </div>
                                )}
                                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                                    {t('training.lesson')} {index + 1}
                                </div>
                            </div>
                            <CardContent className="p-4">
                                <h3 className={`font-medium line-clamp-2 ${isActive ? 'text-primary' : 'text-gray-200 group-hover:text-white'}`}>
                                    {t(video.title)}
                                </h3>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};
