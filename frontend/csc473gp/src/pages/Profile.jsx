import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from '../components/UserAuthentication'
import profile from '../assets/profile.png'
import axios from "axios"

const Profile = () => {

  const { user } = useUserAuth()

  const [email, setEmail] = useState(user?.email)
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")
  const [fname, setFName] = useState("")
  const [lname, setLName] = useState("")
  const [error, setError] = useState("")
  let navigate = useNavigate()

  const handleData= async (e) => {
    e.preventDefault()

    try {
      // Make an API call to create user profile
      const response = await axios.post(
        `${import.meta.env.VITE_APP_CLOUD_API_URL}/profile/update_profile`,
        {
          first_name: fname,
          last_name: lname,
          address: address
        },
        {
          headers: {
            Authorization: `${email}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Profile Updated:", response.data);
      // You can handle success or navigate the user to another page here

      navigate("/");
    } catch (error) {
      setError("Error creating profile. Please try again.");
      console.error(error);
    }

  }

  return (
    <div className='flex min-h-screen bg-gradient-to-b from-stone-300 to-stone-500 items-center justify-center px-4 mt-2 sm:px-6 lg:px-8'>
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl m-auto bg-white rounded-lg p-5">
          
          <p className='text-center font-bold text-xl mb-3'><h1>Profile</h1></p>
          <img className="w-20 h-20 mx-auto mb-5 rounded-full w-10" src={profile} alt="Profile Pic" />
          <div className='text-center'>{user?.email}</div>

          <form onSubmit={handleData}>
          <div>
            <label className="block mb-2" htmlFor="username">
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              value={fname}
              onChange={(e) => setFName(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2" htmlFor="username">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              value={lname}
              onChange={(e) => setLName(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2" htmlFor="username">
              Address
            </label>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>



            <button type="submit" className='w-full bg-blue-700 hover:bg-green-700 text-white font-bold py-2 px-4 mb-6 rounded transition-colors duration-300'>Update Profile</button>

          </form>



      </div>
    </div>
  )
}

export default Profile