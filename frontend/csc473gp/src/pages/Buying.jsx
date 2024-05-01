import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigator from '../components/Navigator'; // Added import statement

const Buying = () => {
    const [sneakers, setSneakers] = useState([]);
    const [brand, setBrand] = useState('');
    const [size, setSize] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        const fetchSneakers = async () => {
            const params = {
                brand: brand,
                sizes: size,
                min_price: minPrice,
                max_price: maxPrice
            };
            try {
                const response = await axios.get(`http://localhost:5000/buying/fetch_sneakers`, { params });
                setSneakers(response.data.sneakers);
            } catch (error) {
                console.error('Error fetching sneakers:', error);
            }
        };

        fetchSneakers();
    }, [brand, size, minPrice, maxPrice]); // This effect will re-run when any of these values change.

    return (
        <div>
            <Navigator /> {/* Added Navigator component */}
        <div className='flex min-h-screen bg-gradient-to-b from-stone-300 to-stone-500 items-center justify-center px-4 mt-2 sm:px-6 lg:px-8'>
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl m-auto bg-white rounded-lg p-5">
                <h1 className='text-center font-bold text-xl'>Buy Sneakers</h1>
                <div>
                    <label className="block mb-2">Brand</label>
                    <input
                        type="text"
                        placeholder="Filter by brand"
                        value={brand}
                        onChange={e => setBrand(e.target.value)}
                        className="w-full p-2 mb-6 text-blue-700 border-b-2 border-blue-500 outline-none focus:bg-gray-300"
                    />
                </div>
                <div>
                    <label className="block mb-2">Size</label>
                    <input
                        type="number"
                        placeholder="Filter by size"
                        value={size}
                        onChange={e => setSize(e.target.value)}
                        className="w-full p-2 mb-6 text-blue-700 border-b-2 border-blue-500 outline-none focus:bg-gray-300"
                    />
                </div>
                <div>
                    <label className="block mb-2">Minimum Price</label>
                    <input
                        type="number"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={e => setMinPrice(e.target.value)}
                        className="w-full p-2 mb-6 text-blue-700 border-b-2 border-blue-500 outline-none focus:bg-gray-300"
                    />
                </div>
                <div>
                    <label className="block mb-2">Maximum Price</label>
                    <input
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={e => setMaxPrice(e.target.value)}
                        className="w-full p-2 mb-6 text-blue-700 border-b-2 border-blue-500 outline-none focus:bg-gray-300"
                    />
                </div>
                <ul className="list-disc pl-5">
                    {sneakers.map(sneaker => (
                        <li key={sneaker.id}>{sneaker.brand} - {sneaker.model} - Size: {sneaker.sizes.join(', ')}</li>
                    ))}
                </ul>
            </div>
        </div>
        </div>
    );
};

export default Buying;
