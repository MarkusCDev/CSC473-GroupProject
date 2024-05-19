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
import BuyShoeDetailPage from './pages/BuyShoeDetailPage'
import TradeShoeDetailPage from './pages/TradeShoeDetailPage'
import Trading from './pages/Trading'
import CreateBuying from './pages/CreateBuying'
import CreateTrading from './pages/CreateTrading'

const App = () => {
  return (
    <UserAuthContextProvider>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Landing/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/signup" element={<Signup/>}/>

        <Route exact path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route exact path="/add-item" element={<ProtectedRoute><AddItem/></ProtectedRoute>}/>


        <Route exact path="/Buying" element={<Buying/>}/>
        <Route exact path="/Trading" element={<Trading/>}/>
        <Route exact path="/CreateBuying" element={<CreateBuying/>}/>
        <Route exact path="/CreateTrading" element={<CreateTrading/>}/>

        
        <Route exact path="/shoe/:id" element={<BuyShoeDetailPage />} />
        <Route exact path="/trade-shoe/:id" element={<TradeShoeDetailPage />} />

      </Routes>
    </UserAuthContextProvider>
  )
}

export default App