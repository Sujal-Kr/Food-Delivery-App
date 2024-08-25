import React, { useState,useEffect } from 'react'
import {toast } from 'react-toastify';

import axios from 'axios';
const List = () => {
    const url='http://localhost:6969'
    const [list,setList]=useState([])
    const [loading,setLoading]=useState(true)
    const fetchList=async()=>{
        try{
            const res=await axios.get(`${url}/api/food/list`)
            
            if(res.data.success){
                setList(res.data.data)
                setLoading(false)
            }
        }catch(err){
            setLoading(false)
            toast.error(err.message)
        }
    }
    const handleRemove=async(id)=>{
        
        const res=await axios.delete(`${url}/api/food/remove`,{
            data:{id}
        })
        await fetchList()
        if(res.data.success){
            toast.success("Food removed successfully")
        }else{
            toast.error(res.data.message) 
        }
    }
    useEffect(()=>{
        fetchList()
    },[])
  return (
    <div className='flex-1 p-20 '>
      <h2 className='text-2xl pb-5'>All Food List</h2>
      <div className='list-table border-2 '>
        <div className='border-gray-500 pb-5 grid grid-cols-5 gap-4 justify-items-center border-b'>
            <p>Image</p>
            <p>Name</p>
            <p>Category</p>
            <p>Price</p>
            <p>Action</p>
        </div>
        {
            list.map((item,index)=>(
                <div key={index} className='grid grid-cols-5 gap-4 py-2 place-items-center border-b'>
                <img className='w-[50%] aspect-square object-cover' src={`${item.image}`} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <button onClick={() =>{handleRemove(item._id)}} className=''>Remove</button>
              </div>
            ))
        }
      </div>
    </div>
  )
}

export default List
