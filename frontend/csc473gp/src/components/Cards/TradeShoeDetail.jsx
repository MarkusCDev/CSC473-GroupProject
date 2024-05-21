import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useUserAuth } from '../UserAuthentication';

function TradeShoeDetail() {
    const { user } = useUserAuth()
    const [email, setEmail] = useState(user?.email)
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
                        collection: 'Trading',
                        document_id: id,  // Use the id from useParams
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const result = await response.json();
                setProduct(result.data);
                console.log("products shoe details", result.data);
            } catch (error) {
                setErrorMessage('Error fetching products');
                console.error(error);  // Log error details
            }
        };

        fetchProducts();
    }, [id]);  // Add dependency array

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
                        <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                            <img className="w-full h-full object-cover" src={product.shoe_img} alt="" />
                        </div>
                        <div className="flex -mx-2 mb-4">
                            <div className="w-full px-2">
                                <button onClick={handleAddToCart} className="w-full text-white py-2 px-4 rounded-full font-bold">Accept Trade</button>
                            </div>
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2"></h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4"></p>
                        <div className="flex mb-4">
                            <div className="mr-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                                <span className="text-gray-600 dark:text-gray-300"></span>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
                                <span className="text-gray-600 dark:text-gray-300"></span>
                            </div>
                        </div>
                        {/* <div className="mb-4">
                            <span className="font-bold text-gray-700 dark:text-gray-300">Select Color:</span>
                            <div className="flex items-center mt-2">
                                {product.colors.map((color, index) => (
                                    <button key={index} className={`w-6 h-6 rounded-full mr-2`} style={{ backgroundColor: color }}></button>
                                ))}
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="font-bold text-gray-700 dark:text-gray-300">Select Size:</span>
                            <div className="flex items-center mt-2">
                                {product.sizes.map((size, index) => (
                                    <button key={index} className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">{size}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                {product.full_description}
                            </p>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>


            ) : (
            <p>Loading...</p>
            )}
            </div>
    );
}

export default TradeShoeDetail;
