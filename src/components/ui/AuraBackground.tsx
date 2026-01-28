import React from 'react';
import { m } from 'framer-motion';

const AuraBackground = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#020617] isolation-auto">
            {/* Moving Blobs - Reduced blur and simplified animation for better scroll performance */}
            <m.div
                className="aura-blob aura-blob-blue w-[500px] h-[500px] -top-24 -left-24"
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            <m.div
                className="aura-blob aura-blob-purple w-[600px] h-[600px] bottom-0 -right-24"
                animate={{
                    x: [0, -30, 0],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            <m.div
                className="aura-blob glow-cyan w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            <m.div
                className="aura-blob glow-indigo w-[450px] h-[450px] top-0 right-0"
                animate={{
                    x: [0, -70, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
        </div>
    );
};

export default AuraBackground;
