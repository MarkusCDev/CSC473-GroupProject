import React from 'react'

const Navigator = () => {
  return (
    <div className="bg-gray-800 text-white p-4">
      <div className="flex justify-around items-center max-w-6xl mx-auto">
        <a href="/Buying" className="hover:text-gray-300">Buy</a>
        <a href="" className="hover:text-gray-300">Sell</a>
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="p-1 rounded-lg text-black text-center"
          />
        </div>
        <a href="" className="hover:text-gray-300">Auction</a>
        <a href="/Trading" className="hover:text-gray-300">Trade</a>
      </div>
    </div>
  )
}

export default Navigator