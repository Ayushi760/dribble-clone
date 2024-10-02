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
                breakpoint: 1024, // Responsive settings for larger screens
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600, // Responsive settings for medium screens
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="py-[72px] overflow-hidden " style={{ fontFamily: "Mona Sans" }}> 
            <Slider {...settings}>
                {artists.map((item,index) => (
                    <div
                        key={item.id}
                        className="relative max-w-[273px] h-[340px] rounded-[32px] overflow-hidden shadow-lg"
                    >
                        <img src={item.image} className='w-full h-full'/>
                        <div className="absolute inset-0 bg-black bg-opacity-10 flex flex-col justify-end p-4 text-[14px]">
                            <h2 className="text-white font-bold">{item.name}</h2>
                            <p className="text-white">{item.designation}</p>
                            <div className="flex flex-wrap mt-2">
                                {item.tags.map((tag, index) => (
                                    <span key={index} className="bg-transparent border-gray-400 border-[0.1px] text-[11px] rounded-full text-white px-3 py-[2px] m-1 h-6">
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
