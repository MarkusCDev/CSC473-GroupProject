import React from 'react';
import { Link } from 'react-router-dom';

const products = [
    {
        id: 1,
        owner: 'aventura54',
        trading: [
            { id: 101, name: 'Air Jordan 1 Retro High OG', price: 1000, imageUrl: 'https://wallpapers.com/images/high/shoes-background-evoi6ni802pfz0ul.webp' },
        ],
        askedForTrade: [
            { id: 102, name: 'Nike Air Max 90', price: 500, imageUrl: 'https://i.ebayimg.com/images/g/-DwAAOSwkt9mHvC6/s-l1600.jpg' },
            { id: 103, name: 'Adidas Yeezy Boost 350', price: 524, imageUrl: 'https://i.ebayimg.com/images/g/LA8AAOSwvWtmHuEQ/s-l1600.jpg' },
        ],
    },
    {
        id: 2,
        owner: 'aventura55',
        trading: [
            { id: 201, name: 'Converse Chuck Taylor', price: 120, imageUrl: 'https://i.ebayimg.com/images/g/KKkAAOSwujBmHt-s/s-l1600.jpg' },
            { id: 202, name: 'Puma RS-X', price: 100, imageUrl: 'https://i.ebayimg.com/images/g/GRUAAOSwPBlmHrbQ/s-l1600.jpg' },
        ],
        askedForTrade: [
            { id: 203, name: 'Vans Old Skool', price: 140, imageUrl: 'https://i.ebayimg.com/images/g/5OUAAOSwgwxmHvB7/s-l1600.jpg' },
        ],
    },
    {
        id: 3,
        owner: 'aventura56',
        trading: [
            { id: 301, name: 'New Balance 574', price: 200, imageUrl: 'https://i.pinimg.com/736x/09/10/87/091087a1fad6dec229eb2ebf8e41a431.jpg' },
            { id: 302, name: 'Converse Chuck Taylor', price: 120, imageUrl: 'https://i.ebayimg.com/images/g/KKkAAOSwujBmHt-s/s-l1600.jpg' },

        ],
        askedForTrade: [
            { id: 303, name: 'Asics Gel Lyte III', price: 220, imageUrl: 'https://s.yimg.com/ny/api/res/1.2/2wNOJ0NLfk6DStVKy4V6qQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTkxMw--/https://s.yimg.com/os/creatr-uploaded-images/2023-12/29fb7210-9834-11ee-bfff-9c23faf735c5' },
            { id: 304, name: 'Reebok Classic', price: 240, imageUrl: 'https://i.ebayimg.com/images/g/5OUAAOSwgwxmHvB7/s-l1600.jpg' },
        ],
    },
    {
        id: 4,
        owner: 'aventura57',
        trading: [
            { id: 401, name: 'Nike Dunk Low', price: 300, imageUrl: 'https://i.pinimg.com/736x/09/10/87/091087a1fad6dec229eb2ebf8e41a431.jpg' },
        ],
        askedForTrade: [
            { id: 403, name: 'Jordan 4 Retro', price: 340, imageUrl: 'https://i.ebayimg.com/images/g/KKkAAOSwujBmHt-s/s-l1600.jpg' },
        ],
    },
    // Add more products as needed
];

const calculateTotalPrice = (shoes) => {
    return shoes.reduce((total, shoe) => total + shoe.price, 0);
};

const renderShoesGrid = (shoes) => {
    const gridColumns = shoes.length === 1 ? 'grid-cols-1' : 'grid-cols-2';
    return (
        <div className={`grid ${gridColumns} gap-4`}>
            {shoes.map((shoe) => (
                <div key={shoe.id} className="relative bg-white border border-gray-200 rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
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
    const productData = products.find(p => p.id === product.id);

    if (!productData) {
        return <div>Product not found</div>;
    }

    const isTradeProduct = productData.trading && productData.askedForTrade;

    return (
        <Link to={`/product/${productData.id}`} className="flex-none w-full px-2 mb-6 card">
            <div className="border border-gray-300 rounded-2xl p-4">
                <h2 className="text-2xl font-bold mb-4">{productData.owner}</h2>
                {isTradeProduct ? (
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <div className="w-1/2 pr-2">
                                <h3 className="text-xl font-semibold mb-2" style={{ color: 'rgb(68, 71, 78)', fontSize: '14px' }}>Item(s) you are getting</h3>
                                {renderShoesGrid(productData.trading)}
                            </div>
                            <div className="w-1/2 pl-2">
                                <h3 className="text-xl font-semibold mb-2" style={{ color: 'rgb(68, 71, 78)', fontSize: '14px' }}>Item(s) you are giving</h3>
                                {renderShoesGrid(productData.askedForTrade)}
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="w-1/2 pr-2 text-center">
                                <h3 className="text-xl font-semibold" style={{ color: 'rgb(68, 71, 78)', fontSize: '14px' }}>Est. value (new): ${calculateTotalPrice(productData.trading)}</h3>
                            </div>
                            <div className="w-1/2 pl-2 text-center">
                                <h3 className="text-xl font-semibold" style={{ color: 'rgb(68, 71, 78)', fontSize: '14px' }}>Est. value (new): ${calculateTotalPrice(productData.askedForTrade)}</h3>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="relative bg-white border border-gray-200 rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
                        <img src={productData.imageUrl} alt={productData.owner} className="w-full h-40 object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <span className="text-white text-center">{productData.owner}</span>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <div className="text-center">
                                <h3 className="text-xl font-semibold" style={{ color: 'rgb(68, 71, 78)', fontSize: '14px' }}>Original Price: {productData.originalPrice}</h3>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-semibold" style={{ color: 'rgb(68, 71, 78)', fontSize: '14px' }}>Discounted Price: {productData.discountedPrice}</h3>
                            </div>
                        </div>
                    </div>
                )}
                <div className="text-center mt-4" style={{ color: 'rgb(68, 71, 78)', fontSize: '14px' }}>
                    <p>May 17 2024</p>
                </div>
            </div>
        </Link>
    );
};

export default TradeShoeCard;
