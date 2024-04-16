import React from 'react'
import ImageCarousel from '../components/Carousel'
import Navigator from '../components/Navigator'
import ProductSlider from '../components/ProductSlider'

// TODO - carrousel slide show thing with log and etc

const Landing = () => {
  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-b from-stone-300 to-stone-500'>
      <div className='w-full'>
        <Navigator />
      </div>
      <div className='w-full'>
        <ImageCarousel/>
      </div>
      <div>
          <p>Landing</p>
          <ProductSlider />
      </div>
    </div>
  )
}

export default Landing