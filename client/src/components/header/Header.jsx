import React from 'react'
import './Header.css'
const Header = () => {
  return (
    <div className='header min-h-[34vw] rounded-3xl flex items-center px-5 md:px-20 py-10 my-10 '>
      <div className='flex flex-col  gap-4 md:gap-10 items-start justify-end header-content ' >
        <h2 className='text-3xl md:text-6xl text-white md:max-w-xl'>Order your favourite food here</h2>
        <p className='max-w-xl text-sm text-slate-100'>Choose from diverse menu featuring  array of dishes crafted  with finest ingridents and culinary epxpertise.Our mission is to satisfy your craving and elevate your dining experince ,one delicious meal at a time </p>
        <button className='px-4 py-3 grow-0 w-fit text-slate-400  bg-white rounded-3xl'>View Menu</button>
      </div>
    </div>
  )
}

export default Header
