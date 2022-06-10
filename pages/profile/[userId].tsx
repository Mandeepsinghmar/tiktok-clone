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
import { BsFillCameraVideoFill } from 'react-icons/bs';

import NoResults from '../../components/NoResults';

const Profile = ({ data }: any) => {
  const [isVideos, setIsVideos] = useState(true);
  const [videosList, setVideosList] = useState([]);

  const { user, userVideos, userLikedVideos } = data;
  const videos = isVideos ? 'border-b-2 border-black' : 'text-gray-400';
  const liked = !isVideos ? 'border-b-2 border-black' : 'text-gray-400';

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
    <div className='w-full'>
      <div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
        <div className='w-16 h-16 md:w-32 md:h-32'>
          <Image
            width={120}
            height={120}
            layout='responsive'
            className='rounded-full'
            src={user.image}
            alt='user-profile'
          />
        </div>

        <div>
          <p className='text-md md:text-2xl font-bold tracking-wider flex gap-2 items=center lowercase'>
            {user.userName.replace(/\s+/g, '')}{' '}
            <GoVerified className='text-blue-400 md:text-xl text-md' />
          </p>
          <p className='text-sm font-medium'> {user.userName}</p>
        </div>
      </div>
      <div>
        <p className=' text-md text-gray-600'>
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
            className={`text-xl font-semibold cursor-pointer ${videos} mt-2`}
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
        <div className='flex gap-6 flex-wrap justify-center'>
          {videosList.length > 0 ? (
            videosList.map((post: any, idx: number) => (
              <VideoCard key={idx} post={post} profile />
            ))
          ) : (
            <NoResults
              icon={<BsFillCameraVideoFill />}
              text={`No ${isVideos ? '' : 'Liked'} Videos Yet`}
            />
          )}
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
