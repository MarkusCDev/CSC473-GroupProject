import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useUserAuth } from '../UserAuthentication';

function BuyShoeDetail() {
    const { user } = useUserAuth();
    const [email, setEmail] = useState(user?.email);
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://testingbaka-e2agf6geqq-ue.a.run.app/document_retrieval/fetch_document', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        collection: 'Selling',
                        document_id: id,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const result = await response.json();
                setProduct(result.data);
                console.log("Product shoe details", result.data);
            } catch (error) {
                setErrorMessage('Error fetching products');
                console.error(error);
            }
        };

        fetchProducts();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_APP_CLOUD_API_URL2}/profile/add_to_cart`,
                {
                    user_id: email,
                    new_item: product
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Cart Updated:", response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {errorMessage && <p>{errorMessage}</p>}
            {product ? (
                <div className="bg-gray-100 dark:bg-gray-800 py-8">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row -mx-4">
                            <div className="md:flex-1 px-4">
                                <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-8">
                                    <img className="w-full h-full object-cover" src={product.shoe_img} alt={product.shoe_name} />
                                </div>
                                <div className="flex -mx-2 mb-4">
                                    <div className="w-full px-2">
                                        <button onClick={handleAddToCart} className="w-full text-white bg-blue-500 py-2 px-4 rounded-full font-bold">Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                            <div className="md:flex-1 px-4">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{product.shoe_name}</h2>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">{product.details}</p>
                                <div className="mb-6">
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Seller:</span>
                                    <span className="text-gray-600 dark:text-gray-300 ml-2">{product.seller_email.split('@')[0]}</span>
                                </div>
                                <div className="flex mb-6">
                                    <div className="mr-4">
                                        <span className="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                                        <span className="text-gray-600 dark:text-gray-300 ml-2">${product.shoe_price}</span>
                                    </div>
                                    <div className="mr-4">
                                        <span className="font-bold text-gray-700 dark:text-gray-300">Year Released:</span>
                                        <span className="text-gray-600 dark:text-gray-300 ml-2">{product.shoe_year}</span>
                                    </div>
                                    <div>
                                        <span className="font-bold text-gray-700 dark:text-gray-300">Color:</span>
                                        <span className="text-gray-600 dark:text-gray-300 ml-2">{product.shoe_color}</span>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Company:</span>
                                    <span className="text-gray-600 dark:text-gray-300 ml-2">{product.shoe_company}</span>
                                </div>
                                <div className="mb-6">
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Size:</span>
                                    <span className="text-gray-600 dark:text-gray-300 ml-2">{product.shoe_size}</span>
                                </div>
                                <div className="mb-6">
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Description:</span>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                        {product.shoe_description}
                                    </p>
                                </div>
                                <div className="mb-6">
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Details:</span>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                        {product.shoe_ai_description.details}
                                    </p>
                                </div>
                                <div className="mb-6">
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Facts:</span>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                        {product.shoe_ai_description.facts}
                                    </p>
                                </div>
                                <div className="mb-6">
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Release Date:</span>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                        {product.shoe_ai_description.release_date}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center">Loading...</p>
            )}
        </div>
    );
}

export default BuyShoeDetail;
