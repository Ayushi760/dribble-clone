import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const Hero = () => {
    const gradientColors = [
        '#e0d9e5',
        '#e6b4ee',
        '#f7e4a0',
        '#ffd97d',
        '#ffc5ab'
    ];

    const [currentGradient, setCurrentGradient] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentGradient((prev) => (prev + 1) % gradientColors.length);
        }, 3000);

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    return (
        <div className='h-full w-screen pt-[80px] flex items-center justify-center flex-col'>
            <div
                className='flex items-center justify-center rounded-full min-h-10 py-[10px] px-[16px] w-fit'
                style={{
                    background: gradientColors[currentGradient],
                    transition: 'background 1s ease',
                }}
            >
                <div className='text-[16px] font-semibold text-black font-serif'>
                    Over 3 million ready-to-work creatives!
                </div>
            </div>
            <div className='flex items-center flex-col mx-10 max-w-[870px] text-center text-[78px] leading-[76px] mt-[32px] mb-6 tracking-[2px] font-semibold font-serif'>
                The world’s destination for design
            </div>
            <div className='text-[20px] leading-[36px] font-[500px]' style={{ fontFamily: "Mona Sans" }}>
                Get inspired by the work of millions of top-rated designers & agencies around the world.
            </div>
            <Link to="/register">
                <button className='text-white bg-black h-14 rounded-full p-6 flex items-center text-[14px] mt-8 font-semibold' style={{ fontFamily: "Mona Sans" }}>
                    Get started
                </button>
            </Link>
        </div>
    );
};

export default Hero;
