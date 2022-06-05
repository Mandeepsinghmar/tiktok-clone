import React from 'react';
import { fetcher } from '../../utils';
import VideoCard from '../../components/VideoCard';

const Discover = ({ videos }: any) => {
  return (
    <div className='w-full  '>
      <div className='flex gap-10 mb-10 bg-white w-full'>
        <img
          className='w-40 h-40 rounded'
          src='https://p16-amd-va.tiktokcdn.com/obj/musically-maliva-obj/b512979c082726d9f4ce8a9851eaac5a.png'
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
  const videos = await fetcher(`http://localhost:3000/api/discover/${topic}`);
  return {
    props: { videos },
  };
};
export default Discover;
