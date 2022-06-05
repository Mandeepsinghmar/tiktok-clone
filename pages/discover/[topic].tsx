// @ts-nocheck

import React from 'react';
import { fetcher, base_url } from '../../utils';
import VideoCard from '../../components/VideoCard';
import Image from 'next/image';

const Discover = ({ videos }: any) => {
  return (
    <div className='w-full  '>
      <div className='flex gap-10 mb-10 bg-white w-full'>
        <Image
          width={160}
          height={160}
          className=' rounded'
          src='https://p16-amd-va.tiktokcdn.com/obj/musically-maliva-obj/b512979c082726d9f4ce8a9851eaac5a.png'
          alt='img'
        />
        <div>
          <p className='text-4xl font-bold tracking-wider'>#hiking</p>
          <p className='text-xl'>1.2B views</p>
        </div>
      </div>
      <p className='my-4 text-xl text-gray-400'>Enjoy Hiking videos</p>
      <div className='flex gap-6'>
        {videos?.map((post: any, idx: number) => (
          <VideoCard key={idx} post={post} profile={false} />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params: { topic } }: any) => {
  const videos = await fetcher(`${base_url}/api/discover/${topic}`);
  return {
    props: { videos },
  };
};
export default Discover;
