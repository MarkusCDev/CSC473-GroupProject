import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Cart = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gray-900 bg-opacity-50">
      <div className="absolute inset-y-0 right-0 w-96 bg-white bg-opacity-90 shadow">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={onClose}className="text-gray-500 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="p-4">
          {/* Cart Content */}
        </div>
        <div className="px-4 py-2 border-t">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Total:</span>
            {/* Total amount */}
            <span>$0.00</span>
          </div>
          {/* Checkout button */}
           <Link to="checkout"><button onClick={onClose} className="transition ease-in-out delay-150 hover:scale-105 duration-300 w-full rounded-full py-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600">Checkout</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Cart