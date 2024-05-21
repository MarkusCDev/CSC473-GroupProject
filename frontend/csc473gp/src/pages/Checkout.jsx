import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserAuth } from '../components/UserAuthentication';
import wallpaper from '../assets/wallpaper.jpg';


const Section = ({ title, children, isOpen, onClick }) => (
  <div className="w-1/4 p-4 rounded-lg bg-black bg-opacity-70">
    <button
      className="w-full text-white text-left text-lg font-bold py-2 px-4"
      onClick={() => onClick(title)}
    >
      {title}
    </button>
    {isOpen ? <div className="mt-4">{children}</div> : null}
  </div>
)

const Checkout = () => {
  const { user } = useUserAuth()
  const [email, setEmail] = useState(user?.email)
  const [openSection, setOpenSection] = useState('Items');
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const [sellers, setSellers] = useState([])

  const handleSectionClick = (section) => {
    setOpenSection(openSection === section ? '' : section);
  };

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
      setCart(response.data.cart || [])
      const sellerList = response.data.cart.map(item => item.seller_email);
      setSellers(sellerList)
      console.log("sellers", sellerList)
    } catch (error) {
      console.error(error);
      setError("Failed to load profile data");
    }
  };

  useEffect(() => {
    if (user) {
      getProfileData();
    }
  }, [user]);

  useEffect(() => {
    const totalPrice = cart.reduce((sum, item) => {
      const price = parseFloat(item.shoe_price);
      return sum + (isNaN(price) ? 0 : price);
    }, 0);
    setTotal(totalPrice);
  }, [cart]);

  const handleCheckout = async () => {
    if (!user) {
      setError("You must be logged in to checkout.")
      return
    }
  
    // for each seller pass in seller_email into loop to add the order to each item seller
    // all of this is in cart.sell

    // try {  
    //   await axios.post(
    //     `${import.meta.env.VITE_APP_CLOUD_API_URL}/checkout/transact`,
    //     {
    //       user_id: 
    //       new_item: 
    //     },
    //     {
    //       headers: {
    //         Authorization: `${user.email}`,
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   )
    //   console.log("Profile Updated:", response.data)
    // } catch (error) {
    //   setError("Failed to remove item from cart");
    // }

    // try {  
    //   await axios.post(
    //     `${import.meta.env.VITE_APP_CLOUD_API_URL}/profile/update_profile`,
    //     {
    //       cart: []
    //     },
    //     {
    //       headers: {
    //         Authorization: `${user.email}`,
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   )
    //   console.log("Profile Updated:", response.data)
    // } catch (error) {
    //   setError("Failed to remove item from cart");
    // }


  
  };

  return (
    <div
      className="space-y-4 mx-auto p-8 bg-cover bg-center bg-no-repeat min-h-screen w-full flex flex-col items-center"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <Section
        title="Items"
        isOpen={openSection === 'Items'}
        onClick={handleSectionClick}
      >
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="flex items-center justify-between mb-4 p-2 border-b">
              <img src={item.shoe_img} alt={item.type} className="w-16 h-16 object-cover" />
              <div className="text-white flex flex-col justify-end">
                <span className="font-semibold">Type: {item.type}</span>
                <span>Price: <span className='text-green-500'>${isNaN(parseFloat(item.shoe_price)) ? '0.00' : parseFloat(item.shoe_price).toFixed(2)}</span></span>
              </div>
            </div>
          ))
        )}
      </Section>

      <Section
        title="Shipping"
        isOpen={openSection === 'Shipping'}
        onClick={handleSectionClick}
      >
        <form className="space-y-4">
          <div className="flex flex-row space-x-4">
            <div className="z-0 w-full mb-5">
              <input
                type="text"
                placeholder="First Name"
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
            <div className="z-0 w-full mb-5">
              <input
                type="text"
                placeholder="Last Name"
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
          </div>
          <div className="z-0 w-full mb-5">
            <input
              type="text"
              placeholder="Address"
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
            />
          </div>
          <div className="flex flex-row space-x-4">
    
            <div className="z-0 w-full mb-5">
              <input
                type="text"
                placeholder="Phone"
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
            <div className="z-0 w-full mb-5">
              <input
                type="text"
                placeholder="City"
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
            <div className="z-0 w-full mb-5">
              <input
                type="text"
                placeholder="State"
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
            <div className="z-0 w-full mb-5">
              <input
                type="text"
                placeholder="Zip Code"
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
          </div>
        </form>
      </Section>

      <Section
        title="Checkout"
        isOpen={openSection === 'Checkout'}
        onClick={handleSectionClick}
      >
        <div className="flex justify-between mb-2">
          <span className="font-semibold text-white">Total:</span>
          <span className='text-green-500'>${total.toFixed(2)}</span>
        </div>
        <button onClick={handleCheckout} className="transition ease-in-out delay-150 hover:scale-105 duration-300 w-full rounded-full py-2 mt-2 text-white bg-blue-500 hover:bg-green-500">
          Complete Purchase
        </button>
      </Section>
    </div>
  );
};

export default Checkout;
