import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { assets } from '../../../../client/src/assets/frontend_assets/assets'
import { server } from '../../constants/config'
const Order = () => {
  const [data, setData] = useState()
  const fetchAllOrders = async () => {
    const res = await axios.get(`${server}/api/order/listorders`)
    if (res.data.success) {
      setData(res.data.data)
    }
  }
  const handleStatusChange=async (id ,status) => {
    const res=await axios.patch(`${server}/api/order/status`,{id:id,status:status})
    if(res.data.success) {
      fetchAllOrders()
    }
  }
  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className='m-4 md:m10 lg:m-20'>
      <h2 className='text-2xl mb-10'>Order Page</h2>
      <div className='order-list flex flex-col gap-5 text-xs '>
        {
          data?.map((order, index) => (
            <div key={index} className='p-4 border grid grid-cols-3 lg:grid-cols-[0.5fr,2fr,1fr,1fr,1fr] place-items-start gap-8'>
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className='order-item-food mb-8'>
                  {
                    order.items?.map((item, index) => (
                      item == order.items.length - 1 ? item.name + "x" + item.quantity + ", " : item.name + "x" + item.quantity + " "
                    ))
                  }
                </p>
                <p>{order.address.FirstName + " " + order.address.LastName}</p>
                <div>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipCode + " "}</p>
                </div>
                <p className='my-5'>{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>${order.amount}</p>
              <select onChange={(e)=>handleStatusChange(order._id,e.target.value)} value={order.status} className='p-2 border outline-none  border-orange-400'>
                {
                  ["Food Processing", "Out For Delivery", "Delivered"].map((status, index) => (
                    <option key={index} value={status}>{status}</option>
                  ))
                }
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Order
