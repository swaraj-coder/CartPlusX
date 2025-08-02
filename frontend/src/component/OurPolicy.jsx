import React from 'react';
import Title from './Title';
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

function OurPolicy() {
  return (
    <div className='w-full py-16 px-4 bg-gradient-to-l from-[#141414] to-[#0c2025] text-white'>
      
      {/* Title Section */}
      <div className='text-center mb-10'>
        <Title text1={"OUR"} text2={"POLICY"} />
        <p className='text-sm md:text-lg text-blue-200'>
          Customer-Friendly Policies – Committed to Your Satisfaction and Safety.
        </p>
      </div>

      {/* Policy Cards Section */}
      <div className='max-w-[1200px] mx-auto grid gap-12 md:grid-cols-3 sm:grid-cols-1 text-center'>
        
        {/* 1st Card */}
        <div className='flex flex-col items-center gap-4 px-4'>
          <RiExchangeFundsLine className='text-[#90b9ff] text-[40px] md:text-[60px]' />
          <h3 className='text-lg md:text-2xl font-semibold text-[#a5e8f7]'>Easy Exchange Policy</h3>
          <p className='text-xs md:text-base text-[aliceblue]'>
            Exchange Made Easy – Quick, Simple, and Customer-Friendly Process.
          </p>
        </div>

        {/* 2nd Card */}
        <div className='flex flex-col items-center gap-4 px-4'>
          <TbRosetteDiscountCheckFilled className='text-[#90b9ff] text-[40px] md:text-[60px]' />
          <h3 className='text-lg md:text-2xl font-semibold text-[#a5e8f7]'>7 Days Return Policy</h3>
          <p className='text-xs md:text-base text-[aliceblue]'>
            Shop with Confidence – 7 Days Easy Return Guarantee.
          </p>
        </div>

        {/* 3rd Card */}
        <div className='flex flex-col items-center gap-4 px-4'>
          <BiSupport className='text-[#90b9ff] text-[40px] md:text-[60px]' />
          <h3 className='text-lg md:text-2xl font-semibold text-[#a5e8f7]'>Best Customer Support</h3>
          <p className='text-xs md:text-base text-[aliceblue]'>
            Trusted Customer Support – Your Satisfaction Is Our Priority.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OurPolicy;