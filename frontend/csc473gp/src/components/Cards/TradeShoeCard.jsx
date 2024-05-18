import React from 'react';
import { Link } from 'react-router-dom';

const calculateTotalPrice = (shoes) => {
    return shoes.reduce((total, shoe) => total + parseFloat(shoe.price), 0);
};

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

const TradeShoeCard = ({ product }) => {
    if (!product || !product.shoe) {
        return <div>Product not found</div>;
    }

    const { owner, trading, askedForTrade, shoe } = product;

    return (
        <Link to={`/product/${shoe.id}`} className="flex-none w-full px-2 mb-6 card">
            <div className="border border-gray-300 rounded-2xl p-4">
                <h2 className="text-2xl font-bold mb-4">{owner}</h2>
                <div className="flex justify-between items-center mb-4">
                    <div className="w-1/2 pr-2">
                        <h3 className="text-xl font-semibold mb-2" style={{ color: 'rgb(68, 71, 78)', fontSize: '14px' }}>Item(s) you are getting</h3>
                        {renderShoesGrid(trading)}
                    </div>
                    <div className="w-1/2 pl-2">
                        <h3 className="text-xl font-semibold mb-2" style={{ color: 'rgb(68, 71, 78)', fontSize: '14px' }}>Item(s) you are giving</h3>
                        {renderShoesGrid(askedForTrade)}
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="w-1/2 pr-2 text-center">
                        <h3 className="text-xl font-semibold" style={{ color: 'rgb(68, 71, 78)', fontSize: '14px' }}>Est. value (new): ${calculateTotalPrice(trading)}</h3>
                    </div>
                    <div className="w-1/2 pl-2 text-center">
                        <h3 className="text-xl font-semibold" style={{ color: 'rgb(68, 71, 78)', fontSize: '14px' }}>Est. value (new): ${calculateTotalPrice(askedForTrade)}</h3>
                    </div>
                </div>
                <div className="text-center mt-4" style={{ color: 'rgb(68, 71, 78)', fontSize: '14px' }}>
                    <p>May 17 2024</p>
                </div>
            </div>
        </Link>
    );
};

export default TradeShoeCard;
