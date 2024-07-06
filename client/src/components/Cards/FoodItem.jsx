import { useEffect } from 'react'
import React from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../Context/store.context';

const FoodItem = ({ food }) => {
    const { cartItems, addToCart, removeFromCart } = React.useContext(StoreContext)
    
    return (
        <div className='food-item shadow rounded-t-xl overflow-hidden '>
            <div className='relative'>
                <img src={food.image} alt="" className='' />
                <div className='p-2 absolute right-3 top-36'>
                    {
                        
                        !cartItems[food._id]  ?
                            <img onClick={() => addToCart(food._id)} src={assets.add_icon_white} className='object-cover ' /> :
                            <div className='flex  items-center gap-2 bg-white  p-1 rounded-full    '>
                                <img src={assets.remove_icon_red} onClick={() => removeFromCart(food._id)} alt="" />
                                <p>{cartItems[food._id]}</p>
                                <img src={assets.add_icon_green} onClick={() => addToCart(food._id)} alt="" />
                            </div>
                    }
                </div>
            </div>

            <div className='food-info p-5 '>
                <div className='flex justify-between items-center'>
                    <p className='text-xl'>{food.name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className='text-sm text-slate-400'>{food.description}</p>
                <p className='text-orange-600'>${food.price}</p>
            </div>
        </div>
    )
}

export default FoodItem
