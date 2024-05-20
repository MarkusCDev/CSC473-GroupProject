import React from 'react'
import { Link } from 'react-router-dom'

const Navigator = () => {
  return (
    <div className="bg-gray-800 text-white p-4">
      <div className="flex justify-around items-center max-w-6xl mx-auto">
        <Link to="/Buying" className="hover:text-gray-300">Buy</Link>
        <Link to="/Store" className="hover:text-gray-300">Sell</Link>
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="p-1 rounded-lg text-black text-center"
          />
        </div>
        <Link to="/Auctioning" className="hover:text-gray-300">Auction</Link>
        <Link to="/Trading" className="hover:text-gray-300">Trade</Link>
      </div>
    </div>
  )
}

export default Navigator