import React, { useContext } from 'react'
import { StoreContext } from '../../Context/store.context'
import { Link } from 'react-router-dom'

const PlaceOrder = () => {
    const { getCartTotal } = useContext(StoreContext)
    return (
        <div className='my-20'>
            <form action="" className='flex items-start justify-between gap-12 flex-wrap'>
                <div className='flex-1 flex flex-col text-xs gap-5'>
                    <p className='text-2xl'>Delivery Information</p>
                    <div className='flex gap-5 '>
                        <input className=' md:flex-1  border px-2 py-3 outline-none rounded' type="text" placeholder='First Name' />
                        <input className=' md:flex-1  border px-2 py-3 outline-none rounded' type="text" placeholder='Last Name' />
                    </div>
                    <input className='border px-2 py-3 outline-none rounded' type="email" placeholder='Email Address' />
                    <input className='border px-2 py-3 outline-none rounded' type="text" placeholder='Street' />
                    <div className='flex gap-5'>
                        <input className=' md:flex-1 border px-2 py-3 outline-none rounded' type="text" placeholder='City' />
                        <input className=' md:flex-1 border px-2 py-3 outline-none rounded' type="text" placeholder='State' />
                    </div>
                    <div className='flex gap-5'>
                        <input className='flex-1 border px-2 py-3 outline-none rounded' type="text" placeholder='Zip Code' />
                        <input className='flex-1 border px-2 py-3 outline-none rounded' type="text" placeholder='Country' />
                    </div>
                    <input className='border px-2 py-3 outline-none rounded' type="number" placeholder='Phone' />
                </div>
                <div className='flex-1'>
                    <div className="cart-total flex-1">
                        <h2 className='mb-5 font-medium text-xl '>Cart Total</h2>
                        <div>
                            <div className='border-b flex justify-between my-2 py-2'>
                                <p>Subtotal</p>
                                <p>{getCartTotal() || 0}</p>
                            </div>
                            <div className='border-b flex justify-between my-2 py-2'>
                                <p>Delivery Fee</p>
                                <p>{getCartTotal()!=0? 20 : 0}</p>
                            </div>
                            <div className=' flex justify-between my-2 py-2'>
                                <p>Total</p>
                                <p>{getCartTotal()!=0?getCartTotal() + 20 : 0}</p>
                            </div>
                        </div>
                        <button className='px-8 py-2  bg-orange-400 text-white shadow rounded text-xs'><Link to='/order'>Proceed to Payment</Link></button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PlaceOrder
