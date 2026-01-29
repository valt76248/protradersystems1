import React, { useEffect, useState } from 'react';
import { m, useSpring, useTransform, animate, useInView } from 'framer-motion';

interface CounterProps {
    value?: number;
    target?: number;
    duration?: number;
    suffix?: string;
    decimals?: number;
}

const Counter: React.FC<CounterProps> = ({ value, target, duration = 2, suffix = "", decimals = 0 }) => {
    const finalValue = value ?? target ?? 0;
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const controls = animate(0, finalValue, {
            duration,
            ease: "easeOut",
            onUpdate(value) {
                setDisplayValue(value);
            },
        });

        return () => controls.stop();
    }, [finalValue, duration]);

    return (
        <span className="tabular-nums">
            {displayValue.toFixed(decimals)}
            {suffix}
        </span>
    );
};

export default Counter;
