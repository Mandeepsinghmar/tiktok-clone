// @ts-nocheck

import Link from 'next/link';
import React from 'react';
import { BsEmojiSunglasses } from 'react-icons/bs';
import { GrGamepad } from 'react-icons/gr';
import { GiCakeSlice, GiGalaxy, GiLipstick } from 'react-icons/gi';
import { FaPaw, FaMedal } from 'react-icons/fa';

const Discover = () => {
  const topics = [
    {
      name: 'comedy',
      icon: <BsEmojiSunglasses />,
    },
    {
      name: 'gaming',
      icon: <GrGamepad />,
    },
    {
      name: 'food',
      icon: <GiCakeSlice />,
    },
    {
      name: 'dance',
      icon: <GiGalaxy />,
    },
    {
      name: 'beauty',
      icon: <GiLipstick />,
    },
    {
      name: 'animals',
      icon: <FaPaw />,
    },
    {
      name: 'sports',
      icon: <FaMedal />,
    },
  ];

  return (
    <div className='xl:border-b-2 xl:border-gray-200 pb-6'>
      <p className='text-gray-500 font-semibold m-3 mt-2 hidden xl:block '>
        Popular Topics
      </p>
      <div className='flex gap-3 flex-wrap'>
        {topics?.map((item) => (
          <Link href={`/discover/${item.name}`} key={item.name}>
            <p className='xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer'>
              <span className='font-bold text-2xl xl:text-md text-black'>
                {item.icon}
              </span>
              <span className='text-black font-medium text-md hidden xl:block capitalize'>
                {item.name}
              </span>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
