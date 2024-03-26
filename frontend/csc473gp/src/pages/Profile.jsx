import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useUserAuth } from '../components/UserAuthentication'

const Profile = () => {

  const { user } = useUserAuth()

  const [email, setEmail] = useState(user?.email)
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")

  
  const Retdata = async (e) => {
    
  }


  return (
    <div className='flex flex-column flex-grid bg-gray-200'>
      <div className='flex justify-center text-center'>
          <div>{user?.email}</div>



      </div>
    </div>
  )
}

export default Profile