import axios from 'axios'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../Context/store.context'

const Login = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext)
  const [currState, setCurrentState] = useState("Sign Up")
  const [credetials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  })
  const handleChange = (e) => {
    const key = e.target.name
    const value = e.target.value
    setCredentials({ ...credetials, [key]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let newUrl = url

    if (currState === "Sign Up") {
      newUrl += "/api/user/signup"
    } else {
      newUrl += "/api/user/login"
    }
    const res = await axios.post(newUrl, credetials)
    if (res.data.success) {
      toast.success(res.data.message)
      if(res.data.token){
        localStorage.setItem('token', res.data.token)
        setToken(res.data.token)
        setShowLogin(false)
      }else{
        setCurrentState("Login")
      }

    } else {
      toast.error(res.data.message)
    }
  }
  return (
    <div className='absolute z-10 w-full  h-full grid  text-xs      '>
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
            <p>Create a new account? <span onClick={() => setCurrentState("Login")} className='cursor-pointer text-orange-400'>Click Here</span> </p> :
            <p>Allready have an account ?<span onClick={() => setCurrentState("Sign Up")} className='cursor-pointer text-orange-400'>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default Login
