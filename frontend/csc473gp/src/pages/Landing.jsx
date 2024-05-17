import React from 'react'
import FeaturedShoeCarousel from '../components/Carousel/FeaturedShoeCarousel'
import Navigator from '../components/Navigator'
import SliderTitle from '../components/SliderTitle'



import TradeShoesCarousel from '../components/Carousel/TradeShoesCarousel'
import BuyShoesCarousel from '../components/Carousel/BuyShoesCarousel'
// TODO - carrousel slide show thing with log and etc

const Landing = () => {
  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-b '>
      <div className='w-full'>
        <Navigator />
      </div>
      <div className='w-full'>
        <FeaturedShoeCarousel />
      </div>
      {/* Separator */}
      <div className='w-full h-14 '></div>

      <div className='max-w-screen-2xl mx-auto pt-2 p-5 sm:p-10 md:p-8'>
        <SliderTitle title='trading deals' link='/Popular Trading' />
        <TradeShoesCarousel /></div>
      <div className='max-w-screen-2xl mx-auto pt-2 p-5 sm:p-10 md:p-8'>
        <SliderTitle title='Buying Deals' link='/Popular Selling' />
        <BuyShoesCarousel />
      </div>

    </div>
  )
}

export default Landing