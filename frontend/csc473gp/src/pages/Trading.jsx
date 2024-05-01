import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigator from '../components/Navigator'; // Added import statement

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
    <div>
      <Navigator /> {/* Added Navigator component */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {trades.map((trade) => (
          <div
            className="flex flex-col border border-gray-300 rounded-lg shadow-sm overflow-hidden"
            key={trade.id}
            style={{ height: '350px' }} // Fixed height for each trade box
          >
            <div className="p-4 flex items-center space-x-3 bg-gray-50">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={trade.trader_avatar}
                alt={`${trade.trader_name}'s avatar`}
              />
              <span className="font-bold">{trade.trader_name}</span>
            </div>
            <div className="flex-grow p-4 flex flex-col justify-between">
              <div className="flex-1">
                <div className="flex justify-between">
                  <div className="w-1/2 p-1">
                    <h3 className="font-semibold text-center">Item(s) you are getting</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {trade.sneakers_offered.map((sneaker, index) => (
                        <img
                          className={`object-contain h-24 w-24 max-w-full max-h-full`}
                          key={index}
                          src={sneaker}
                          alt="Sneaker getting"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="w-1/2 p-1">
                    <h3 className="font-semibold text-center">Item(s) you are giving</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {trade.sneakers_requested.map((sneaker, index) => (
                        <img
                          className={`object-contain h-24 w-24 max-w-full max-h-full`}
                          key={index}
                          src={sneaker}
                          alt="Sneaker giving"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-sm font-medium mt-2 text-center">
                Est. value (new): ${trade.estimated_value_offered}
              </div>
              <div className="text-sm text-center">{trade.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trading;
