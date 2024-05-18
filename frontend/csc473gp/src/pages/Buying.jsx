import React from 'react';
import FeaturedShoeCarousel from '../components/Carousel/FeaturedShoeCarousel';
import BuyShoeCard from '../components/Cards/BuyShoeCard';
import Navigator from '../components/Navigator';

// TODO: Get productsId from API. Collection should be name 'buying' and only have IDs

const productIds = [
    { shoeId: 101 },
    { shoeId: 301 },
    { shoeId: 202 },
    { shoeId: 201 },
    { shoeId: 302 },
    { shoeId: 401 }
];

const Buying = () => {    
    return (
        <div>
            <Navigator />
            <FeaturedShoeCarousel />
            <div className="flex flex-wrap scrollbar-hide w-full" style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
            }}>
                {productIds.map(({ shoeId }) => {
                    console.log('Rendering BuyShoeCard with id:', shoeId);
                    return (
                        <div key={shoeId} className="w-1/2 px-2 mb-6">
                            <BuyShoeCard productId={shoeId} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Buying;
