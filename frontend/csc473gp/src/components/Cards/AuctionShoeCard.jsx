import React from 'react'
import { Link } from 'react-router-dom'

const AuctionShoeCard = ({ product }) => {
    const {
        shoe_img: imageUrl,
        shoe_name: name,
        creation_date: createdon,
        shoe_company: company,
        shoe_description: description,
        seller_email: owner,
        shoe_price: shoe_price,
        shoe_ai_description: openai,
    } = product

    return (
        <Link to={`/auction-shoe/${product.id}`} className="flex-none snap-center">
            <div className="bg-opacity-95 bg-gray-200 border border-gray-200 rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 card" style={{ width: '250px', height: '300px' }}>
                <img src={imageUrl} alt={name} className="w-full h-40 object-cover" />
                <div className="p-4">
                    <h3 className="text-lg leading-6 text-center font-bold text-gray-900">{name}</h3>
                    {/* <p className="text-gray-600 mt-2 text-sm">Seller: {owner}</p> */}
                    <div className="absolute inset-0 rounded-lg flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white mt-2 text-sm">{owner}</p>
                        <p className="text-white mt-2 text-sm">{openai.release_date}</p>
                        <p className="text-white mt-2 text-sm">Created on: {createdon}</p>
                    </div>
                    <p className="text-gray-600 mt-2 text-sm">Brand: {company}</p>
                    <p className="text-gray-600 mt-2 text-sm">Details: {description}</p>
                    <div className="flex justify-end items-center mt-1">
                        <span className="text-xl font-extrabold text-gray-900">${shoe_price}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default AuctionShoeCard