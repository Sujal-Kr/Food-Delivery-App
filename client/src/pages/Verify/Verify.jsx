import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './Verify.css'
import { StoreContext } from '../../Context/store.context'
import axios from 'axios'
const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    const {url} =useContext(StoreContext)
    const navigate=useNavigate()
    console.log("frontend", success+"  "+orderId)
    const verifyPayment=async()=>{
        const res=await axios.post(`${url}/api/order/verify`,{success,orderId})
        console.log(res.data)
        if(res.data.success) {
            navigate('/myorders')
        }else{
            navigate('/')
        }
    }
    useEffect(()=>{
        verifyPayment()
    },[])
    return (
        <div className=' flex justify-center items-center h-dvh'>
            <span class="loader"></span>
        </div>
    )
}

export default Verify