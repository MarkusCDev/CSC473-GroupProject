import React,{ useEffect } from 'react';
import Navigator from '../components/Navigator';
import ShoeDetail from '../components/Cards/ShoeDetail';
import BuyShoesCarousel from '../components/Carousel/BuyShoesCarousel';
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
      <div className='w-full mt-8'> {/* Added margin-top here */}
        <ShoeDetail />
      </div>
      <div className='max-w-screen-2xl mx-auto p-5 sm:p-10 md:p-16'>
        <SliderTitle title='Related products' link="/featured"/>
        <BuyShoesCarousel />
      </div>
    </div>
  );
};

export default Landing;
