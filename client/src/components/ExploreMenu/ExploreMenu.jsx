import React from 'react'
import { menu_list } from '../../assets/frontend_assets/assets'
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div id="menu" className="explore-menu flex flex-col gap-5">
    <h1 className="text-4xl">Explore our menu</h1>
    <p className="max-w-xl">
      Choose from a diverse menu featuring an array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your craving and elevate your dining experience, one delicious meal at a time.
    </p>
    <div className="flex py-4 gap-4 justify-between overflow-auto">
      {
        menu_list.map((item, index) => (
          <div 
            key={index} 
            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} 
            className="flex-shrink-0 flex flex-col items-center justify-end gap-3 "
          >
            <img 
              src={item.menu_image} 
              alt={item.menu_name} 
              className={`
                ${category === item.menu_name ? 'border-orange-600' : 'border-white'}
                rounded-full border-4 w-24 h-24 object-cover transition-all duration-300
              `}
            />
            <p className="text-slate-500 text-xs text-center">{item.menu_name}</p>
          </div>
        ))
      }
    </div>
  </div>
  

  )
}

export default ExploreMenu
