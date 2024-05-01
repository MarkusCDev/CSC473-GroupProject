import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Trading = () => {
    const [trades, setTrades] = useState([]);

    useEffect(() => {
        const fetchTrades = async () => {
            try {
                const response = await axios.get('http://localhost:5000/trading/fetch_trades');
                setTrades(response.data.trades);
            } catch (error) {
                console.error('Error fetching trades:', error);
            }
        };

        fetchTrades();
    }, []);

    return (
        <div className="flex flex-wrap justify-center gap-4 p-4">
            {trades.map(trade => (
                <div className="flex flex-col border border-gray-300 rounded-lg shadow-sm overflow-hidden" key={trade.id}>
                    <div className="p-4 flex items-center space-x-3 bg-gray-50">
                        <img className="w-10 h-10 rounded-full" src={trade.trader_avatar} alt={`${trade.trader_name}'s avatar`} />
                        <span className="font-bold">{trade.trader_name}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                        <div className="col-span-1">
                            <h3 className="font-semibold text-center">Item(s) you are getting</h3>
                            <div className="flex flex-wrap justify-center gap-2 p-2">
                                {trade.sneakers_offered.map((sneaker, index) => (
                                    <img className="w-24 md:w-32 lg:w-48" key={index} src={sneaker} alt="Sneaker getting" />
                                ))}
                            </div>
                            <p className="text-sm text-center font-medium">Est. value (new): ${trade.estimated_value_offered}</p>
                        </div>
                        <div className="col-span-1">
                            <h3 className="font-semibold text-center">Item(s) you are giving</h3>
                            <div className="flex flex-wrap justify-center gap-2 p-2">
                                {trade.sneakers_requested.map((sneaker, index) => (
                                    <img className="w-24 md:w-32 lg:w-48" key={index} src={sneaker} alt="Sneaker giving" />
                                ))}
                            </div>
                            <p className="text-sm text-center font-medium">Est. value (new): ${trade.estimated_value_requested}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Trading;
