import React, { useEffect, useState } from 'react';
import FeaturedShoeCarousel from '../components/Carousel/FeaturedShoeCarousel';
import TradeShoeCard from '../components/Cards/TradeShoeCard';
import Navigator from '../components/Navigator';
import Banner from '../components/Banner'
import Bannerimg from '../assets/trade.png'

const Trading = () => {
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/data_retrieval/fetch_data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        collection: 'Trading Shoes',
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const result = await response.json();
                setProducts(result.data);
            } catch (error) {
                setErrorMessage('Error fetching products');
            }
        };

        fetchProducts();
    }, []);

    if (errorMessage) {
        return <div>{errorMessage}</div>;
    }

    if (products.length === 0 || products.every(product => product.trading.length === 0)) {
        return <div>No shoes available for trade</div>;
    }

    return (
        <div>
            <Navigator />
            <Banner img={Bannerimg}/>
            <div className='max-w-screen-2xl mx-auto pt-2 p-5 sm:p-10 md:p-8'>
                <div className="flex flex-wrap scrollbar-hide w-full" style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}>
                    {products.flatMap((product, index) =>
                        product.trading.map((shoe, shoeIndex) => (
                            <div key={`${product.owner}-${shoe.name}-${shoeIndex}`} className="w-1/2 px-2">
                                <TradeShoeCard product={{ ...product, shoe }} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Trading;
