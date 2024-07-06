import React from 'react'
import {assets} from '../../assets/admin_assets/assets'
const Navbar = () => {
  return (
    <nav className='navbar flex items-center justify-between px-4 py-2'>
        <img className='w-20' src={assets.logo} alt="" />
        <img className='w-10' src={assets.profile_image} alt="" />

    </nav>
  )
}

export default Navbar
