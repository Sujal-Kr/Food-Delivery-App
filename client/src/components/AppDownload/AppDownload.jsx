import React from 'react'
import { assets } from '../../assets/frontend_assets/assets'

const AppDownload = () => {
  return (
    <div className='py-12'>
      <p className='text-center text-4xl'>For Better experince Download <br />QuickBite App</p>
      <div className='flex  flex-wrap items-center justify-center gap-5 py-10'>
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  )
}

export default AppDownload
