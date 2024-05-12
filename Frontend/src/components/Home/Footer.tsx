import React from 'react';
import Logo from '../../assets/images/gymlogo.webp';

const Footer: React.FC  = () => (
  <div className='mt-48 bg-slate-100'>
    <p className='text-center text-3xl font-bold '>Copyright 2024. All Rights Reserved</p>
    <img src={Logo} alt="logo" className=' w-1/4 m-auto mt-10' />
    <div className='flex gap-10 mb-2  justify-center'>
    <a href="https://www.linkedin.com/in/chetan-gupta-7a7951200/" target='_blank' className='text-3xl font-bold mt-10 bg-blue-500 p-4 rounded-2xl'>LinkedIn
    
    </a>
    <a href="https://github.com/Chetan2708"
    target='_blank' className=' text-3xl font-bold mt-10 bg-gray-500 p-4 rounded-2xl'>Github</a>
    </div>
    
  </div>
);

export default Footer; 