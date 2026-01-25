import React from 'react';
import { motion } from 'framer-motion';
import { HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AuraButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost-glow-green' | 'ghost-glow-blue' | 'ghost-glow-cyan' | 'ghost-glow-white';
    size?: 'default' | 'lg' | 'xl';
    className?: string;
    children: React.ReactNode;
}

const AuraButton = ({ variant = 'primary', size = 'default', className, children, ...props }: AuraButtonProps) => {
    const isGhostGlow = variant.includes('ghost-glow');

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial="initial"
            className={cn(
                "relative transition-all duration-300 overflow-hidden group flex items-center justify-center gap-2",
                !isGhostGlow ? "px-8 py-3 rounded-full font-semibold" : "px-4 py-2 font-semibold",
                variant === 'primary' && "bg-white text-black hover:bg-white/90",
                variant === 'secondary' && "bg-blue-600 text-white hover:bg-blue-700",
                variant === 'outline' && "bg-transparent border border-white/20 text-white hover:border-white/40",
                variant === 'ghost-glow-green' && "ghost-glow-green bg-transparent border-none",
                variant === 'ghost-glow-blue' && "ghost-glow-blue bg-transparent border-none",
                variant === 'ghost-glow-cyan' && "ghost-glow-cyan bg-transparent border-none",
                variant === 'ghost-glow-white' && "ghost-glow-white bg-transparent border-none",
                size === 'lg' && "text-xl py-4",
                size === 'xl' && "text-3xl py-6 font-black uppercase tracking-tighter",
                className
            )}
            {...(props as any)}
        >
            {/* Outer Glow Effect - Hidden for ghost glow as it has its own CSS glow */}
            {!isGhostGlow && (
                <motion.div
                    variants={{
                        initial: { opacity: 0, scale: 0.8 },
                        hover: { opacity: 0.6, scale: 1.2 },
                    }}
                    className="absolute inset-0 bg-blue-400/30 blur-xl pointer-events-none -z-10"
                />
            )}

            {/* Shimmer Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full" />
            </div>

            {/* Button Content */}
            <span className="relative z-10">
                {children}
            </span>

            {/* Animated Border (Top/Bottom) - Only for themed buttons */}
            {!isGhostGlow && (
                <>
                    <motion.div
                        variants={{
                            initial: { width: 0 },
                            hover: { width: '100%' },
                        }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <motion.div
                        variants={{
                            initial: { width: 0 },
                            hover: { width: '100%' },
                        }}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                </>
            )}
        </motion.button>
    );
};

export default AuraButton;
