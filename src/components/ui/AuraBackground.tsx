import React, { useMemo } from 'react';
import { m, useReducedMotion } from 'framer-motion';

const AuraBackground = () => {
    const shouldReduceMotion = useReducedMotion();

    // Disable background animations entirely if user prefers reduced motion
    if (shouldReduceMotion) {
        return <div className="fixed inset-0 bg-[#020617] -z-10" />;
    }

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#020617] isolation-auto">
            {/* Static blobs for Desktop to save CPU/GPU cycles during scroll */}
            <div className="absolute aura-blob aura-blob-blue w-[400px] h-[400px] -top-24 -left-24 opacity-10" />
            <div className="absolute aura-blob aura-blob-purple w-[500px] h-[500px] bottom-0 -right-24 opacity-10" />

            {/* Reduced motion or purely decorative central glow */}
            <m.div
                className="absolute aura-blob glow-cyan w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
};

export default React.memo(AuraBackground);
