
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const toggleVisibility = () => {
            if (timeoutId) return;

            timeoutId = setTimeout(() => {
                if (window.scrollY > 300) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
                timeoutId = undefined!;
            }, 100); // Check every 100ms instead of every frame
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Button
                onClick={scrollToTop}
                className="rounded-full w-12 h-12 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20 shadow-lg transition-all duration-300 transform hover:scale-110 group animate-in fade-in zoom-in-50 duration-300"
                aria-label="Scroll to top"
            >
                <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300" />
            </Button>
        </div>
    );
};

export default BackToTopButton;
