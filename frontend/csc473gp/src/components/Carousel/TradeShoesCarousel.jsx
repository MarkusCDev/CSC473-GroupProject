// TradeShoesCarousel.jsx
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TradingShoeCard from '../Cards/TradeShoeCard';

const products = [
    {
        id: 1,
        name: 'aventura54',
        trading: [
            { id: 101, name: 'Air Jordan 1 Retro High OG', price: 1000, imageUrl: 'https://wallpapers.com/images/high/shoes-background-evoi6ni802pfz0ul.webp' },
        ],
        askedForTrade: [
            { id: 102, name: 'Nike Air Max 90', price: 500, imageUrl: 'https://i.ebayimg.com/images/g/-DwAAOSwkt9mHvC6/s-l1600.jpg' },
            { id: 103, name: 'Adidas Yeezy Boost 350', price: 524, imageUrl: 'https://i.ebayimg.com/images/g/LA8AAOSwvWtmHuEQ/s-l1600.jpg' },
        ],
    },
    {
        id: 2,
        name: 'aventura55',
        trading: [
            { id: 201, name: 'Converse Chuck Taylor', price: 120, imageUrl: 'https://i.ebayimg.com/images/g/KKkAAOSwujBmHt-s/s-l1600.jpg' },
            { id: 202, name: 'Puma RS-X', price: 100, imageUrl: 'https://i.ebayimg.com/images/g/GRUAAOSwPBlmHrbQ/s-l1600.jpg' },
        ],
        askedForTrade: [
            { id: 203, name: 'Vans Old Skool', price: 140, imageUrl: 'https://i.ebayimg.com/images/g/5OUAAOSwgwxmHvB7/s-l1600.jpg' },
        ],
    },
    {
        id: 3,
        name: 'aventura56',
        trading: [
            { id: 301, name: 'New Balance 574', price: 200, imageUrl: 'https://i.pinimg.com/736x/09/10/87/091087a1fad6dec229eb2ebf8e41a431.jpg' },
            { id: 302, name: 'Converse Chuck Taylor', price: 120, imageUrl: 'https://i.ebayimg.com/images/g/KKkAAOSwujBmHt-s/s-l1600.jpg' },

        ],
        askedForTrade: [
            { id: 303, name: 'Asics Gel Lyte III', price: 220, imageUrl: 'https://s.yimg.com/ny/api/res/1.2/2wNOJ0NLfk6DStVKy4V6qQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTkxMw--/https://s.yimg.com/os/creatr-uploaded-images/2023-12/29fb7210-9834-11ee-bfff-9c23faf735c5' },
            { id: 304, name: 'Reebok Classic', price: 240, imageUrl: 'https://i.ebayimg.com/images/g/5OUAAOSwgwxmHvB7/s-l1600.jpg' },
        ],
    },
    {
        id: 4,
        name: 'aventura57',
        trading: [
            { id: 401, name: 'Nike Dunk Low', price: 300, imageUrl: 'https://i.pinimg.com/736x/09/10/87/091087a1fad6dec229eb2ebf8e41a431.jpg' },
        ],
        askedForTrade: [
            { id: 403, name: 'Jordan 4 Retro', price: 340, imageUrl: 'https://i.ebayimg.com/images/g/KKkAAOSwujBmHt-s/s-l1600.jpg' },
        ],
    },
    // Add more products as needed
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
                    {products.map((product) => (
                        <Link to={`/product/${product.id}`} key={product.id} className="flex-none w-full md:w-1/2 px-2 mb-6 card">
                            <TradingShoeCard product={product} />
                        </Link>
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
