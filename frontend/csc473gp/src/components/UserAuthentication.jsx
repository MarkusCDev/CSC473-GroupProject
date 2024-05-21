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

{/* User Authentication handles firebase login, signup, logout, and identification if User is valid */}

const userAuthContext = createContext()

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({}) 
  const [uid, setUid] = useState(null)
  const [email, setEmail] = useState(null)
  const [error, setError] = useState("")

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  function logOut() {
    return signOut(auth)
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
              email: email,
              cart: [],
              transactions: [],
              store: [],
              notifications: [],
              first_name: "",
              last_name: "",
              address: "",
              city: "",
              state: "",
              zipcode: "",
              phone: "",
              gender: "",
              size: "",
              pfp: "",
              card: "",
            },
            {
              headers: {
                Authorization: `${user.email}`,
                "Content-Type": "application/json",
              },
            }
          );
    
          console.log("Profile created:", response.data);
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

  {/* Ensures user stays logged in until logged out (cookies keeps logged in unless logged out) */}
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    })
    return () => {
      unsubscribe()
    }
  }, [])

  {/* Functions & userdata to use when importing UserAuthentication to other components */}
  return (
    <userAuthContext.Provider value={{ user, logIn, signUp, logOut, signInWithGoogle }}> 
      {children}
    </userAuthContext.Provider>
  )
}

export function useUserAuth() {
  return useContext(userAuthContext)
}