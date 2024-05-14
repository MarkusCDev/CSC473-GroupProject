import React, {useState,useEffect,useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from '../components/UserAuthentication'
import profile from '../assets/profile.png'
import axios from "axios"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

import additem from '../assets/add.png'
import store from '../assets/store.png'
import cardimg from '../assets/card.png'
import cog from '../assets/cog.png'
import pic from '../assets/photo.png'
import shoe from '../assets/shoe.png'

import wallpaper from '../assets/wallpaper.jpg'

import AddItemModal from '../components/Modal'
import StoreModal from '../components/Modal'
import ProfileModal from '../components/Modal'

const Profile = () => {

  const { user } = useUserAuth()
  const [email, setEmail] = useState(user.email)
  // https://www.denofgeek.com/wp-content/uploads/2021/07/WebStory-The-Patrick-Star-Show-Patrick.jpeg
  const [fname, setFName] = useState("")
  const [lname, setLName] = useState("")
  const [pfp, setPfp] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zipcode,setZipcode] = useState("")
  const [phone, setPhone] = useState("")
  const [gender, setGender] = useState("")
  const [size, setSize] = useState("")
  const [card, setCard] = useState("")

  const [error, setError] = useState("")
  let navigate = useNavigate()
  const storage = getStorage()


  const [isAddItemModalOpen, setAddItemModalOpen] = useState(false)
  const [isStoreModalOpen, setStoreModalOpen] = useState(false)
  const [isProfileModalOpen, setProfileModalOpen] = useState(false)

  const updateProfile= async (e) => {
    e.preventDefault()

    
    try {
      // Make an API call to create user profile
      const response = await axios.post(
        `${import.meta.env.VITE_APP_CLOUD_API_URL}/profile/update_profile`,
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
        },
        {
          headers: {
            Authorization: `${email}`,
            "Content-Type": "application/json",
          },
        }
      )

      console.log("Profile Updated:", response.data)
    } catch (error) {
      setError("Error creating profile. Please try again.")
      console.error(error)
    }
  }

  const getProfileData = async () => {
    
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_CLOUD_API_URL}/profile/get_profile`, {
          headers: {
            Authorization: `${user.email}`,
            "Content-Type": "application/json",
          },
        }
      )
  
      
      console.log("Profile Data:", response.data)
        setEmail(response.data.email || '')
        setFName(response.data.first_name || '')
        setLName(response.data.last_name || '')
        setPfp(response.data.pfp || '')  // Make sure the key matches what the backend sends
        setAddress(response.data.address || '')
        setCity(response.data.city || '')
        setState(response.data.state || '')
        setZipcode(response.data.zipcode || '')  // Make sure the key matches what the backend sends
        setPhone(response.data.phone || '')
        setGender(response.data.gender || '')
        setSize(response.data.size || '')
        setCard(response.data.card || '')  // Assuming this exis
      console.log("Account Data Loaded", response.data.first_name)

    } catch (error) {
      setError("Error getting profile data. Please try again.")
      console.error(error)
    }

  }
  

  useEffect(() => {
    getProfileData()
  }, [user])
  
  const fileInputRef = useRef()

  // Function to simulate click on file input
  const openFileExplorer = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (!file) return

    // Create a storage reference from our storage service
    const storageRef = ref(storage, `Account/${file.name}`)
    const metadata = { contentType: file.type }
    const uploadTask = uploadBytesResumable(storageRef, file, metadata)

    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error(error)
        setError("Error uploading file: " + error.message)
      }, 
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL)
          setPfp(downloadURL)  // Set profile picture URL
        })
      }
    )
  }


   
  
  return (

  <>    
  <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat" 
    style={{ backgroundImage: `url(${wallpaper})` }}>
    <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-4 gap-6 w-11/12 md:w-3/4 lg:w-3/4 xl:w-3/4 h-auto md:h-3/4">
      {/* Left Grid */}
      <div className="col-span-1 md:col-span-1 row-span-4 bg-gray-200 p-5 md:p-20 rounded-lg shadow-2xl">
        <div className='flex flex-col items-center'>
          {/* profile pic */}
          <div className="w-1/2 h-1/2 rounded-full overflow-hidden">
            <img src={pfp} className="object-cover"/>
          </div>
          {/* account info */}
          <div className='font-semibold text-2xl pt-5 pb-5'>
            {fname} {lname}
          </div>

        {/* Align headers on the left and content in the middle */}
          <div className='text-md pt-5 space-y-3 w-full'>
            <div className='flex justify-between'>
              <span className='text-lg'>Email:</span>
              <span>{email}</span>
            </div>

            <div className='flex justify-between'>
              <span className='text-sm'>Address:</span>
              <span>{address} {city} {state} {zipcode}</span>
            </div>

            <div className='flex justify-between'>
              <span className='text-sm'>Phone Number:</span>
              <span>{phone}</span>
            </div>

            <div className='flex justify-between'>
              <span className='text-sm'>Size:</span>
              <span>{size} {gender}</span>
            </div>

            <div className='flex justify-between'>
              <span className='text-sm'>Saved Payment:</span>
              <span>{card}</span>
            </div>
        </div>
      </div>
    </div>

    <div className="col-span-2 md:col-span-2 row-span-1 bg-gray-200 p-8 rounded-lg shadow-xl flex justify-around">
      <button onClick={() => setAddItemModalOpen(true)}><img width="100px" height="30px" src={additem}/></button>
      <button onClick={() => setStoreModalOpen(true)}><img width="100px" height="30px" src={store}/></button>
      <button onClick={() => setProfileModalOpen(true)}><img width="100px" height="30px" src={cog}/></button>
    </div>

    {/* Right Grid Top */}
    <div className="col-span-2 md:col-span-2 row-span-3 bg-gray-200 p-8 rounded-lg shadow-xl">
      {/* Content here */}
    </div>

    {/* Bottom Buttons Grid */}
    

  </div>
</div>

  <AddItemModal isOpen={isAddItemModalOpen} onClose={() => setAddItemModalOpen(false)}>
        <h1 className="text-lg font-bold">Add Item</h1>
        <p>This is the the Add Item modal</p>
      </AddItemModal>

  <StoreModal isOpen={isStoreModalOpen} onClose={() => setStoreModalOpen(false)}>
        <h1 className="text-lg font-bold">Store Settings</h1>
        <p>This is the Store modal</p>
  </StoreModal>

  
  <ProfileModal isOpen={isProfileModalOpen} onClose={() => setProfileModalOpen(false)}>      
    <h1 className="text-2xl font-bold mb-8 text-center">Account Settings</h1>
    <form onSubmit={updateProfile}>
      {/* Line 1 */}
      <div className='flex z-0 w-full mb-5 justify-start'>
        <img width="80px" className="rounded-full" src={pfp || profile} alt="Profile"/>
        <span onClick={openFileExplorer} className='ml-5 my-auto'>Change Image</span>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }} 
        />
        </div>

        {/* Line 2 */}
        <div className="flex flex-row space-x-4">
          {/* First Name */}
          <div className='z-0 w-full mb-5'>
            <input type="text" 
                  placeholder="First Name"
                  value={fname}
                  onChange={(e) => setFName(e.target.value)}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                  />
          </div>
          {/* Last Name */}
          <div className='z-0 w-full mb-5'>
            <input type="text" 
                  placeholder="Last Name"
                  value={lname}
                  onChange={(e) => setLName(e.target.value)}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                  />
          </div>
        </div>

        {/* Line 3
        Address */}
        <div className='z-0 w-full mb-5'>
            <input type="text" 
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                  />
        </div>

        {/* Line 4 */}
        <div className="flex flex-row space-x-4">
          {/* City */}
          <div className='z-0 w-full mb-5'>
            <input type="text" 
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                  />
          </div>
          {/* State */}
          <div className='z-0 w-full mb-5'>
            <input type="text" 
                  placeholder="State"
                  valuse={state}
                  onChange={(e) => setState(e.target.value)}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                  />
          </div>
          {/* ZipCode */}
          <div className='z-0 w-full mb-5'>
            <input type="text" 
                  placeholder="Zip Code"
                  valuse={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                  />
          </div>
        </div>

        {/* Line 5 */}
        <div className="flex flex-row space-x-4">
          {/* Phone # */}
          <div className='z-0 w-full mb-5'>
            <input type="text" 
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                  />
          </div>
          {/* Gender */}
          <fieldset className="relative z-0 w-full p-px mb-5">
            <div className="block pt-3 pb-2 space-x-4">
              <label><input type="radio" value="M" name="gender" className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black" onClick={(e)=> { setGender(e.target.value)}}/>M</label>
              <label><input type="radio" value="F" name="gender" className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black" onClick={(e)=> { setGender(e.target.value)}}/>F</label>
            </div>
          </fieldset>

          {/* Size */}
          <div className='z-0 w-full mb-5 flex'>
            <select onChange={(e)=> { setSize(e.target.value)}} className="w-full">
              <option value={size} disabled hidden>Choose your size</option>
              {Array.from({ length: 21 }, (_, i) => 5 + 0.5 * i).map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        </div>

        
        

        {/* Update Settings Button */}
        <div className="w-full mt-4">
          <button className="h-auto hover:bg-green-700 lg:h-12 text-xs py-1 lg:py-2 px-2 lg-px-4 text-white font-light tracking-wider bg-gray-900 rounded-lg uppercase w-full focus:outline-none focus:shadow-outline" type="submit">Update Settings</button>
        </div>

      </form>

  
    <hr className="w-48 mx-auto h-1 mt-7 bg-gray-200 border-0 dark:bg-gray-700"/>
    
    <form className='mt-3'>

      

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
                        <img className="h-10 w-10 object-contain mr-2" src="https://upload.wikimedia.org/wikipedia/commons/1/16/Former_Visa_%28company%29_logo.svg" alt="Visa"/>
                    </div>
                </div>

                <div className="mb-1 p-2">
                    <input id="name" name="name" type="text" placeholder="Card Holder Name" required className="w-full px-2 py-1 lg:px-4 lg:py-2 text-gray-700 bg-gray-100 text-xs lg:text-sm border border-gray-300 rounded-lg focus:outline-none focus:bg-white"/>
                </div>

                <div className="w-full">
                    <div className="flex my-1 p-2">
                        <input type="text" id="card" required maxLength="16" className="w-5/6 border-t border-b border-l border-gray-300 flex-1 text-xs lg:text-sm py-1 lg:py-2 px-2 lg:px-4 bg-gray-100 text-gray-700 rounded-l-lg focus:bg-white focus:outline-none" placeholder="Card Number"/>
                        <input type="text" id="month" required maxLength="2" className="w-1/6 border-t border-b border-gray-300 inline-block text-xs lg:text-sm py-1 lg:py-2 px-2 lg:px-4 bg-gray-100 text-gray-700 focus:bg-white focus:outline-none" placeholder="MM"/>
                        <input type="text" id="year" required maxLength="2" className="w-1/6 border-t border-b border-gray-300 inline-block text-xs lg:text-sm py-1 lg:py-2 px-2 lg:px-4 bg-gray-100 text-gray-700 focus:bg-white focus:outline-none" placeholder="YY"/>
                        <input type="text" id="cvc" required maxLength="3" className="w-1/6 border-t border-b border-r border-gray-300 inline-block text-xs lg:text-sm py-1 lg:py-2 px-2 lg:px-4 bg-gray-100 text-gray-700 focus:bg-white rounded-r-lg focus:outline-none" placeholder="CVC"/>
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
  )
}

export default Profile

