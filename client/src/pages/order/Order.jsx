import React, {useState, useContext,useEffect } from 'react'
import axios from 'axios'
import { StoreContext } from '../../Context/store.context'
import { assets } from '../../assets/frontend_assets/assets'
const Order = () => {
  const {url,token}=useContext(StoreContext)
  const [data,setData] = useState([])
  const fetchOrders= async()=>{
    const res=await axios.get(`${url}/api/order/userorders`,{
      headers: {token}
    })
    setData(res.data.data)

  }
  const handleTrackOrder=async()=>{
    fetchOrders()
  }
  useEffect(()=>{
    fetchOrders()
  },[token])

  return (
    <div className='mb-20'>
      <h2 className='text-2xl my-10'>My orders</h2>
      <div className='text-xs container  flex flex-col gap-5 '>

      {
        data?.map((order,index)=>(
          <div key={index} className='shadow gap-6 p-4 rounded border-2 border-slate-400 grid-cols-3 md:grid-cols-[0.5fr,2fr,1fr,1fr,2fr,1fr] grid place-items-center '>
            <img src={assets.parcel_icon}/>
            <p>
              {
                order.items.map((item,index)=>(
                  index===order.items.length-1?item.name+" x "+item.quantity+" ":item.name+" x "+item.quantity+", "
                ))
              }
            </p>
            <p>${order.amount}</p>
            <p>{`Items: ${order.items.length}`}</p>
            <p className={`flex gap-2 font-semibold ${order.status!="Delivered"?"text-orange-300":"text-green-400"}`}><span>&#9679;</span>{order.status}</p>
            <button onClick={handleTrackOrder} className=' shadow rounded  px-8 py-2 bg-orange-400 text-white'>Track order</button>
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default Order
