import React from 'react'
import ImageCarousel from '../components/Carousel'
import Navigator from '../components/Navigator'
import ProductSlider from '../components/ProductSlider'
import SliderTitle from '../components/SliderTitle'
// TODO - carrousel slide show thing with log and etc

const Landing = () => {
  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-b '>
      <div className='w-full'>
        <Navigator />
      </div>
      <div className='w-full'>
        <ImageCarousel/>
      </div>
      <div className='max-w-screen-2xl mx-auto p-5 sm:p-10 md:p-16'>
        <SliderTitle title='Trending' link='/Trending'/>
        <ProductSlider />
      </div>
    </div>
  )
}

export default Landing