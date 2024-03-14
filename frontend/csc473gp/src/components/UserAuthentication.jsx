import React, { useState, useContext, useEffect, createContext } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth"
import { auth } from "../firebase"

{/* User Authentication handles firebase login, signup, logout, and identification if User is valid */}

const userAuthContext = createContext()

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({}) 

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  function logOut() {
    return signOut(auth);
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
    <userAuthContext.Provider value={{ user, logIn, signUp, logOut }}> 
      {children}
    </userAuthContext.Provider>
  )
}

export function useUserAuth() {
  return useContext(userAuthContext)
}