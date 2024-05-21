import React, { useRef } from 'react'
import FeaturedShoeCarousel from '../components/Carousel/FeaturedShoeCarousel'
import Navigator from '../components/Navigator'
import SliderTitle from '../components/SliderTitle'
import bounce from '../assets/logo.png'
import buyimg from '../assets/tags.png'
import tradeimg from '../assets/exchange.png'
import auctionimg from '../assets/duration.png'
import TradeShoesCarousel from '../components/Carousel/TradeShoesCarousel'
import BuyShoesCarousel from '../components/Carousel/BuyShoesCarousel'
import AuctionShoeCarousel from '../components/Carousel/AuctionShoeCarousel'

const Landing = () => {
  // Refs for scrolling
  const saleRef = useRef(null)

  // Function to handle scrolling
  const scrollToRef = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  };

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
        <img
          className="animate-bounce cursor-pointer" 
          width="60px" 
          src={bounce} 
          alt="bounce image"
          onClick={() => scrollToRef(saleRef)}
        />
      </div>
      <div ref={saleRef} className='w-3/5 mx-auto p-2 sm:p-4 md:p-6'> 
        <SliderTitle img={buyimg} title='Recently Added For Sale' link='/Buying' />
        <BuyShoesCarousel />
      </div>
      <div className='w-3/5 mx-auto p-2 sm:p-4 md:p-6'> 
        <SliderTitle img={tradeimg} title='Recently Added Trades' link='/Trading' />
        <TradeShoesCarousel />
      </div>
      <div className='w-3/5 mx-auto p-2 sm:p-4 md:p-6'> 
        <SliderTitle img={auctionimg} title='Recently Added Auctions' link='/Buying' />
        <AuctionShoeCarousel />
      </div>
    </div>
  )
}

export default Landing
