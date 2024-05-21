import React,{ useEffect } from 'react';
import Navigator from '../components/Navigator';

import TradeShoeDetail from '../components/Cards/TradeShoeDetail';
import TradeShoesCarousel from '../components/Carousel/TradeShoesCarousel';
import SliderTitle from '../components/SliderTitle';
import { useParams, useLocation } from 'react-router-dom';

const useScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
};


const Landing = () => {
  useScrollToTop();

  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-b  '>
      <div className='w-full'>
        <Navigator />
      </div>
      <div className='w-full'> {/* Added margin-top here */}
        <TradeShoeDetail />
      </div>
      <div className='max-w-screen-2xl mx-auto p-5 sm:p-10 md:p-16'>
        <SliderTitle title='Related products' link="/featured"/>
        <TradeShoesCarousel />
      </div>
    </div>
  );
};

export default Landing;
