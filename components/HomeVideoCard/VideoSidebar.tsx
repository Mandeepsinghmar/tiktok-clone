// @ts-nocheck
import React, { useState } from 'react';
import { MdFavorite } from 'react-icons/md';
import { AiFillMessage } from 'react-icons/ai';
import { FaShare } from 'react-icons/fa';
import Link from 'next/link';
import useAuthStore from '../../store/authStore';

function VideoSidebar({ post }) {
  const { userProfile } = useAuthStore();
  return (
    <Link href={`/detail/${post._id}`}>
      <div>
        <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
          {post?.likes?.filter(
            (item) => item.postedBy._id === userProfile.googleId
          ).length > 0 ? (
            <div className='bg-primary rounded-full p-4 '>
              <MdFavorite className='text-3xl text-red-500' />
            </div>
          ) : (
            <div className='bg-primary rounded-full p-4 '>
              <MdFavorite className='text-3xl' />
            </div>
          )}

          <p className='text-md font-semibold '>{post.likes?.length}</p>
        </div>
        <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
          <div className='bg-primary rounded-full p-4 '>
            <AiFillMessage className='text-3xl' />
          </div>
          <p className='text-md font-semibold '>{post.comments?.length}</p>
        </div>
        <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
          <div className='bg-primary rounded-full p-4 '>
            <FaShare className='text-3xl' />
          </div>
          <p className='text-md font-semibold '>{post.comments?.length}</p>
        </div>
      </div>
    </Link>
  );
}

export default VideoSidebar;
