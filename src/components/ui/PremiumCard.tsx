import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PremiumCardProps {
    children: React.ReactNode;
    className?: string;
    glowColor?: string;
}

const PremiumCard = ({ children, className, glowColor = "rgba(56, 189, 248, 0.15)" }: PremiumCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={cn(
                "relative rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur-xl transition-all duration-700 overflow-hidden",
                isHovered ? "shadow-[0_20px_50px_rgba(56,189,248,0.2)] border-sky-500/30 scale-[1.02]" : "shadow-xl border-white/10",
                className
            )}
        >
            {/* Background Glow */}
            <motion.div
                animate={{
                    opacity: isHovered ? 1 : 0,
                }}
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 40%)`,
                }}
                onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                }}
            />

            <div className="relative z-10 [transform:translateZ(50px)]">
                {children}
            </div>

            {/* Shimmering Border Effect */}
            <div className={cn(
                "absolute inset-0 opacity-0 transition-opacity duration-700 pointer-events-none rounded-2xl",
                isHovered && "opacity-100"
            )}>
                <div className="absolute inset-[1px] rounded-2xl bg-slate-950/40 z-[-1]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-sky-500/20 to-transparent animate-shimmer z-[-2]" />
            </div>
        </motion.div>
    );
};

export default PremiumCard;
