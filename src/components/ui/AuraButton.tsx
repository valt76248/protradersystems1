import React from 'react';
import { motion } from 'framer-motion';
import { HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

import Magnetic from '../shared/Magnetic';

interface AuraButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost-glow-green' | 'ghost-glow-blue' | 'ghost-glow-cyan' | 'ghost-glow-white' | 'ghost-glow-emerald' | 'ghost-glow-silver' | 'ghost-glow-gold';
    size?: 'default' | 'lg' | 'xl';
    className?: string;
    children: React.ReactNode;
}

const AuraButton = ({ variant = 'primary', size = 'default', className, children, ...props }: AuraButtonProps) => {
    return (
        <Magnetic>
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    "relative transition-all duration-200 overflow-hidden group flex items-center justify-center gap-2 px-8 py-3 rounded-full font-semibold",
                    variant === 'primary' && "bg-white text-black hover:bg-white/90 shadow-lg hover:shadow-white/20",
                    variant === 'secondary' && "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-500/20",
                    variant === 'outline' && "bg-transparent border border-white/20 text-white hover:border-white/40",
                    variant.startsWith('ghost-glow') && cn("bg-transparent border-none p-0", variant),
                    size === 'lg' && "text-xl py-4",
                    size === 'xl' && "text-3xl py-6 font-black uppercase tracking-tighter",
                    className
                )}
                {...(props as any)}
            >
                {/* Simple Shimmer */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                </div>

                <span className="relative z-10">
                    {children}
                    {/* Animated Underline */}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full shadow-[0_0_8px_currentColor]" />
                </span>
            </motion.button>
        </Magnetic>
    );
};

export default AuraButton;
