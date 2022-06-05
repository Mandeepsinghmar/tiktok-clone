// @ts-nocheck

import Link from 'next/link';
import React from 'react';
import { topics } from '../../utils';

const Discover = () => {
  return (
    <div className='border-b-2 border-gray-200 pb-6'>
      <p className='text-gray-500 font-semibold m-3 mt-2 '>Discover</p>
      <div className='flex gap-3 flex-wrap'>
        {topics?.map((item) => (
          <Link href={`/discover/${item.name}`}>
            <p className='border-2 hover:bg-primary border-gray-300 px-4 rounded-full flex items-center gap-2 justify-center cursor-pointer'>
              <span className='font-bold text-2xl'>#</span>{' '}
              <span className='text-gray-500'>{item.name}</span>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
