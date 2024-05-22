import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import TradeShoeCard from '../Cards/TradeShoeCard';

function TradeShoesCarousel() {
    const carouselRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [cardWidth, setCardWidth] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.post('https://testingbaka-e2agf6geqq-ue.a.run.app/data_retrieval/fetch_data', {
                    collection: 'Trading',
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                setProducts(response.data.data);
                console.log("products", response.data.data);
            } catch (error) {
                setErrorMessage('Error fetching products');
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (carouselRef.current) {
            const cardElement = carouselRef.current.querySelector('.card');
            if (cardElement) {
                setCardWidth(cardElement.offsetWidth);
            }
        }
    }, [products]);

    const scrollLeft = () => {
        carouselRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    };

    const scrollRight = () => {
        carouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    };

    if (errorMessage) {
        return <div>{errorMessage}</div>;
    }

    if (products.length === 0) {
        return <div>No shoes available for trade</div>;
    }

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
                    {products.map((product, index) => (
                        <div key={`${product.owner}-${product.shoe_name}-${index}`} className="flex-none">
                            <TradeShoeCard product={product} />
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
