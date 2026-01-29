import React, { useEffect, useState } from 'react';
import { m, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Performance: Only show on non-touch devices
    useEffect(() => {
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouch) return;

        setIsVisible(true);
    }, []);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 400 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [cursorX, cursorY]);

    if (!isVisible) return null;

    return (
        <m.div
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
                left: -16,
                top: -16
            }}
        >
            {/* Crosshair Lines */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/50" />
            <div className="absolute left-1/2 top-0 w-[1px] h-full bg-white/50" />

            {/* Inner Dot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-400 rounded-full" />
        </m.div>
    );
};

export default CustomCursor;
