// TradingShoeCard.jsx
import React from 'react';

const calculateTotalPrice = (shoes) => {
    return shoes.reduce((total, shoe) => total + shoe.price, 0);
};

const renderShoesGrid = (shoes) => {
    const gridColumns = shoes.length === 1 ? 'grid-cols-1' : 'grid-cols-2';
    return (
        <div className={`grid ${gridColumns} gap-4`}>
            {shoes.map((shoe) => (
                <div key={shoe.id} className="relative bg-white border border-gray-200 rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
                    <img src={shoe.imageUrl} alt="" className="w-full h-40 object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-center">{shoe.name}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

const TradingShoeCard = ({ product }) => {
    return (
        <div className="border border-gray-300 rounded-2xl p-4">
            <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
            <div className="flex justify-between items-center mb-4">
                <div className="w-1/2 pr-2">
                    <h3 className="text-xl font-semibold mb-2" style={{ color: 'rgb(68, 71, 78)', fontSize: '14px' }}>Item(s) you are getting</h3>
                    {renderShoesGrid(product.trading)}
                </div>
                <div className="w-1/2 pl-2">
                    <h3 className="text-xl font-semibold mb-2" style={{ color: 'rgb(68, 71, 78)', fontSize: '14px' }}>Item(s) you are giving</h3>
                    {renderShoesGrid(product.askedForTrade)}
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className="w-1/2 pr-2 text-center">
                    <h3 className="text-xl font-semibold" style={{ color: 'rgb(68, 71, 78)', fontSize: '14px' }}>Est. value (new): ${calculateTotalPrice(product.trading)}</h3>
                </div>
                <div className="w-1/2 pl-2 text-center">
                    <h3 className="text-xl font-semibold" style={{ color: 'rgb(68, 71, 78)', fontSize: '14px' }}>Est. value (new): ${calculateTotalPrice(product.askedForTrade)}</h3>
                </div>
            </div>
            <div className="text-center mt-4" style={{ color: 'rgb(68, 71, 78)', fontSize: '14px' }}>
                <p>May 17 2024</p>
            </div>
        </div>
    );
};

export default TradingShoeCard;
