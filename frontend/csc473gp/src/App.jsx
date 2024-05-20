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
import Checkout from './pages/Checkout'
import AddItem from './pages/AddItem'
import Buying from './pages/Buying';

import BuyShoeDetailPage from './pages/BuyShoeDetailPage'
import TradeShoeDetailPage from './pages/TradeShoeDetailPage'

import CreateBuying from './pages/CreateBuying'
import CreateTrading from './pages/CreateTrading'

import Trading from './pages/Trading'
import ShoePage from './pages/ShoePage'
import NotFound from './pages/NotFound'
import ChatAssistant from './components/ChatAssistant'
import Auction from './pages/Auction'

import ProductList from './pages/ProductList'



const App = () => {
  return (
    <UserAuthContextProvider>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<><Landing/><ChatAssistant /></>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/signup" element={<Signup/>}/>

        <Route exact path="/profile" element={<><ProtectedRoute><Profile/></ProtectedRoute><ChatAssistant /></>}/>
        <Route exact path="/add-item" element={<ProtectedRoute><AddItem/></ProtectedRoute>}/>

        <Route path="/checkout" element={<ProtectedRoute><Checkout/></ProtectedRoute>}/>

        <Route exact path="/Auctioning" element={<><Auction/><ChatAssistant /></>}/>
        <Route exact path="/Buying" element={<><Buying/><ChatAssistant /></>}/>
        <Route exact path="/Trading" element={<><Trading/><ChatAssistant /></>}/>
        <Route exact path="/CreateBuying" element={<CreateBuying/>}/>
        <Route exact path="/CreateTrading" element={<CreateTrading/>}/>

        
        <Route exact path="/shoe/:id" element={<><BuyShoeDetailPage /><ChatAssistant /></>} />
        <Route exact path="/trade-shoe/:id" element={<><TradeShoeDetailPage /><ChatAssistant /></>} />

        <Route path="/sneakers/:shoeId" element={<><ShoePage/><ChatAssistant /></>}/>

        


        <Route path="*" element={<NotFound/>}/>

      </Routes>
      
    </UserAuthContextProvider>
  )
}

export default App
