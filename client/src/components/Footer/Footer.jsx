import React from 'react'
import { assets } from '../../assets/frontend_assets/assets'

const Footer = () => {
    return (
        <div className='bg-gray-700 text-white p-10 mt-40   '>
            <div className='footer flex flex-wrap gap-10 justify-between py-4'>
                <div className='flex flex-col gap-4 items-start '>
                    <img src={assets.logo} alt="" />
                    <p className='max-w-md'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, perspiciatis!</p>
                    <div className="social-icons flex gap-2 flex-wrap">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div>
                    <h2 className='text-2xl uppercase pb-2'>company</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div>
                    <h2 className='uppercase pb-2'>Get in Touch</h2>
                    <ul>
                        <li>+92 763-839-82-29</li>
                        <li>contact@xyz.com</li>
                    </ul>
                </div>

            </div>
            <hr />
            <p className='pt-2'>Copyright 2024 Xyz.com - All Right Reserved</p>
        </div>

    )
}

export default Footer
