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
                setTrades(response.data.trades);  // Make sure to access the "trades" array in the response data
            } catch (error) {
                console.error('Error fetching trades:', error);
            }
        };

        fetchTrades();
    }, []); // This effect runs only once, when the component mounts.
    
    return (
        <div>
            <h1>Trades</h1>
            <ul>
                {trades.map(trade => (
                    <li key={trade.id}>
                        <h2>{`Trade by: ${trade.trader_name}`}</h2>
                        <div>
                            <h3>Offered Sneakers:</h3>
                            {trade.sneakers_offered.map((sneaker, index) => (
                                <img key={index} src={sneaker} alt="Offered Sneaker" />
                            ))}
                        </div>
                        <div>
                            <h3>Requested Sneakers:</h3>
                            {trade.sneakers_requested.map((sneaker, index) => (
                                <img key={index} src={sneaker} alt="Requested Sneaker" />
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Trading;
