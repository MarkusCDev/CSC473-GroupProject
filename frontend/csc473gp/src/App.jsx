import React from 'react'

// Libraries
import {Route, Routes} from 'react-router-dom'

// Controller Components
import { UserAuthContextProvider } from './components/UserAuthentication'
import ProtectedRoute from './components/ProtectedRoute'

// UI Components
import Navbar from './components/Navbar'

// Pages
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import AddItem from './pages/AddItem'


const App = () => {
  return (
    <UserAuthContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>

        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path="/add-item" element={<ProtectedRoute><AddItem/></ProtectedRoute>}/>
      </Routes>
    </UserAuthContextProvider>
  )
}

export default App