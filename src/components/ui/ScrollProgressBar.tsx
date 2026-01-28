import React from 'react';
import { m, useScroll } from 'framer-motion';

const ScrollProgressBar = () => {
    const { scrollYProgress } = useScroll();

    return (
        <m.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 origin-left z-[100]"
            style={{ scaleX: scrollYProgress }}
        />
    );
};

export default ScrollProgressBar;
