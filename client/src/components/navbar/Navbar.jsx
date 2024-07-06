import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/frontend_assets/assets'
import './Navbar.css'

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home')
  return (
    <nav className='flex justify-between py-6  items-center'>
      <div className="nav-head">
        <img src={assets.logo} alt="" />
      </div>
      <div className="nav-list  gap-5 hidden md:flex">
        <Link to='/' onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>Home</Link>
        <Link to='/menu' onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>Menu</Link>
        <Link to='/mobile-app' onClick={() => setMenu('app')} className={menu === 'app' ? 'active' : ''}>Mobile App</Link>
        <Link to='/contact-us' onClick={() => setMenu('contact')} className={menu === 'contact' ? 'active' : ''}>Contact Us</Link>
      </div>
      <div className="nav-tools flex gap-8 items-center ">
        <img src={assets.search_icon} alt="" />
        <div className="cart-icon relative">
          <Link to='/cart'>

            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className='dot absolute right-0 top-[-10%] h-2 w-2 bg-orange-500 rounded-full'></div>
        </div>
        <div><button onClick={() => setShowLogin(true)} className='px-4 py-2 border-2 border-orange-300 rounded-3xl hover:text-white hover:bg-orange-300  '>Sign In</button></div>
      </div>
    </nav>
  )
}

export default Navbar
