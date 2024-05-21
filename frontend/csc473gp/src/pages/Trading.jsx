import React, { useEffect, useState } from 'react';
import TradeShoeCard from '../components/Cards/TradeShoeCard';
import Navigator from '../components/Navigator';
import Banner from '../components/Banner';
import Bannerimg from '../assets/trade.png';
import axios from 'axios';

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
                        collection: 'Trading',
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const result = await response.json();
                setProducts(result.data);
                console.log("Selling Data", result.data);
            } catch (error) {
                setErrorMessage('Error fetching products');
            }
        };

        fetchProducts();
    }, []);

    if (errorMessage) {
        return <div className="text-red-500 text-center mt-4">{errorMessage}</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navigator />
            <Banner img={Bannerimg} />
            <div className="container mx-auto py-8 px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <TradeShoeCard key={index} product={product} />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Trading;
