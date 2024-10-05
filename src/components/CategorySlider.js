import React, { useContext } from 'react'
import Slider from 'react-slick';
import { GlobalStateContext } from '../context/GlobalStateContext';

const CategorySlider = () => {
    const { state } = useContext(GlobalStateContext);
    const { categories } = state;
    console.log(categories);
    const settings = {
        dots: false,
        infinite: true,
        speed: 5000,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 500,
        cssEase: 'linear',
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                },
            },
            {
                breakpoint: 680,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            }
        ],
    };
    
    return (
        <div className="py-[72px] overflow-hidden" style={{ fontFamily: "Mona-Sans" }}> 
            <Slider {...settings} className='w-auto'>
                {categories.map((item,index)=>(
                    <div key={index} className='relative max-w-[200px] h-[150px] bg-slate-500 rounded-lg'>
                        <div className="absolute bottom-1 left-1 h-[150px] w-full bg-blue-500 rounded-lg z-0"></div>
                        <img src={item?.designs[0]?.media[0]} className='absolute inset-0 z-10 object-cover w-full h-full rounded-lg'/>
                        <div className="z-20 mt-2 text-center">
                            {item?.name}
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default CategorySlider