import React from 'react'
import { assets } from '../../assets/admin_assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <aside className=' w-full max-w-[18%] border-r-2 min-h-screen'>
        <div className='sidebar-option pl-[20%] pt-12 flex flex-col gap-5 text-sm'>
            <NavLink to='/add' className='flex items-center justify-center md:justify-start gap-2 border-y-2 border-l-2 p-2    '>
                <img src={assets.add_icon}/>
                <p className='hidden md:block'>Add Items</p>
            </NavLink>
            <NavLink to='/list' className='flex items-center justify-center md:justify-start gap-2 border-y-2 border-l-2 p-2 '>
                <img src={assets.order_icon}/>
                <p className='hidden md:block'>List Items</p>
            </NavLink>
            <NavLink to='/order' className='flex items-center justify-center md:justify-start gap-2 border-y-2 border-l-2 p-2 '>
                <img src={assets.order_icon}/>
                <p className='hidden md:block'>Order Items</p>
            </NavLink>
        </div>
    </aside>
  )
}

export default Sidebar
