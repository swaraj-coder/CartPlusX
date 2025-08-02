import React from 'react'
import logo from "../assets/logo.png"

function Footer() {
  return (
    <div className='w-full mb-[77px] md:mb-0'>
      <div className='w-full bg-[#dbfcfcec] flex flex-col md:flex-row items-start md:items-center justify-center md:px-[50px] px-[10px] py-[20px] gap-[20px]'>
        
        {/* Left: Logo and Description */}
        <div className='md:w-[30%] w-full flex flex-col  justify-center gap-[5px]'>
          <div className='flex items-center gap-[8px]'>
            <img src={logo} alt="" className='md:w-[40px] md:h-[40px] w-[30px] h-[30px]'/>
            <p className='text-[19px] md:text-[20px] text-black'>CartPlusX</p>
          </div>

          <p className='text-[14px] text-[#1e2223] hidden md:block leading-[20px]'>
            CartPlusX is your all-in-one online shopping destination, offering top-quality products, unbeatable deals, and fast delivery—all backed by trusted service designed to make your life easier every day.
          </p>

          <p className='text-[14px] text-[#1e2223] md:hidden'>
            Fast. Easy. Reliable. CartPlusX Shopping.
          </p>
        </div>

        {/* Right: Company Links */}
        <div className='md:w-[25%] w-full flex flex-col items-start md:items-center justify-center text-left md:text-center'>
          <p className='text-[19px] md:text-[20px] text-[#1e2223] font-sans mb-[10px]'>COMPANY</p>
          <ul className='space-y-[5px]'>
            <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>Home</li>
            <li className='text-[15px] text-[#1e2223] cursor-pointer'>About us</li>
            <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>Delivery</li>
            <li className='text-[15px] text-[#1e2223] cursor-pointer'>Privacy Policy</li>
          </ul>
        </div>
        <div className='md:w-[25%] w-[40%] flex flex-col items-start md:items-center justify-center text-left md:text-center'>
           <p className='text-[19px] md:text-[20px] text-[#1e2223] font-sans mb-[10px]'>GET IN TOUCH</p>
            <ul className='space-y-[5px]'>
            <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>+91-9339854577</li>
            <li className='text-[15px] text-[#1e2223] cursor-pointer'>contact@cartplusx.com</li>
            <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>+1-123-456-7890</li>
            <li className='text-[15px] text-[#1e2223] cursor-pointer'>admin@cartplusx.com</li>
          </ul>

        </div>

      </div>

      <div className='w-[100%] h-[1px] bg-slate-400 '></div>
      <div className='w-[100%] h-[5vh] bg-[#dbfcfcec] flex items-center justify-center'>Copyright 2025@cartplusx.com-All Rights Reserved</div>
    </div>
  )
}

export default Footer