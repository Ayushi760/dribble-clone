import React, { useEffect, useState } from 'react';
import { fetchArtists } from '../api/api';
import Slider from 'react-slick';

const ArtistsSlider = () => {
    const [artists, setArtists] = useState([]);

    const fetchAllArtist = async () => {
        const response = await fetchArtists();
        setArtists(response);
    };

    useEffect(() => {
        fetchAllArtist();
    }, []);

    console.log(artists.map(item => item.image));


    const settings = {
        dots: false, 
        infinite: true, 
        speed: 5000, 
        slidesToShow: 5, 
        slidesToScroll: 1, 
        autoplay: true, 
        autoplaySpeed: 500,
        cssEase:'linear',
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
        <div className="py-[72px] overflow-hidden " style={{ fontFamily: "Mona-Sans" }}> 
            <Slider {...settings} className='w-auto'>
                {artists.map((item,index) => (
                    <div
                        key={item.id}
                        className="relative max-w-[273px] h-[340px] max-laptop_sm:max-w-[220px] max-laptop_sm:h-[280px] rounded-[32px] overflow-hidden shadow-lg"
                    >
                        <img src={item.image} className='w-full h-full'/>
                        <div className="absolute inset-0 bg-black bg-opacity-10 flex flex-col justify-end p-4 text-[14px]">
                            <h2 className="font-bold text-white">{item.name}</h2>
                            <p className="text-white">{item.designation}</p>
                            <div className="flex flex-wrap mt-2">
                                {item.tags.map((tag, index) => (
                                    <span key={index} className="bg-transparent border-gray-400 border-[0.1px] text-[11px] rounded-full text-white px-3 max-laptop_sm:px-2 py-[2px] m-1 h-6">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ArtistsSlider;
