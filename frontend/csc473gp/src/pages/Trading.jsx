import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Trading = () => {
    const [trades, setTrades] = useState([]);

    useEffect(() => {
        const fetchTrades = async () => {
            try {
                // Make GET request to fetch all trades
                const response = await axios.get('http://localhost:5000/trading/fetch_trades');
                // Set the fetched trades in the state
                setTrades(response.data);
            } catch (error) {
                console.error('Error fetching trades:', error);
            }
        };

        fetchTrades();
    }, []); // This effect runs only once, when the component mounts.
    console.log(trades)
    return (
        <div className='flex min-h-screen bg-gradient-to-b from-stone-300 to-stone-500 items-center justify-center px-4 mt-2 sm:px-6 lg:px-8'>
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl m-auto bg-white rounded-lg p-5">
                <h1 className='text-center font-bold text-xl'>Trading Sneakers</h1>
                {trades.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {trades.map(trade => (
                            <li key={trade.id}>
                                <p>Trader Name: {trade.trader_name}</p>
                                <p>Offered:</p>
                                <div>
                                    {trade.sneakers_offered.map((sneaker, index) => (
                                        <img key={index} src={sneaker} alt={`Offered Sneaker ${index + 1}`} style={{ width: '256px', height: '256px', marginRight: '10px' }} />
                                    ))}
                                </div>
                                <p>Wanted:</p>
                                <img src={trade.sneakers_requested} alt="Requested Sneakers" style={{ width: '256px', height: '256px' }} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No trades available</p>
                )}
            </div>
        </div>
    );
    
};

export default Trading;
