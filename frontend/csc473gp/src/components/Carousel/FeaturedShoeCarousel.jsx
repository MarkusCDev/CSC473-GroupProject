import React, { useState, useEffect } from 'react';
import banner1 from '../../assets/1.svg';
import banner2 from '../../assets/2.svg';
import banner3 from '../../assets/3.svg';

const images = [banner1, banner2, banner3];

const FeaturedShoeCarousel = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((current + 1) % images.length);
        }, 3000); // Change slide every 3000ms

        return () => clearInterval(interval);
    }, [current]);

    return (
<div className="carousel-container flex justify-center">
  <div className="relative" data-carousel="static">
    <div className="overflow-hidden relative rounded-lg" style={{ height:'35vh', width: '58vw' }}> {/* Adjust height as needed */}
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`duration-700 ease-in-out absolute inset-0 transition-opacity ${
                                index === current ? 'opacity-100' : 'opacity-0'
                            }`}
                            data-carousel-item
                        >
                            <img
                                src={image}
                                width=""
                                className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
                                alt={`Slide ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>
                <div className="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            className={`w-3 h-3 rounded-full ${
                                idx === current ? 'bg-white' : 'bg-white/50'
                            }`}
                            aria-current={current === idx ? 'true' : 'false'}
                            aria-label={`Slide ${idx + 1}`}
                            onClick={() => setCurrent(idx)}
                        />
                    ))}
                </div>
                <button
                    type="button"
                    className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                    onClick={() => setCurrent(current > 0 ? current - 1 : images.length - 1)}
                    data-carousel-prev
                >
                    <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                        &#8678;
                    </span>
                </button>
                <button
                    type="button"
                    className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                    onClick={() => setCurrent((current + 1) % images.length)}
                    data-carousel-next
                >
                    <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                        &#8680;
                    </span>
                </button>
            </div>
        </div>
    );
};

export default FeaturedShoeCarousel;
