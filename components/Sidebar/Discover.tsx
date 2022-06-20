// TODO: Remove all unused imports : useState
import React, { useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { BsEmojiSunglasses } from 'react-icons/bs';
import { GiCakeSlice, GiGalaxy, GiLipstick } from 'react-icons/gi';
import { FaPaw, FaMedal, FaGamepad } from 'react-icons/fa';
import { useRouter } from 'next/router';

const Discover: NextPage = () => {
  const router = useRouter();
  const { topic } = router.query;

  // TODO: Put this in another file so that we can simply import it.
  const topics = [
    {
      name: 'comedy',
      icon: <BsEmojiSunglasses />,
    },
    {
      name: 'gaming',
      icon: <FaGamepad />,
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

  const activeTopicStyle =
    'xl:border-2 hover:bg-primary xl:border-red-500 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-red-500';
  const topicStyle =
    'xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black';

  return (
    <div className='xl:border-b-2 xl:border-gray-200 pb-6'>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
        Popular Topics
      </p>
      <div className='flex gap-3 flex-wrap'>
        {topics?.map((item) => (
          <Link href={`/discover/${item.name}`} key={item.name}>
            <div
              className={topic === item.name ? activeTopicStyle : topicStyle}
            >
              <span className='font-bold text-2xl xl:text-md '>
                {item.icon}
              </span>
              <span
                className={`font-medium text-md hidden xl:block capitalize`}
              >
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
