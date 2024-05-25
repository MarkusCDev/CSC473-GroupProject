import React, {useState, useEffect, useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../components/UserAuthentication';
import profile from '../assets/profile.png';
import axios from "axios";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import additem from '../assets/add.png';
import store from '../assets/store.png';
import cardimg from '../assets/card.png';
import cog from '../assets/cog.png';
import defaultpfp from '../assets/profile.png';

import mailimg from '../assets/account/mail.png';
import homeimg from '../assets/account/home.png';
import phoneimg from '../assets/account/phone.png';
import sizeimg from '../assets/account/size.png';
import cardimgg from '../assets/account/card.png';
import edit from '../assets/account/edit.png';

import wallpaper from '../assets/wallpaper.jpg';
import AddItemModal from '../components/Modal';
import StoreModal from '../components/Modal';
import ProfileModal from '../components/Modal';
import AddItem from './AddItem';

const Profile = () => {
  const { user } = useUserAuth();
  const [email, setEmail] = useState(user?.email);
  const [fname, setFName] = useState("First");
  const [lname, setLName] = useState("Last");
  const [pfp, setPfp] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("00000");
  const [phone, setPhone] = useState("###-###-####");
  const [gender, setGender] = useState("M/F");
  const [size, setSize] = useState("#");
  const [card, setCard] = useState("##/## **##");
  const [transactions, setTransactions] = useState([]);
  const [selling, setSelling] = useState([]);
  const [error, setError] = useState("");
  const [isAddItemModalOpen, setAddItemModalOpen] = useState(false);
  const [isStoreModalOpen, setStoreModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [mm, setMM] = useState("");
  const [yy, setYY] = useState("");
  const [cardnumber, setCardNumber] = useState("");
  const fileInputRef = useRef();

  const openFileExplorer = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const storage = getStorage()
    const storageRef = ref(storage, `Account/${file.name}`);
    const metadata = { contentType: file.type };
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.error(error);
        setError("Error uploading file: " + error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setPfp(downloadURL);
        });
      }
    );
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_CLOUD_API_URL2}/profile/update_profile`,
        {
          first_name: fname,
          last_name: lname,
          address: address,
          city: city,
          state: state,
          zipcode: zipcode,
          phone: phone,
          gender: gender,
          size: size,
          pfp: pfp,
          card: card,
        },
        {
          headers: {
            Authorization: `${email}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Profile Updated:", response.data);
    } catch (error) {
      setError("Error updating profile. Please try again.");
      console.error(error);
    }
  };

  const updateCardData = async (e) => {
    e.preventDefault();

    let lastfour = cardnumber.slice(-4);
    let cardformat = mm + "/" + yy + " *" + lastfour;
    console.log("card", cardformat);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_CLOUD_API_URL2}/profile/update_profile`,
        {
          card: cardformat
        },
        {
          headers: {
            Authorization: `${email}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Payment Updated:", response.data);
    } catch (error) {
      setError("Error updating card. Please try again.");
      console.error(error);
    }
  };

  const getProfileData = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_CLOUD_API_URL2}/document_retrieval/fetch_document`,
        {
          collection: "Users",
          document_id: user.email,
        },
        {
          headers: {
            Authorization: `${user.email}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Profile Data:", response.data);
      const data = response.data.data;
      setEmail(data?.email || '');
      setFName(data?.first_name || '');
      setLName(data?.last_name || '');
      setPfp(data?.pfp || '');
      setAddress(data?.address || '');
      setCity(data?.city || '');
      setState(data?.state || '');
      setZipcode(data?.zipcode || '');
      setPhone(data?.phone || '');
      setGender(data?.gender || '');
      setSize(data?.size || '');
      setCard(data?.card || '');
      setTransactions(data?.transactions || []);
      setSelling(data?.store || []);
      console.log("Account Data Loaded", data?.first_name);
    } catch (error) {
      setError("Error getting profile data. Please try again.");
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      getProfileData();
    }
  }, [user]);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${wallpaper})` }}>
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-4 gap-6 w-11/12 md:w-3/4 lg:w-3/4 xl:w-3/4 h-auto md:h-3/4">
          <div className="col-span-1 md:col-span-1 row-span-4 bg-opacity-95 bg-gray-200 p-5 md:p-20 rounded-lg shadow-2xl">
            <div className='flex flex-col items-center'>
              <div className="relative w-1/2 h-1/2 rounded-full overflow-hidden">
                <img src={pfp} className="object-cover" />
              </div>
              <div className='font-semibold text-2xl pt-5 pb-5'>
                {fname} {lname}
              </div>
              <div className='relative text-md pt-5 w-full'>
                <div className='relative mb-6 h-6'>
                  <div className='absolute left-0 flex items-center space-x-2'>
                    <img width='20px' src={mailimg} />
                    <span className='text-lg'>Email:</span>
                  </div>
                  <span className='absolute right-0 text-lg'>{email}</span>
                </div>
                <div className='relative mb-6 h-6'>
                  <div className='absolute left-0 flex items-center space-x-2'>
                    <img width='20px' src={homeimg} />
                    <span className='text-lg'>Address:</span>
                  </div>
                  <span className='absolute right-0 text-lg'>{address} {city} {state} {zipcode}</span>
                </div>
                <div className='relative mb-6 h-6'>
                  <div className='absolute left-0 flex items-center space-x-2'>
                    <img width='20px' src={phoneimg} />
                    <span className='text-lg'>Phone Number:</span>
                  </div>
                  <span className='absolute right-0 text-lg'>{phone}</span>
                </div>
                <div className='relative mb-6 h-6'>
                  <div className='absolute left-0 flex items-center space-x-2'>
                    <img width='20px' src={sizeimg} />
                    <span className='text-lg'>Size:</span>
                  </div>
                  <span className='absolute right-0 text-lg'>{size} {gender}</span>
                </div>
                <div className='relative mb-6 h-6'>
                  <div className='absolute left-0 flex items-center space-x-2'>
                    <img width='20px' src={cardimgg} />
                    <span className='text-lg'>Card:</span>
                  </div>
                  <span className='absolute right-0 text-lg'>{card}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2 md:col-span-2 row-span-1 bg-opacity-95 bg-gray-200 p-8 rounded-lg shadow-xl flex justify-around">
            <button onClick={() => setAddItemModalOpen(true)}><img width="100px" height="30px" src={additem} /></button>
            <button onClick={() => setStoreModalOpen(true)}><img width="100px" height="30px" src={store} /></button>
            <button onClick={() => setProfileModalOpen(true)}><img width="100px" height="30px" src={cog} /></button>
          </div>

          <div className="col-span-2 md:col-span-2 row-span-3 bg-opacity-95 bg-gray-200 p-8 rounded-lg shadow-xl">
            <details className="mb-2">
              <summary className="bg-gray-200 p-4 rounded-lg cursor-pointer shadow-md mb-4">
                <span className="font-semibold">Transaction History</span>
              </summary>
              <ul className="ml-8 space-y-4">
                {transactions.length === 0 ? (
                  <p>No transactions found</p>
                ) : (
                  transactions.map((transaction, index) => (
                    <li key={index} className="mb-2">
                      <details className="mb-2">
                        <summary className="bg-gray-100 p-3 rounded-lg cursor-pointer shadow">
                          <span className="font-semibold">{transaction.shoe_name}</span>
                        </summary>
                        <div className="bg-white p-4">
                          <p><strong>Name:</strong> {transaction.shoe_name}</p>
                          <p><strong>Price:</strong> ${parseFloat(transaction.shoe_price).toFixed(2)}</p>
                          <p><strong>Description:</strong> {transaction.shoe_description}</p>
                          <p><strong>Type:</strong> {transaction.type}</p>
                          <p><strong>Color:</strong> {transaction.shoe_color}</p>
                          <p><strong>Company:</strong> {transaction.shoe_company}</p>
                          <img src={transaction.shoe_img} alt={transaction.shoe_name} className="w-16 h-16 object-cover" />
                        </div>
                      </details>
                    </li>
                  ))
                )}
              </ul>
            </details>

            <details className="mb-2">
              <summary className="bg-gray-200 p-4 rounded-lg cursor-pointer shadow-md mb-4">
                <span className="font-semibold">Selling</span>
              </summary>
              <ul className="ml-8 space-y-4">
                {selling.length === 0 ? (
                  <p>No items found</p>
                ) : (
                  selling.map((item, index) => (
                    <li key={index} className="mb-2">
                      <details className="mb-2">
                        <summary className="bg-gray-100 p-3 rounded-lg cursor-pointer shadow">
                          <span className="font-semibold">{item.shoe_name}</span>
                        </summary>
                        <div className="bg-white p-4">
                          <p><strong>Name:</strong> {item.shoe_name}</p>
                          <p><strong>Price:</strong> ${parseFloat(item.shoe_price).toFixed(2)}</p>
                          <p><strong>Description:</strong> {item.shoe_description}</p>
                          <p><strong>Type:</strong> {item.type}</p>
                          <p><strong>Color:</strong> {item.shoe_color}</p>
                          <p><strong>Company:</strong> {item.shoe_company}</p>
                          <img src={item.shoe_img} alt={item.shoe_name} className="w-16 h-16 object-cover" />
                        </div>
                      </details>
                    </li>
                  ))
                )}
              </ul>
            </details>
          </div>
        </div>
      </div>

      <AddItemModal isOpen={isAddItemModalOpen} onClose={() => setAddItemModalOpen(false)}>
        <AddItem />
      </AddItemModal>

      <StoreModal isOpen={isStoreModalOpen} onClose={() => setStoreModalOpen(false)}>
        <h1 className="text-lg font-bold">Store Settings</h1>
        <p>This is the Store modal</p>
      </StoreModal>

      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setProfileModalOpen(false)}>
        <h1 className="text-2xl font-bold mb-8 text-center">Account Settings</h1>
        <form onSubmit={updateProfile}>
          <div className='flex z-0 w-full mb-5 justify-start'>
            <img width="80px" className="rounded-full" src={pfp || defaultpfp} alt="Profile" />
            <span onClick={openFileExplorer} className='ml-5 my-auto'><img width='30px' src={edit} /></span>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
          </div>
          <div className="flex flex-row space-x-4">
            <div className='z-0 w-full mb-5'>
              <input type="text"
                placeholder="First Name"
                value={fname}
                onChange={(e) => setFName(e.target.value)}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
            <div className='z-0 w-full mb-5'>
              <input type="text"
                placeholder="Last Name"
                value={lname}
                onChange={(e) => setLName(e.target.value)}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
          </div>
          <div className='z-0 w-full mb-5'>
            <input type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
            />
          </div>
          <div className="flex flex-row space-x-4">
            <div className='z-0 w-full mb-5'>
              <input type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
            <div className='z-0 w-full mb-5'>
              <input type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
            <div className='z-0 w-full mb-5'>
              <input type="text"
                placeholder="Zip Code"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
          </div>
          <div className="flex flex-row space-x-4">
            <div className='z-0 w-full mb-5'>
              <input type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
            <fieldset className="relative z-0 w-full p-px mb-5">
              <div className="block pt-3 pb-2 space-x-4">
                <label><input type="radio" value="M" name="gender" className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black" onClick={(e) => { setGender(e.target.value) }} />M</label>
                <label><input type="radio" value="F" name="gender" className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black" onClick={(e) => { setGender(e.target.value) }} />F</label>
              </div>
            </fieldset>
            <div className='z-0 w-full mb-5 flex'>
              <select onChange={(e) => { setSize(e.target.value) }} className="w-full">
                <option value={size} disabled hidden>Choose your size</option>
                {Array.from({ length: 21 }, (_, i) => 5 + 0.5 * i).map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full mt-4">
            <button className="h-auto hover:bg-green-700 lg:h-12 text-xs py-1 lg:py-2 px-2 lg-px-4 text-white font-light tracking-wider bg-gray-900 rounded-lg uppercase w-full focus:outline-none focus:shadow-outline" type="submit">Update Settings</button>
          </div>
        </form>
        <hr className="w-48 mx-auto h-1 mt-7 bg-gray-200 border-0 dark:bg-gray-700" />
        <form onSubmit={updateCardData} className='mt-3'>
          <div className="text-gray-900 font-medium text-xs text-center flex flex-col items-center justify-center">
            <p className="mx-2 my-3 text-lg">
              Saved Payment
            </p>
          </div>
          <div className="py-2">
            <div className="rounded py-2">
              <div className="rounded-t-lg text-xs text-gray-800 w-full flex items-center justify-between border-b border-gray-300">
                <span className="block ml-2 font-semibold">Debit / Credit card</span>
                <div className="flex">
                  <img className="h-10 w-10 object-contain mr-2" src="https://upload.wikimedia.org/wikipedia/commons/1/16/Former_Visa_%28company%29_logo.svg" alt="Visa" />
                </div>
              </div>
              <div className="mb-1 p-2">
                <input name="name" type="text" placeholder="Card Holder Name" className="w-full px-2 py-1 lg:px-4 lg:py-2 text-gray-700 bg-gray-100 text-xs lg:text-sm border border-gray-300 rounded-lg focus:outline-none focus:bg-white" />
              </div>
              <div className="w-full">
                <div className="flex my-1 p-2">
                  <input type="text" value={cardnumber} onChange={(e) => setCardNumber(e.target.value)} required minLength="16" maxLength="16" className="w-5/6 border-t border-b border-l border-gray-300 flex-1 text-xs lg:text-sm py-1 lg:py-2 px-2 lg:px-4 bg-gray-100 text-gray-700 rounded-l-lg focus:bg-white focus:outline-none" placeholder="Card Number" />
                  <input type="text" value={mm} onChange={(e) => setMM(e.target.value)} required maxLength="2" className="w-1/6 border-t border-b border-gray-300 inline-block text-xs lg:text-sm py-1 lg:py-2 px-2 lg:px-4 bg-gray-100 text-gray-700 focus:bg-white focus:outline-none" placeholder="MM" />
                  <input type="text" value={yy} onChange={(e) => setYY(e.target.value)} required maxLength="2" className="w-1/6 border-t border-b border-gray-300 inline-block text-xs lg:text-sm py-1 lg:py-2 px-2 lg:px-4 bg-gray-100 text-gray-700 focus:bg-white focus:outline-none" placeholder="YY" />
                  <input type="text" required maxLength="3" className="w-1/6 border-t border-b border-r border-gray-300 inline-block text-xs lg:text-sm py-1 lg:py-2 px-2 lg:px-4 bg-gray-100 text-gray-700 focus:bg-white rounded-r-lg focus:outline-none" placeholder="CVC" />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full">
                <button className="hover:bg-green-700 h-auto lg:h-12 text-xs py-1 lg:py-2 px-2 lg-px-4 text-white font-light tracking-wider bg-gray-900 rounded-lg uppercase w-full focus:outline-none focus:shadow-outline" type="submit">Update Card</button>
              </div>
            </div>
          </div>
        </form>
      </ProfileModal>
    </>
  );
};

export default Profile;