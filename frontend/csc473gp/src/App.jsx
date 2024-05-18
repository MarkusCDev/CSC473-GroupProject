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
import Buying from './pages/Buying';
import ShoePage from './pages/ShoePage';
import ShoeDetailPage from './pages/ShoeDetailPage'
import Trading from './pages/Trading'
import CreateBuying from './pages/CreateBuying'
import CreateTrading from './pages/CreateTrading'

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


        <Route path="/Buying" element={<Buying/>}/>
        <Route path="/Trading" element={<Trading/>}/>
        <Route path="/CreateBuying" element={<CreateBuying/>}/>
        <Route path="/CreateTrading" element={<CreateTrading/>}/>

        
        <Route path="/sneakers/:shoeId" element={<ShoePage/>}/>
        <Route path="/shoe/:id" element={<ShoeDetailPage />} />
      </Routes>
    </UserAuthContextProvider>
  )
}

export default App