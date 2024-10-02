import React, { useState, useEffect } from 'react';
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
        <div className='bg-[#f8f7f4] h-full w-screen pt-[80px] flex items-center justify-center flex-col'>
            <div
                className='flex items-center justify-center rounded-full h-10 w-full max-w-[333px]'
                style={{
                    background: gradientColors[currentGradient],
                    transition: 'background 1s ease',
                }}
            >
                <div className='text-[16px] font-semibold text-black' style={{fontFamily:"Mono Sans"}}>
                    Over 3 million ready-to-work creatives!
                </div>
            </div>
            <div className='text-7xl flex items-center flex-col' style={{ fontFamily: 'Source Serif 4, sans-serif' }}>

                <div >
                    The World's Destination
                </div>
                <div>
                    for Design
                </div>
            </div>
        </div>
    );
};

export default Hero;
