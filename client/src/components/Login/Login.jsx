import React, { useState } from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = ({ setShowLogin }) => {
  const url = 'http://localhost:6969'
  const [currState, setCurrentState] = useState("Sign Up")
  const [credetials, setCredentials] = useState({
    name:"",
    email:"",
    password:"",
  })
  const handleChange = (e) => {
    const key = e.target.name
    const value = e.target.value
    setCredentials({ ...credetials, [key]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (currState === 'Sign Up') {
      const res =await axios.post(`${url}/api/user/signup`, {
        name:credetials.name,
        email:credetials.email,
        password:credetials.password
      })
      if (res.data.success) {
        toast.success('user registered successfully')
        setCurrentState('Login')
      }else{
        toast.error(`error:${res.data.message}`)
      }
    }else{
      const res = await axios.post(`${url}/api/user/login`, {
        email:credetials.email,
        password:credetials.password
      })

      if(res.data.success) {
        toast.success("user logged in successfully!!")
        setShowLogin(false)
      }
      else{
        toast.error("user logged in failed")

      }
    }


  }
  return (
    <div className='absolute z-10 w-[80%] h-full grid  text-xs      '>
      <form action="" onSubmit={handleSubmit} className='w-[333px]  rounded-xl shadow bg-white py-2 px-6  flex  flex-col gap-5 items-center justify-center place-self-center   '>
        <div className='w-full flex justify-between items-center  py-4'>
          <h2 className='font-bold text-xl'>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <div className='flex flex-col gap-5 w-full'>
          {currState === "Sign Up" ? <input className=" outline-none p-2 rounded border border-slate-400 " name='name' type="text" placeholder='Your Name' required value={credetials?.name} onChange={handleChange} /> : null}
          <input className="  outline-none p-2 rounded border border-slate-400  " type="email" name='email' placeholder='Your Email' onChange={handleChange} value={credetials?.email} />
          <input className="  outline-none p-2 rounded border border-slate-400  " type="password" name='password' placeholder='Your Password' onChange={handleChange} value={credetials?.password} />
        </div>
        <button className='w-full rounded text-white bg-orange-500 px-8 py-2'>{currState == "Sign Up" ? "Create Account" : "Login"}</button>

        {
          currState == "Sign Up" ?
            <div className='flex items-start gap-2'>
              <input type="checkbox" />

              <p className=''>By continuing ,i agree to all the terms and privacy policy.</p>
            </div>
            : null
        }
        {
          currState === "Sign Up" ?
            <p>Create a new account? <span onClick={() => setCurrentState("Login")} className='cursor-pointer'>Click Here</span> </p> :
            <p>Allready have an account ?<span onClick={() => setCurrentState("Sign Up")} className='cursor-pointer'>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default Login
