import React from 'react';
import { Link } from 'react-router-dom';

const products = [
    {
        id: 1,
        owner: 'aventura54',
        selling: [
            { id: 101, name: 'Air Jordan 1 Retro High OG', originalPrice: 1200, discountedPrice: 1000, imageUrl: 'https://wallpapers.com/images/high/shoes-background-evoi6ni802pfz0ul.webp' },
        ],
    },
    {
        id: 2,
        owner: 'aventura55',
        selling: [
            { id: 201, name: 'Converse Chuck Taylor', originalPrice: 150, discountedPrice: 120, imageUrl: 'https://i.ebayimg.com/images/g/KKkAAOSwujBmHt-s/s-l1600.jpg' },
            { id: 202, name: 'Puma RS-X', originalPrice: 100, discountedPrice: 80, imageUrl: 'https://i.ebayimg.com/images/g/GRUAAOSwPBlmHrbQ/s-l1600.jpg' },
        ],
    },
    {
        id: 3,
        owner: 'aventura56',
        selling: [
            { id: 301, name: 'New Balance 574', originalPrice: 200, discountedPrice: 180, imageUrl: 'https://i.pinimg.com/736x/09/10/87/091087a1fad6dec229eb2ebf8e41a431.jpg' },
            { id: 302, name: 'Converse Chuck Taylor', originalPrice: 120, discountedPrice: 100, imageUrl: 'https://i.ebayimg.com/images/g/KKkAAOSwujBmHt-s/s-l1600.jpg' },
        ],
    },
    {
        id: 4,
        owner: 'aventura57',
        selling: [
            { id: 401, name: 'Nike Dunk Low', originalPrice: 300, discountedPrice: 250, imageUrl: 'https://i.pinimg.com/736x/09/10/87/091087a1fad6dec229eb2ebf8e41a431.jpg' },
        ],
    },
    // Add more products as needed
];

const BuyShoeCard = ({ productId }) => {
    let product, shoe;

    // Find the product and shoe based on the productId
    for (let prod of products) {
        shoe = prod.selling.find(s => s.id === productId);
        if (shoe) {
            product = prod;
            break;
        }
    }

    if (!shoe) {
        console.error('Product not found for productId:', productId);
        return <div>Product not found</div>;
    }

    return (
        <Link to={`/shoe/${shoe.id}`} className="flex-none snap-center">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 card">
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
