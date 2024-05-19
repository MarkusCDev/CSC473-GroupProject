import React, { useState, useEffect } from 'react';

const images = [
    "https://graphicsfamily.com/wp-content/uploads/edd/2021/07/Professional-E-Commerce-Shoes-Banner-Design-1180x664.jpg",
    "https://th.bing.com/th/id/OIP.16xz4t2ed3yh_u91p9kdfAHaD4?w=2000&h=1049&rs=1&pid=ImgDetMain",
    "https://graphicsfamily.com/wp-content/uploads/edd/2021/07/Professional-E-Commerce-Shoes-Banner-Design-1180x664.jpg"
];

function FeaturedShoeCarousel() {
    const [current, setCurrent] = useState(0)
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrent(current === images.length - 1 ? 0 : current + 1)
        }, 3000)

        return () => clearTimeout(timer);
    }, [current]);

    return (
        <div className="flex justify-center items-center w-full">
            <div className="w-full flex overflow-hidden relative">
                {images.map((img, index) => (
                    <img 
                        key={index} 
                        src={img} 
                        style={{ height: '600px' }}
                        className={`w-full ${index === current ? 'block' : 'hidden'}`} 
                        alt={`Slide ${index}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default FeaturedShoeCarousel
