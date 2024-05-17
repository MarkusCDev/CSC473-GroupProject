import React from 'react';
import Navigator from '../components/Navigator';
import ShoeDetail from '../components/ShoeDetail';
import SwipeableProductCarousel from '../components/SwipeableProductCarousel';
import SliderTitle from '../components/SliderTitle';

const Landing = () => {
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
        <SwipeableProductCarousel />
      </div>
    </div>
  );
};

export default Landing;
