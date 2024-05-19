import React from 'react';
import { Link } from 'react-router-dom';

const BuyShoeCard = ({ product, shoe }) => {
    if (!shoe) {
        console.error('Shoe not found');
        return <div>Shoe not found</div>;
    }

    return (
        <Link to={`/shoe/${product.id}`} className="flex-none snap-center">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 card" style={{ width: '250px', height: '400px' }}>
                <img src={shoe.imageUrl} alt={shoe.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                    <h3 className="text-lg leading-6 font-bold text-gray-900">{shoe.name}</h3>
                    <p className="text-gray-600 mt-2 text-sm">Sold by: {product.owner}</p>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-xl font-extrabold text-gray-900">${shoe.discountedPrice}</span>
                        <span className="text-sm line-through text-gray-500">${shoe.originalPrice}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BuyShoeCard;
