import React, { useState } from 'react'
import '../global.css'
import { Link } from 'react-router-dom'
import { useUserAuth } from './UserAuthentication'
import menu from '../assets/menu.png'
import logo from '../assets/logo.png'

const Navbar = () => {

  const { user, logOut } = useUserAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogOut = async () => {
    try {
      await logOut();
      console.log(user?.email, "Successfully logged out!");
    } catch (e) {
      console.log("Could not log out: ", e);
    }}

  return (
    <nav className="">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <Link to="/about" className="flex items-center">
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
                <li><Link to="/profile"><a className="block py-2 pl-3 pr-4 text-gray-900 rounded hover-bg-gray-100 md:hover-bg-transparent md:border-0 md:hover-text-blue-700 md:p-0">Profile</a></Link></li>
                <li><a className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover-bg-transparent md:border-0 md:hover-text-blue-700 md:p-0"><button onClick={handleLogOut}>LogOut</button></a></li>
              </>
            ) : (
              <>
                <li><Link to="/login"><a className="block py-2 pl-3 pr-4 text-gray-900 rounded hover-bg-gray-100 md:hover-bg-transparent md:border-0 md:hover-text-blue-700 md:p-0">Login</a></Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>

  )
}

export default Navbar