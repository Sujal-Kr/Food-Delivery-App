import React, {useEffect, useContext,useState } from 'react'
import { StoreContext } from '../../Context/store.context'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const PlaceOrder = () => {

    const { getCartTotal,token,url,cartItems,foodList } = useContext(StoreContext)
    const navigate=useNavigate()
    const [data,setData]=useState({})
    const handleChange=(e)=>{
        const key=e.target.name
        const value=e.target.value
        setData({...data,[key]:value})
    }

    const handlePlaceOrder=async(e)=>{
        e.preventDefault()
        let orderItems=[]
        foodList.map((item)=>{
            if(cartItems[item._id]>0){
                let itemInfo=item
                itemInfo['quantity']=cartItems[item._id]
                orderItems.push(itemInfo)
            }
        })

        let orderData={
            address:data,
            items:orderItems,
            amount:getCartTotal(),
        }
        console.log(orderData)
        const res=await axios.post(`${url}/api/order/place`,orderData,{headers:{token}})
        console.log(res.data.message)
        if(res.data.success){
            const {session_url}=res.data
            console.log(session_url)
            window.location.href=session_url
        }else{
            alert("Oops something went wrong!!")
        }
    }
    useEffect(() =>{
        if(!token){
            navigate('/cart')
        }else if(getCartTotal()===0){
            navigate('/cart')
        }
    },[token])


    return (
        <div className='my-20'>
            <form action="" onSubmit={handlePlaceOrder} className='flex items-start justify-between gap-12 flex-wrap'>
                <div className='flex-1 flex flex-col text-xs gap-5'>
                    <p className='text-2xl'>Delivery Information</p>
                    <div className='flex gap-5 '>
                        <input required className=' md:flex-1  border px-2 py-3 outline-none rounded' type="text" placeholder='First Name' name="FirstName" value={data.FirstName} onChange={handleChange}/>
                        <input required className=' md:flex-1  border px-2 py-3 outline-none rounded' type="text" placeholder='Last Name' name="LastName" value={data.LastName}  onChange={handleChange}/>
                    </div>
                    <input required className='border px-2 py-3 outline-none rounded' type="email" placeholder='Email Address' name='email' value={data.email} onChange={handleChange} />
                    <input required className='border px-2 py-3 outline-none rounded' type="text" placeholder='Street' name="street" value={data.street} onChange={handleChange} />
                    <div className='flex gap-5'>
                        <input required className=' md:flex-1 border px-2 py-3 outline-none rounded' type="text" placeholder='City' name='city' value={data.city} onChange={handleChange} />
                        <input required className=' md:flex-1 border px-2 py-3 outline-none rounded' type="text" placeholder='State' name='state' value={data.state} onChange={handleChange} />
                    </div>
                    <div className='flex gap-5'>
                        <input required className='flex-1 border px-2 py-3 outline-none rounded' type="text" placeholder='Zip Code' name="zipCode" value={data.zipCode}  onChange={handleChange} />
                        <input required className='flex-1 border px-2 py-3 outline-none rounded' type="text" placeholder='Country' name='country' value={data.country} onChange={handleChange} />
                    </div>
                    <input required className='border px-2 py-3 outline-none rounded' type="number" placeholder='Phone' name='phone' value={data.phone} onChange={handleChange} />
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
                                <p>{getCartTotal()!==0? 20 : 0}</p>
                            </div>
                            <div className=' flex justify-between my-2 py-2'>
                                <p>Total</p>
                                <p>{getCartTotal()!==0?getCartTotal() + 20 : 0}</p>
                            </div>
                        </div>
                        <button type='submit' className='px-8 py-2  bg-orange-400 text-white shadow rounded text-xs'>Proceed to Payment</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PlaceOrder
