import React from 'react'
import { Link } from 'react-router-dom'
import wallpaper from '../assets/wallpaper.jpg'

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${wallpaper})` }}> 
      <div className="text-center opacity-85 bg-black rounded-lg p-5 bg-black">
        <div className="mb-8">
          <h1 className="text-4xl text-white font-bold">404 Not Found</h1>
        </div>
        <div className="mb-6">
          <p className="text-xl text-white">Oops! The page you're looking for doesn't exist.</p>
        </div>
        <div>
          <Link to="/" className="text-white hover:text-green-600 font-bold">Go Back Home</Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound