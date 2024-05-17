import React from 'react';
import BuyShoeCard from '../components/Cards/BuyShoeCard';
import FeaturedShoeCarousel from '../components/Carousel/FeaturedShoeCarousel';
import TradingShoeCard from '../components/Cards/TradeShoeCard';

const products = [
    { id: 1, name: 'Product 1', originalPrice: '$20', discountedPrice: '$10', imageUrl: 'https://wallpapers.com/images/high/shoes-background-evoi6ni802pfz0ul.webp' },
    { id: 2, name: 'Product 2', originalPrice: '$30', discountedPrice: '$20', imageUrl: 'https://i.ebayimg.com/images/g/LA8AAOSwvWtmHuEQ/s-l1600.jpg' },
    { id: 3, name: 'Product 3', originalPrice: '$25', discountedPrice: '$15', imageUrl: 'https://i.ebayimg.com/images/g/-DwAAOSwkt9mHvC6/s-l1600.jpg' },
    { id: 4, name: 'Product 4', originalPrice: '$35', discountedPrice: '$25', imageUrl: 'https://i.ebayimg.com/images/g/GRUAAOSwPBlmHrbQ/s-l1600.jpg' },
    { id: 5, name: 'Product 5', originalPrice: '$40', discountedPrice: '$30', imageUrl: 'https://i.ebayimg.com/images/g/KKkAAOSwujBmHt-s/s-l1600.jpg' },
    { id: 6, name: 'Product 6', originalPrice: '$50', discountedPrice: '$35', imageUrl: 'https://i.ebayimg.com/images/g/5OUAAOSwgwxmHvB7/s-l1600.jpg' },
    { id: 7, name: 'Product 7', originalPrice: '$60', discountedPrice: '$40', imageUrl: 'https://s.yimg.com/ny/api/res/1.2/2wNOJ0NLfk6DStVKy4V6qQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTkxMw--/https://s.yimg.com/os/creatr-uploaded-images/2023-12/29fb7210-9834-11ee-bfff-9c23faf735c5' },
    { id: 8, name: 'Product 8', originalPrice: '$70', discountedPrice: '$45', imageUrl: 'https://i.pinimg.com/736x/09/10/87/091087a1fad6dec229eb2ebf8e41a431.jpg' },
];

const Buying = () => {
    return (
        <div>
            <FeaturedShoeCarousel />
            <div className="flex overflow-x-scroll scrollbar-hide gap-2 w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {products.map((product) => (
                    <div key={product.id} className="flex-none w-1/5">
                        <TradingShoeCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Buying;
