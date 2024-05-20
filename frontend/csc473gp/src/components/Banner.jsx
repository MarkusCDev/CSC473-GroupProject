import React from 'react'

const Banner = ({ img }) => {
  return (
    <div className="flex justify-center">
      <div className="overflow-hidden relative rounded-lg" style={{ height: '38vh', width: '58vw' }}>
        <img src={img} className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2" alt="Banner" />
      </div>
    </div>
  )
}

export default Banner
