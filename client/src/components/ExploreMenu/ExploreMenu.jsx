import React from 'react'
import { menu_list } from '../../assets/frontend_assets/assets'
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu flex flex-col gap-5'>
        <h1 className='text-4xl'>Explore our menu</h1>
        <p className='max-w-xl'>Choose from diverse menu featuring  array of dishes crafted  with finest ingridents and culinary epxpertise.Our mission is to satisfy your craving and elevate your dining experince ,one delicious meal at a time</p>
      <div className='flex justify-between py-4 gap-4 overflow-auto'>
      {
        menu_list.map((item,index) =>(
            <div key={index} onClick={(()=>setCategory((prev)=>prev===item.menu_name?"All":item.menu_name))} className='flex  flex-col items-center justify-center gap-3 '>
                <img src={item.menu_image} alt="" className={category===item.menu_name?'rounded-full border-4 h-full w-full object-cover aspect-square border-orange-600 p-1 transition-all duration-300':"transition-all duration-75 p-1 border-4 border-white"}/>
                <p className='text-slate-500 text-xs'>{item.menu_name}</p>
            </div>
        ))
      }
      </div>
    </div>
  )
}

export default ExploreMenu
