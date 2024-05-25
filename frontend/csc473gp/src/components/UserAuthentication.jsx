import React, { useState, useContext, useEffect, createContext } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth"
import { auth } from "../firebase"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const userAuthContext = createContext()

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({})
  const [uid, setUid] = useState(null)
  const [email, setEmail] = useState(null)
  const [error, setError] = useState("")
  const navigate = useNavigate() // useNavigate hook

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/') // navigate to root path
        return userCredential
      })
      .catch((error) => {
        console.error("Sign-In Error:", error.message)
        throw error
      })
  }

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/') // navigate to root path
        return userCredential
      })
      .catch((error) => {
        console.error("Sign-Up Error:", error.message)
        throw error
      })
  }

  function logOut() {
    return signOut(auth)
      .then(() => {
        navigate('/') // navigate to root path
      })
      .catch((error) => {
        console.error("Sign-Out Error:", error.message)
        throw error
      })
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
      .then(async (userCredential) => {
        const user = userCredential.user
        setUid(user.uid)
        setEmail(user.email)
        console.log("Google Signing in: ", user.uid, user.email)
        
        try {
          // Make an API call to create user profile
          const response = await axios.post(
            `${import.meta.env.VITE_APP_CLOUD_API_URL}/profile/create_profile`,
            {
              email: user.email,
            },
            {
              headers: {
                Authorization: `${user.email}`,
                "Content-Type": "application/json",
              },
            }
          );
    
          console.log("Profile created:", response.data);
          navigate('/') // navigate to root path
        } catch (error) {
          setError("Error creating profile. Please try again.");
          console.error(error);
        }
        
        return userCredential
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error.message)
        throw error
      })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <userAuthContext.Provider value={{ user, logIn, signUp, logOut, signInWithGoogle }}> 
      {children}
    </userAuthContext.Provider>
  )
}

export function useUserAuth() {
  return useContext(userAuthContext)
}
