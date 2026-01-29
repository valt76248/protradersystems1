import React, { useEffect, useState } from 'react';
import { m, useSpring, useTransform, animate, useInView } from 'framer-motion';

interface CounterProps {
    value: number;
    duration?: number;
    suffix?: string;
    decimals?: number;
}

const Counter: React.FC<CounterProps> = ({ value, duration = 2, suffix = "", decimals = 0 }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        const controls = animate(0, value, {
            duration,
            onUpdate(value) {
                setDisplayValue(value);
            },
        });

        return () => controls.stop();
    }, [isInView, value, duration]);

    return (
        <span ref={ref} className="tabular-nums">
            {displayValue.toFixed(decimals)}
            {suffix}
        </span>
    );
};

export default Counter;
