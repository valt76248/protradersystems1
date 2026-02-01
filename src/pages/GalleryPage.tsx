
import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_CONFIGS, cleanTitle, GalleryImage } from '@/data/galleries';

const GalleryPage = () => {
    const { sessionId } = useParams<{ sessionId: string }>();
    const { t } = useLanguage();
    const location = useLocation();
    const navigate = useNavigate();

    const config = GALLERY_CONFIGS[sessionId || 'session-1'];
    const fromCourseId = location.state?.fromCourse;

    // All images data generated from config
    const allImages = useMemo(() => {
        if (!config) return [];

        let idCounter = 1;
        const result: GalleryImage[] = [];

        // Map images to their respective base paths
        // Mapping logic assumes specific structure, matching previous hardcoded logic
        if (sessionId === 'session-1') {
            const [base, flashSP, flashRE] = config.basePaths;

            config.images.other.forEach(filename => {
                result.push({
                    id: idCounter++,
                    filename,
                    title: cleanTitle(filename),
                    category: config.getCategory(filename, t),
                    path: base + filename
                });
            });

            config.images.spMoe.forEach(filename => {
                result.push({
                    id: idCounter++,
                    filename,
                    title: cleanTitle(filename),
                    category: 'S&P MOE',
                    path: flashSP + filename
                });
            });

            config.images.remoe.forEach(filename => {
                result.push({
                    id: idCounter++,
                    filename,
                    title: cleanTitle(filename),
                    category: 'REMOE',
                    path: flashRE + filename
                });
            });
        } else if (sessionId === 'session-2') {
            const [base, flash] = config.basePaths;

            config.images.other.forEach(filename => {
                result.push({
                    id: idCounter++,
                    filename,
                    title: cleanTitle(filename),
                    category: config.getCategory(filename, t),
                    path: base + filename
                });
            });

            config.images.flashCards.forEach(filename => {
                result.push({
                    id: idCounter++,
                    filename,
                    title: cleanTitle(filename),
                    category: config.getCategory(filename, t),
                    path: flash + filename
                });
            });
        }

        return result;
    }, [config, sessionId, t]);

    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

    const categories = useMemo(() => {
        const cats = Array.from(new Set(allImages.map(img => img.category)));
        return ['all', ...cats];
    }, [allImages]);

    const filteredImages = useMemo(() => {
        if (activeCategory === 'all') return allImages;
        return allImages.filter(img => img.category === activeCategory);
    }, [activeCategory, allImages]);

    const handlePrevImage = () => {
        if (!lightboxImage) return;
        const currentIndex = filteredImages.findIndex(img => img.id === lightboxImage.id);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
        setLightboxImage(filteredImages[prevIndex]);
    };

    const handleNextImage = () => {
        if (!lightboxImage) return;
        const currentIndex = filteredImages.findIndex(img => img.id === lightboxImage.id);
        const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
        setLightboxImage(filteredImages[nextIndex]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') handlePrevImage();
        if (e.key === 'ArrowRight') handleNextImage();
        if (e.key === 'Escape') setLightboxImage(null);
    };

    const handleBack = () => {
        if (fromCourseId) {
            navigate(`/course/${fromCourseId}`);
        } else {
            navigate('/account');
        }
    };

    if (!config) {
        return <div className="p-20 text-center text-white">Gallery not found.</div>;
    }

    return (
        <div className="min-h-screen bg-trading-dark flex flex-col text-white" onKeyDown={handleKeyDown} tabIndex={0}>
            <Header />

            <main className="flex-grow container mx-auto px-4 py-8">
                <Button
                    variant="ghost"
                    className="mb-6 hover:bg-gray-800 text-gray-400 hover:text-white"
                    onClick={handleBack}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t('gallery.back')}
                </Button>

                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{t(config.titleKey)}</h1>
                    <p className="text-gray-400">{t(config.subtitleKey)}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 mb-8">
                    {categories.map(cat => (
                        <Button
                            key={cat}
                            variant={activeCategory === cat ? 'default' : 'outline'}
                            className={`
                                ${activeCategory === cat
                                    ? (sessionId === 'session-2' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700') + ' text-white'
                                    : 'border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white'}
                            `}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat === 'all' ? t('gallery.all') : cat}
                            <Badge variant="secondary" className="ml-2 bg-black/30">
                                {cat === 'all' ? allImages.length : allImages.filter(img => img.category === cat).length}
                            </Badge>
                        </Button>
                    ))}

                    <Button
                        className="ml-auto bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => alert(t('gallery.download_archive_later'))}
                    >
                        <Download className="mr-2 h-4 w-4" />
                        {t('gallery.download_all')}
                    </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredImages.map(image => (
                        <div
                            key={image.id}
                            className={`group relative aspect-video bg-gray-900 rounded-lg overflow-hidden cursor-pointer border border-gray-800 transition-all duration-300 ${sessionId === 'session-2' ? 'hover:border-purple-500/50' : 'hover:border-blue-500/50'}`}
                            onClick={() => setLightboxImage(image)}
                        >
                            <img
                                src={image.path}
                                alt={image.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-sm text-white font-medium line-clamp-2">{image.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />

            {lightboxImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                    onClick={() => setLightboxImage(null)}
                >
                    <button
                        type="button"
                        className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-50 cursor-pointer"
                        onClick={(e) => { e.stopPropagation(); setLightboxImage(null); }}
                        aria-label={t('gallery.aria.close')}
                    >
                        <X className="h-8 w-8" />
                    </button>

                    <button
                        type="button"
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                        onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                        aria-label={t('gallery.aria.prev')}
                    >
                        <ChevronLeft className="h-8 w-8 text-white" />
                    </button>

                    <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                        onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                        aria-label={t('gallery.aria.next')}
                    >
                        <ChevronRight className="h-8 w-8 text-white" />
                    </button>

                    <div className="max-w-[90vw] max-h-[85vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={lightboxImage.path}
                            alt={lightboxImage.title}
                            className="max-w-full max-h-[75vh] object-contain rounded-lg"
                        />
                        <div className="mt-4 text-center">
                            <h3 className="text-xl font-semibold text-white">{lightboxImage.title}</h3>
                            <div className="flex items-center justify-center gap-2 mt-2">
                                <Badge className={sessionId === 'session-2' ? 'bg-purple-600' : 'bg-blue-600'}>{lightboxImage.category}</Badge>
                                <span className="text-sm text-gray-400">
                                    {filteredImages.findIndex(img => img.id === lightboxImage.id) + 1} / {filteredImages.length}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GalleryPage;
