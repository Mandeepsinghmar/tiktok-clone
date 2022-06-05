// @ts-nocheck

import React, { useEffect, useState } from 'react';
import { GoVerified } from 'react-icons/go';
import { fetcher, base_url } from '../../utils';
import VideoCard from '../../components/VideoCard';
import {
  userCreatedPostsQuery,
  userLikedPostsQuery,
} from '../../utils/queries';
import Image from 'next/image';

const Profile = ({ data }: any) => {
  const [isVideos, setIsVideos] = useState(true);
  const [videosList, setVideosList] = useState([]);

  const { user, userVideos, userLikedVideos } = data;
  const videos = isVideos ? 'border-b-2 border-black' : '';
  const liked = !isVideos ? 'border-b-2 border-black' : '';

  useEffect(() => {
    const fetchVideos = async () => {
      if (isVideos) {
        setVideosList(userVideos);
      } else {
        setVideosList(userLikedVideos);
      }
    };
    fetchVideos();
  }, [isVideos]);

  return (
    <div className='w-full  '>
      <div className='flex gap-10 mb-4 bg-white w-full'>
        <Image
          width={120}
          height={120}
          className='rounded-full'
          src={user.image}
          alt='user-profile'
        />
        <div>
          <p className='text-4xl font-bold tracking-wider flex gap-2 items=center'>
            {user.userName} <GoVerified className='text-blue-400 text-2xl' />
          </p>
          <p className='text-xl'> {user.userName}</p>
        </div>
      </div>
      <div>
        <p className=' text-xl text-gray-600'>
          🔑 Entrepreneur <br />
          🔮 Investor in Uber, Snap, Venmo, Twitter ✈️
          <br />
          CEO of VaynerMedia
        </p>
      </div>
      <div>
        <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
          <p
            onClick={() => setIsVideos(true)}
            className={`text-xl  font-semibold cursor-pointer ${videos} mt-2`}
          >
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer ${liked} mt-2`}
            onClick={() => setIsVideos(false)}
          >
            Liked
          </p>
        </div>
        <div className='flex gap-6 flex-wrap'>
          {videosList?.map((post: any, idx: number) => (
            <VideoCard key={idx} post={post} profile />
          ))}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params: { userId } }: any) => {
  const data = await fetcher(`${base_url}/api/profile/${userId}`);
  return {
    props: { data },
  };
};
export default Profile;
