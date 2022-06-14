import React from 'react';
import { NextPage } from 'next';

import VideoCard from '../components/HomeVideoCard';
import { fetcher, base_url } from '../utils';
import { Video } from '../types';

interface IProps {
  videos: Video[];
}

const Home: NextPage<IProps> = ({ videos }) => {
  console.log(videos);
  return (
    <div className='flex flex-col gap-10 videos'>
      {videos?.map((video: Video) => (
        <div key={video._id}>
          <VideoCard videoData={video} />
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps = async () => {
  const videos = await fetcher(`${base_url}/api/posts`);
  return {
    props: { videos },
  };
};

export default Home;
