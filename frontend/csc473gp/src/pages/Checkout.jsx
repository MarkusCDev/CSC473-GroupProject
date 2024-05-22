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
);

const Checkout = () => {
  const { user } = useUserAuth();
  const [email, setEmail] = useState(user?.email);
  const [openSection, setOpenSection] = useState('Items');
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const [sellers, setSellers] = useState([]);

  const handleSectionClick = (section) => {
    setOpenSection(openSection === section ? '' : section);
  };

  const getProfileData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_CLOUD_API_URL2}/profile/get_profile`,
        {
          headers: {
            Authorization: `${user.email}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Profile Cart:", response.data.cart);
      setCart(response.data.cart || []);
      const sellerList = response.data.cart.map(item => item.seller_email);
      setSellers(sellerList);
      console.log("sellers", sellerList);
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
      setError("You must be logged in to checkout.");
      return;
    }
  
    try {
      // Update seller records
      const updateSellerPromises = cart.map(async (item) => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_APP_CLOUD_API_URL2}/checkout/transact`,
            {
              user_id: item.seller_email,
              new_item: item,
            },
            {
              headers: {
                Authorization: `${user.email}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log("Seller Updated:", response.data);
        } catch (error) {
          console.error(`Failed to update seller ${item.seller_email}:`, error);
          throw error; // Ensure all promises in Promise.all fail if one fails
        }
      });
  
      // Wait for all seller updates to complete
      await Promise.all(updateSellerPromises);
  
      // Delete items from their respective collections
      const deleteItemPromises = cart.map(async (item) => {
        const collectionMap = {
          auction: "Auction",
          trade: "Trade",
          buy: "Buy",
        };
        const collection = collectionMap[item.type];
  
        if (collection) {
          try {
            const response = await axios.post(
              'https://testingbaka-e2agf6geqq-ue.a.run.app/document_deletion/delete_document',
              {
                collection: collection,
                document_id: item.id,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            console.log(`Item deleted from ${collection}:`, response.data);
          } catch (error) {
            console.error(`Failed to delete item ${item.id} from ${collection}:`, error);
            throw error; // Ensure all promises in Promise.all fail if one fails
          }
        }
      });
  
      // Wait for all deletions to complete
      await Promise.all(deleteItemPromises);
  
      // Update buyer's transaction history and clear the cart
      const response = await axios.post(
        `${import.meta.env.VITE_APP_CLOUD_API_URL2}/profile/update_profile`,
        {
          cart: [], // Clear the cart
          transactions: cart, // Add items to transactions
        },
        {
          headers: {
            Authorization: `${user.email}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      // Clear the local cart state
      setCart([]);
      setTotal(0);
      console.log("Profile Updated and Cart Cleared:", response.data);
    } catch (error) {
      console.error("Checkout Failed:", error);
      setError("Failed to complete the checkout process. Please try again.");
    }
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
