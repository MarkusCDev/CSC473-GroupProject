import React from 'react'
import ImageCarousel from '../components/Carousel'
import Navigator from '../components/Navigator'
import ProductSlider from '../components/ProductSlider'
import SliderTitle from '../components/SliderTitle'
import SwipeableProductCarousel from '../components/SwipeableProductCarousel'
import TradeShoesCarousel from '../components/TradeShoesCarousel'
// TODO - carrousel slide show thing with log and etc

const Landing = () => {
  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-b '>
      <div className='w-full'>
        <Navigator />
      </div>
      <div className='w-full'>
        <ImageCarousel />
      </div>
      {/* Separator */}
      <div className='w-full h-14 '></div>

      <div className='max-w-screen-2xl mx-auto pt-2 p-5 sm:p-10 md:p-8'>
        <SliderTitle title='deals trading' link='/Popular Trading' />
        <TradeShoesCarousel /></div>
      <div className='max-w-screen-2xl mx-auto pt-2 p-5 sm:p-10 md:p-8'>
        <SliderTitle title='deals buying' link='/Popular Selling' />
        <SwipeableProductCarousel />
      </div>

    </div>
  )
}

export default Landing