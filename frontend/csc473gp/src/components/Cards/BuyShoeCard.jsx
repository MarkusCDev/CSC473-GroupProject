import React from 'react';
import { Link } from 'react-router-dom';

const BuyShoeCard = ({ product }) => {
    return (
        <Link to={`/shoe/${product.id}`} key={product.id} className="flex-none snap-center">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 card">
                <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                    <h3 className="text-lg leading-6 font-bold text-gray-900">{product.name}</h3>
                    <p className="text-gray-600 mt-2 text-sm">Description here...</p>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-xl font-extrabold text-gray-900">{product.discountedPrice}</span>
                        <span className="text-sm line-through text-gray-500">{product.originalPrice}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BuyShoeCard;
