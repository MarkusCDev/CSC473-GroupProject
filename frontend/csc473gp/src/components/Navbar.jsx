import React, { useState } from 'react'
import '../global.css'
import { Link } from 'react-router-dom'
import { useUserAuth } from './UserAuthentication'
import menu from '../assets/menu.png'
import logo from '../assets/logo.png'
import cart from '../assets/cart.png'
import profile from '../assets/profile.png'
import store from '../assets/store.png'
import bell from '../assets/bell.png'
import CartModal from '../components/Cart'


const Navbar = () => {
  const { user, logOut } = useUserAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartModalOpen, setCartModalOpen] = useState(false)
  const [isNotificationDropdownOpen, setNotificationDropdownOpen] = useState(false)

  const handleLogOut = async () => {
    try {
      await logOut();
      console.log(user?.email, 'Successfully logged out!');
    } catch (e) {
      console.log('Could not log out: ', e);
    }
  };

  return (
    <>
    <CartModal isOpen={isCartModalOpen} onClose={() => setCartModalOpen(false)}/>

    <nav className="">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <img src={logo} className="h-10 mr-3" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            SoleSphere
          </span>
        </Link>
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-solid-bg"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <img src={menu} />
        </button>
        <div className={`${isMenuOpen ? '' : 'hidden'} w-full md:block md:w-auto`} id="navbar-solid-bg">
          <ul className="flex flex-col font-medium mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
            {user ? (
              <>
                <li className="relative group">
                  <button id="dropdownDelayButton" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0" type="button">
                    <img width="30px" height="30px" src={bell} />
                  </button>
                  <div id="dropdownDelay" className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ left: '-75px', top: '40px' }}>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
                      <li>
                        <div className='flex justify-between'>
                          <a>Your <b>Jordan 1</b> was Sold!</a>
                          <a className='ml-6'><img width='15px' src={bell}/></a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li><button onClick={() => setCartModalOpen(true)} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover-bg-gray-100 md:hover-bg-transparent md:border-0 md:hover-text-blue-700 md:p-0"><img width="30px" height="30px" src={cart}></img></button></li>
                <li><Link to="/profile" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover-bg-gray-100 md:hover-bg-transparent md:border-0 md:hover-text-blue-700 md:p-0"><img width="30px" height="30px" src={profile}></img></Link></li>
                <li><a className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover-bg-transparent md:border-0 md:hover-text-blue-700 md:p-0"><button onClick={handleLogOut}>LogOut</button></a></li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover-bg-gray-100 md:hover-bg-transparent md:border-0 md:hover-text-blue-700 md:p-0">Login</Link></li>
                <li><Link to="/signup" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover-bg-gray-100 md:hover-bg-transparent md:border-0 md:hover-text-blue-700 md:p-0">SignUp</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar

