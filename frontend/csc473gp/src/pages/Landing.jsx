import React from 'react'
import FeaturedShoeCarousel from '../components/Carousel/FeaturedShoeCarousel'
import Navigator from '../components/Navigator'
import SliderTitle from '../components/SliderTitle'
import bounce from '../assets/logo.png'

import buyimg from '../assets/tags.png'
import tradeimg from '../assets/exchange.png'
import auctionimg from '../assets/duration.png'



import TradeShoesCarousel from '../components/Carousel/TradeShoesCarousel'
import BuyShoesCarousel from '../components/Carousel/BuyShoesCarousel'
// TODO - carrousel slide show thing with log and etc

const Landing = () => {
  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-b'>
      <div className='w-full'>
        <Navigator />
      </div>
      <div className='w-3/5 mx-auto'> 
        <FeaturedShoeCarousel />
      </div>
      {/* Separator */}
      <div className='w-full h-14 flex justify-center'>
        <img className="animate-bounce" width="60px" src={bounce} alt="bounce image"/>
      </div>
      <div className='w-3/5 mx-auto pt-2 p-5 sm:p-10 md:p-8'> 
        <SliderTitle img={buyimg} title='Recently Added For Sale' link='/Buying' />
        <BuyShoesCarousel />
      </div>
      <div className='w-3/5 mx-auto pt-2 p-5 sm:p-10 md:p-8'> 
        <SliderTitle img={tradeimg} title='Recently Added Trades' link='/Trading' />
        <TradeShoesCarousel />
      </div>
      <div className='w-3/5 mx-auto pt-2 p-5 sm:p-10 md:p-8'> 
        <SliderTitle img={auctionimg} title='Recently Added Auctions' link='/Buying' />
        <BuyShoesCarousel />
      </div>
    </div>
  )
}

export default Landing