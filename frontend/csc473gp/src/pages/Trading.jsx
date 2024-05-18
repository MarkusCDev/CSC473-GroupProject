import React from 'react';
import FeaturedShoeCarousel from '../components/Carousel/FeaturedShoeCarousel';
import TradeShoeCard from '../components/Cards/TradeShoeCard';
import Navigator from '../components/Navigator';

//TODO: Get productsId from API. Collection should be name 'trading' and only have IDs

// Simplified productsId array to contain only IDs
const productsId = [1, 2, 3, 4, 1, 3, 3, 2];

const Trading = () => {
    return (
        <div>
            <Navigator />
            <FeaturedShoeCarousel />
            <div className='max-w-screen-2xl mx-auto pt-2 p-5 sm:p-10 md:p-8'>

                <div className="flex flex-wrap scrollbar-hide w-full" style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}>
                    {productsId.map((id) => (
                        <div key={id} className="w-1/2 px-2">
                            <TradeShoeCard product={{ id }} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Trading;
