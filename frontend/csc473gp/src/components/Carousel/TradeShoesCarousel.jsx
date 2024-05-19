import React, { useRef, useEffect, useState } from 'react';
import TradeShoeCard from '../Cards/TradeShoeCard';

// Updated productIds structure to contain only IDs
const productIds = [
    { shoeId: 1 },
    { shoeId: 2 },
    { shoeId: 3 },
    { shoeId: 4 }
];

function TradeShoesCarousel() {
    const carouselRef = useRef(null);
    const [cardWidth, setCardWidth] = useState(0);

    useEffect(() => {
        if (carouselRef.current) {
            const cardElement = carouselRef.current.querySelector('.card');
            if (cardElement) {
                setCardWidth(cardElement.offsetWidth);
            }
        }
    }, []);

    const scrollLeft = () => {
        carouselRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    };

    const scrollRight = () => {
        carouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    };

    return (
        <div className="">
            <div className="relative flex items-center">
                <div className="absolute inset-y-0 left-0 z-20 flex items-center">
                    <button
                        onClick={scrollLeft}
                        className="bg-white text-gray-800 hover:text-gray-600 font-bold hover:shadow-lg rounded-full w-12 h-12 mx-2"
                    >
                        &#8592;
                    </button>
                </div>
                <div
                    ref={carouselRef}
                    className="flex overflow-x-scroll scrollbar-hide gap-4 w-full"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    {productIds.map(({ shoeId }) => (
                        <div key={shoeId} className="flex-none">
                            <TradeShoeCard product={{ id: shoeId }} />
                        </div>
                    ))}
                </div>
                <div className="absolute inset-y-0 right-0 z-20 flex items-center">
                    <button
                        onClick={scrollRight}
                        className="bg-white text-gray-800 hover:text-gray-600 font-bold hover:shadow-lg rounded-full w-12 h-12 mx-2"
                    >
                        &#8594;
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TradeShoesCarousel;
