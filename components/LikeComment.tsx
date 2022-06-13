import React, { useEffect, useState } from 'react';
import { MdFavorite } from 'react-icons/md';
import { AiFillMessage } from 'react-icons/ai';
import { FaShare } from 'react-icons/fa';

import useAuthStore from '../store/authStore';
import { NextPage } from 'next';

interface IProps {
  likes: any;
  comments: any;
  flex: string;
  handleLike: () => void;
  handleDislike: () => void;
}

const LikeComment: NextPage<IProps> = ({
  likes,
  comments,
  flex,
  handleLike,
  handleDislike,
}) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: any = useAuthStore();
  let filterLikes = likes?.filter(
    (item: any) => item._ref === userProfile.googleId
  );

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes, likes]);

  return (
    <div className={`${flex} gap-6`}>
      <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
        {alreadyLiked ? (
          <div
            className='bg-primary rounded-full p-2 md:p-4 text-red-500 '
            onClick={handleDislike}
          >
            <MdFavorite className='text-lg md:text-2xl' />
          </div>
        ) : (
          <div
            className='bg-primary rounded-full p-2 md:p-4 '
            onClick={handleLike}
          >
            <MdFavorite className='text-lg md:text-2xl' />
          </div>
        )}

        <p className='text-md font-semibold '>{likes?.length || 0}</p>
      </div>
      <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
        <div className='bg-primary rounded-full p-2 md:p-4 '>
          <AiFillMessage className='text-lg md:text-2xl' />
        </div>
        <p className='text-md font-semibold '>{comments?.length || 0}</p>
      </div>
      <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
        <div className='bg-primary rounded-full p-2 md:p-4'>
          <FaShare className='text-lg md:text-2xl' />
        </div>
        <p className='text-md font-semibold '>{comments?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeComment;
