import React, { useRef } from 'react';
import { m, useInView, Variants } from 'framer-motion';

interface TextRevealProps {
    text: string;
    className?: string;
    wordClassName?: string;
    delay?: number;
    once?: boolean;
}

const TextReveal: React.FC<TextRevealProps> = ({ text, className, wordClassName, delay = 0, once = true }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: "-100px" });

    const words = text.split(" ");

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: (i: number = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.04 * i + delay },
        }),
    };

    const child: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <m.div
            ref={ref}
            style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", justifyContent: "inherit" }}
            variants={container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={className}
        >
            {words.map((word, index) => (
                <m.span
                    variants={child}
                    style={{ marginRight: "0.25em" }}
                    key={index}
                    className={wordClassName}
                >
                    {word}
                </m.span>
            ))}
        </m.div>
    );
};

export default TextReveal;
