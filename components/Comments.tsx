// @ts-nocheck

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { GoVerified } from 'react-icons/go';

import { base_url } from '../utils';

const Comments = ({ userId, postId, comments }: any) => {
  const [comment, setComment] = useState('');

  const addComment = async (e) => {
    e.preventDefault();
    if (comment) {
      const res = await fetch(`${base_url}/api/post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ userId, comment }),
      });
      setComment('');
      window.location.reload();
    }
  };

  return (
    <div className='border-t-2 border-gray-200 pt-4 pl-10 mt-4 bg-[#F8F8F8] border-b-2 pb-[100px]'>
      <div className='overflow-scroll lg:h-[457px]'>
        {comments?.map((item, idx) => (
          <div className='flex gap-3 p-2' key={idx}>
            <Link href={`/profile/${item.postedBy._id}`}>
              <Image
                width={60}
                height={60}
                className='rounded-full cursor-pointer'
                src={item.postedBy.image}
                alt='user-profile'
              />
            </Link>
            <div>
              <div className='flex items-center gap-1'>
                <Link href={`/profile/${item.postedBy._id}`}>
                  <p className='flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-primary'>
                    {item.postedBy.userName}{' '}
                    <GoVerified className='text-blue-400' />
                  </p>
                </Link>
              </div>
              <p className='mt-2 text-[16px'>{item.comment}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='absolute bottom-0 left-0  pb-6 px-10 '>
        <form onSubmit={addComment} className='flex gap-4'>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className='bg-primary px-6 py-4 text-md font-medium border-2 w-[330px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'
            placeholder='Add comment..'
          />
          <button className='text-md text-gray-400 ' onClick={addComment}>
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;
