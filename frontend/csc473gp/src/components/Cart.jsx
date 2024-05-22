import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useUserAuth } from './UserAuthentication';

const Cart = ({ isOpen, onClose }) => {
  const { user } = useUserAuth();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");

  const getProfileData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_CLOUD_API_URL2}/profile/get_profile`, {
          headers: {
            Authorization: `${user.email}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Profile Cart:", response.data.cart);
      setCart(response.data.cart || []);
    } catch (error) {
      //console.error(error);
    }
  };

  const removeItemFromCart = async (index) => {
    try {
      const updatedCart = cart.filter((_, i) => i !== index);
      setCart(updatedCart);

      await axios.post(
        `${import.meta.env.VITE_APP_CLOUD_API_URL}/profile/update_profile`,
        {
          cart: updatedCart
        },
        {
          headers: {
            Authorization: `${user.email}`,
            "Content-Type": "application/json",
          },
        }
      )
      console.log("Payment Updated:", response.data)
    } catch (error) {
      setError("Failed to remove item from cart");
    }
  };

  useEffect(() => {
    if (user) {
      getProfileData();
    }
  }, [user]);

  useEffect(() => {
    // Calculate the total price whenever the cart changes
    const totalPrice = cart.reduce((sum, item) => {
      const price = parseFloat(item.shoe_price);
      return sum + (isNaN(price) ? 0 : price);
    }, 0);
    setTotal(totalPrice);
  }, [cart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gray-900 bg-opacity-50">
      <div className="absolute inset-y-0 right-0 w-80 bg-white bg-opacity-90 shadow">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="p-4">
          {/* {error && <p className="text-red-500">{error}</p>} */}
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="flex items-center justify-between mb-4 p-2 border-b">
                <img src={item.shoe_img} alt={item.type} className="w-16 h-16 object-cover" />
                <div className="flex flex-col justify-end">
                  <span className="font-semibold">Type: {item.type}</span>
                  <span>Price: ${isNaN(parseFloat(item.shoe_price)) ? '0.00' : parseFloat(item.shoe_price).toFixed(2)}</span>
                </div>
                <button
                  onClick={() => removeItemFromCart(index)}
                  className="text-red-500 focus:outline-none"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
        <div className="px-4 py-2 border-t">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Link to="checkout">
            <button onClick={onClose} className="transition ease-in-out delay-150 hover:scale-105 duration-300 w-full rounded-full py-2 mt-2 text-white bg-blue-500 hover:bg-blue-600">
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
