import React from 'react';
import { motion } from 'framer-motion';

const AuraBackground = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
            {/* Moving Blobs */}
            <motion.div
                className="aura-blob aura-blob-blue w-[500px] h-[500px] -top-24 -left-24"
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="aura-blob aura-blob-purple w-[600px] h-[600px] bottom-0 -right-24"
                animate={{
                    x: [0, -50, 0],
                    y: [0, -100, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="aura-blob glow-cyan w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{
                    x: [-50, 50, -50],
                    y: [50, -50, 50],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="aura-blob glow-indigo w-[450px] h-[450px] top-0 right-0"
                animate={{
                    x: [0, -150, 0],
                    y: [0, 100, 0],
                    scale: [1, 0.9, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Subtle Grainy Overlay */}
            <div className="absolute inset-0 bg-[#020617] opacity-20 pointer-events-none mix-blend-overlay" />
        </div>
    );
};

export default AuraBackground;
