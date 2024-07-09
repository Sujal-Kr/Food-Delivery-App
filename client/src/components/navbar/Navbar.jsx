import React, { useContext, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { assets } from '../../assets/frontend_assets/assets';
import './Navbar.css';
import { StoreContext } from '../../Context/store.context';
import { toast } from 'react-toastify';
import axios from 'axios';


const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const { url,token, setToken } = useContext(StoreContext);
  const [option,setOption] = useState(false)
  const navigate=useNavigate()
  const logout=async()=>{
    try{
      const res=await axios.get(`${url}/api/user/logout`)
      if(res.data.success){
        localStorage.setItem('token','')
        setToken()
        navigate('/')
        
      }else{
        toast.error(res.data.message)
      }
    }catch(err){
      toast.error(err.message)
    }
  }

  return (
    <nav className='flex justify-between py-6 items-center'>
      <div className="nav-head">
        <img src={assets.logo} alt="" />
      </div>
      <div className="nav-list gap-5 hidden md:flex">
        <Link to='/' onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>Home</Link>
        <Link to='/menu' onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>Menu</Link>
        <Link to='/mobile-app' onClick={() => setMenu('app')} className={menu === 'app' ? 'active' : ''}>Mobile App</Link>
        <Link to='/contact-us' onClick={() => setMenu('contact')} className={menu === 'contact' ? 'active' : ''}>Contact Us</Link>
      </div>
      <div className="nav-tools flex gap-8 items-center">
        <img src={assets.search_icon} alt="" />
        <div className="cart-icon relative">
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className='dot absolute right-0 top-[-10%] h-2 w-2 bg-orange-500 rounded-full'></div>
        </div>
        {
          !token ?
            <div>
              <button 
                onClick={() => setShowLogin(true)} 
                className='px-4 py-2 border-2 border-orange-300 rounded-3xl hover:text-white hover:bg-orange-300'
              >
                Sign In
              </button>
            </div> :
            <div className='relative  text-xs ' onClick={()=>setOption(!option)}>
              <img src={assets.profile_icon} alt="" className='cursor-pointer' />
              <ul className={`absolute right-0 mt-2 z-10 bg-white flex-col border rounded-md shadow-lg w-40 ${option ? 'flex' : 'hidden'}`}>

                <li className='flex items-center p-2 hover:bg-gray-100'>
                  <img src={assets.bag_icon} alt="" className='mr-2' />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout} className='flex items-center p-2 hover:bg-gray-100'>
                  <img src={assets.logout_icon} alt="" className='mr-2' />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
        }
      </div>
    </nav>
  );
};

export default Navbar;
