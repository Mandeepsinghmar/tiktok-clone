import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';

import VideoCard from '../components/HomeVideoCard';
import { fetcher, base_url } from '../utils';
import { Video } from '../types';

const Home: NextPage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const videosData = await fetcher(`${base_url}/api/posts`);

      setVideos(videosData);
    };

    fetchVideos();
  }, []);

  return (
    <div className='flex flex-col gap-10 videos'>
      {videos?.map((video: Video) => (
        // TODO: this div can be put inside of the VideoCard Component
        <div key={video._id}>
          <VideoCard videoData={video} />
        </div>
      ))}
    </div>
  );
};

export default Home;
