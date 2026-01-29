import React, { useMemo } from 'react';
import { m, useSpring, useMotionValue, useReducedMotion } from 'framer-motion';

const AuraBackground = () => {
    const shouldReduceMotion = useReducedMotion();

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth physics for the mouse movement
    const springX = useSpring(mouseX, { damping: 50, stiffness: 20 });
    const springY = useSpring(mouseY, { damping: 50, stiffness: 20 });

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Factor down the movement to keep it subtle
            mouseX.set(e.clientX * 0.1);
            mouseY.set(e.clientY * 0.1);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Disable background animations entirely if user prefers reduced motion
    if (shouldReduceMotion) {
        return <div className="fixed inset-0 bg-[#020617] -z-10" />;
    }

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#020617] isolation-auto">
            {/* Interactive container */}
            <m.div
                style={{ translateX: springX, translateY: springY }}
                className="absolute inset-0"
            >
                {/* Static blobs inside the interactive container */}
                <div className="absolute aura-blob aura-blob-blue w-[600px] h-[600px] -top-32 -left-32 opacity-20" />
                <div className="absolute aura-blob aura-blob-purple w-[700px] h-[700px] bottom-0 -right-32 opacity-20" />
            </m.div>

            {/* Central stable glow */}
            <m.div
                className="absolute aura-blob glow-cyan w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
};

export default React.memo(AuraBackground);
