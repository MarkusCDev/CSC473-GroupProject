import React, { useEffect, useState } from 'react';
import FeaturedShoeCarousel from '../components/Carousel/FeaturedShoeCarousel';
import BuyShoeCard from '../components/Cards/BuyShoeCard';
import Navigator from '../components/Navigator';

const Buying = () => {
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
                        collection: 'Buying Shoes',
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
        return <div className="text-red-500 text-center mt-4">{errorMessage}</div>;
    }

    if (products.length === 0 || products.every(product => product.selling.length === 0)) {
        return <div className="text-center mt-4">No shoes available for sale</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navigator />
            <FeaturedShoeCarousel />
            <div className="container mx-auto py-8 px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.flatMap((product, productIndex) =>
                        product.selling.map((shoe, shoeIndex) => (
                            <BuyShoeCard
                                key={`${product.owner}-${shoe.name}-${productIndex}-${shoeIndex}`}
                                product={product}
                                shoe={shoe}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Buying;
