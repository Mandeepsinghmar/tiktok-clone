import React from 'react';
import { NextPage } from 'next';

const Footer: NextPage = () => {
  return (
    <div className='mt-6 hidden xl:block'>
      <div className='flex flex-wrap gap-2'>
        {[
          'About',
          'Newsroom',
          'Store',
          'Contact',
          'Carrers',
          'ByteDance',
          'Creator Directory',
        ].map((item) => (
          <p
            key={item}
            className='text-gray-400 text-sm  hover:underline cursor-pointer'
          >
            {item}
          </p>
        ))}
      </div>
      <div className='flex flex-wrap gap-2 mt-5'>
        {[
          'TikTok for Good',
          'Advertise',
          'Developers',
          'Transparency',
          'TikTok Rewards',
        ].map((item) => (
          <p
            key={item}
            className='text-gray-400 text-sm  hover:underline cursor-pointer'
          >
            {item}
          </p>
        ))}
      </div>
      <div className='flex flex-wrap gap-2 mt-5'>
        {[
          'Help',
          'Safety',
          'Terms',
          'Privacy',
          'Creator Portal',
          'Community Guidelines',
        ].map((item) => (
          <p
            key={item}
            className='text-gray-400 text-sm  hover:underline cursor-pointer'
          >
            {item}
          </p>
        ))}
      </div>
      <p className='text-gray-400 text-sm mt-5'>© 2022 TikTok</p>
    </div>
  );
};

export default Footer;
