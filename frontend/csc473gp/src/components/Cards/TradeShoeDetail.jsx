import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function TradeShoeDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/document_retrieval/fetch_document', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        collection: 'Trading Shoes',
                        document_id: id
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }

                const result = await response.json();
                setProduct(result.data);
            } catch (error) {
                setErrorMessage('Error fetching product');
            }
        };

        fetchProduct();
    }, [id]);

    if (errorMessage) {
        return <div>{errorMessage}</div>;
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    const tradingShoes = product.trading;
    const askedForTrade = product.askedForTrade;

    const renderShoesGrid = (shoes) => {
        const gridColumns = shoes.length === 1 ? 'grid-cols-1' : 'grid-cols-2';
        return (
            <div className={`grid ${gridColumns} gap-4`}>
                {shoes.map((shoe, index) => (
                    <div key={index} className="relative bg-white border border-gray-200 rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
                        <img src={shoe.imageUrl} alt={shoe.name} className="w-full h-40 object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <span className="text-white text-center">{shoe.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-800 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                    <h3 className="text-xl font-semibold mb-2" style={{ color: 'rgb(68, 71, 78)', fontSize: '14px' }}>Item(s) you are getting</h3>

                        <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                
                                {tradingShoes.map((shoe, index) => (
                                    <div key={index} className="w-full h-full">
                                        <img className="w-full h-full object-cover" src={shoe.imageUrl} alt={shoe.name} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex -mx-2 mb-4">
                            <div className="w-1/2 px-2">
                                <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Add to Cart</button>
                            </div>
                            <div className="w-1/2 px-2">
                                <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Add to Wishlist</button>
                            </div>
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{tradingShoes[0].name}</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            {tradingShoes[0].description}
                        </p>
                        <div className="flex mb-4">
                            <div className="mr-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                                <span className="text-gray-600 dark:text-gray-300">${tradingShoes[0].price}</span>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
                                <span className="text-gray-600 dark:text-gray-300">In Stock</span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="font-bold text-gray-700 dark:text-gray-300">Select Color:</span>
                            <div className="flex items-center mt-2">
                                <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                                <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                                <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                                <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="font-bold text-gray-700 dark:text-gray-300">Select Size:</span>
                            <div className="flex items-center mt-2">
                                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">S</button>
                                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">M</button>
                                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">L</button>
                                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">XL</button>
                                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">XXL</button>
                            </div>
                        </div>
                        <div>
                            <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla ut lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit. Quisque ut erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum lacinia, non sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt mi consectetur.
                            </p>
                        </div>
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold mb-2" style={{ color: 'rgb(68, 71, 78)', fontSize: '14px' }}>Item(s) you are giving</h3>
                            {renderShoesGrid(askedForTrade)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TradeShoeDetail;
