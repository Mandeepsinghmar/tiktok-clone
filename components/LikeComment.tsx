import React from 'react';
import { MdFavorite } from 'react-icons/md';
import { AiFillMessage } from 'react-icons/ai';
import { FaShare } from 'react-icons/fa';

import useAuthStore from '../store/authStore';
import { NextPage } from 'next';

interface IProps {
  id: string;
  likes: [];
  comments: [];
  flex: string;
  handleLike: () => void;
}

const LikeComment: NextPage<IProps> = ({
  id,
  likes,
  comments,
  flex,
  handleLike,
}) => {
  const { userProfile }: any = useAuthStore();

  return (
    <div className={`${flex} gap-6`}>
      <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
        {likes?.filter((item: any) => item.userId === userProfile?.googleId)
          .length > 0 ? (
          <div className='bg-primary rounded-full p-4 '>
            <MdFavorite className='text-2xl text-red-500' />
          </div>
        ) : (
          <div className='bg-primary rounded-full p-4 ' onClick={handleLike}>
            <MdFavorite className='text-2xl' />
          </div>
        )}

        <p className='text-md font-semibold '>{likes?.length || 0}</p>
      </div>
      <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
        <div className='bg-primary rounded-full p-4 '>
          <AiFillMessage className='text-2xl' />
        </div>
        <p className='text-md font-semibold '>{comments?.length || 0}</p>
      </div>
      <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
        <div className='bg-primary rounded-full p-4 '>
          <FaShare className='text-2xl' />
        </div>
        <p className='text-md font-semibold '>{comments?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeComment;
