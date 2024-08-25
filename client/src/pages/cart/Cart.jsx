import React, { useContext } from 'react'
import { StoreContext } from '../../Context/store.context'
import {Link} from 'react-router-dom'

const Cart = () => {
  const { foodList, cartItems, removeFromCart,getCartTotal,url } = useContext(StoreContext)

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className=' border-gray-500 pb-5 grid grid-cols-6 gap-4 justify-items-center'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {
          foodList.map((food, index) => (
            cartItems[food._id] > 0 && (
              <div key={index} className='grid grid-cols-6 gap-4 py-2 place-items-center border-b'>
                <img className='h-[50%]' src={food.image} alt="" />
                <p>{food.name}</p>
                <p>${food.price}</p>
                <p>{cartItems[food._id]}</p>
                <p>${food.price * cartItems[food._id]}</p>
                <button onClick={() => removeFromCart(food._id)}>Remove</button>
              </div>
            )
          ))
        }
      </div>
      <div className='cart-bottom my-10 flex-col-reverse md:flex-row gap-10  flex justify-between '>
        <div className="cart-total flex-1">
          <h2 className='mb-5 font-medium text-xl '>Cart Total</h2>
          <div>
            <div className='border-b flex justify-between my-2 py-2'>
              <p>Subtotal</p>
              <p>{getCartTotal()|| 0}</p>
            </div>
            <div className='border-b flex justify-between my-2 py-2'>
              <p>Delivery Fee</p>
              <p>{getCartTotal()!=0?20: 0}</p>
            </div>
            <div className=' flex justify-between my-2 py-2'>
              <p>Total</p>
              <p>{getCartTotal()!=0?getCartTotal()+20: 0}</p>
            </div>
          </div>
          <button className='px-8 py-2  bg-orange-400 text-white shadow rounded text-xs'><Link to='/order'>Proceed to Checkout</Link></button>
        </div>
        <div className='flex-1'>
          <div>
            <p>If you have a promo code, Enter it here </p>
            <div className='flex text-xs my-5 '>
              <input type="text" className='w-full outline-none rounded-l bg-slate-100 px-2' placeholder='PromoCode' />
              <button className='px-16 py-3 bg-black text-white rounded'>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
