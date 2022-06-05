// @ts-nocheck

import React, { useState } from 'react';
import type { NextPage } from 'next';

import VideoCard from '../components/HomeVideoCard';
import { fetcher, base_url } from '../utils';

const Home: NextPage = ({ data }: any) => {
  const [posts, setPosts] = useState(data);
  return (
    <div className='flex flex-col gap-10 h-88vh videos'>
      {posts?.map((post: any, idx: number) => (
        <div key={idx}>
          <VideoCard post={post} posts={posts} setPosts={setPosts} />
        </div>
      ))}
    </div>
  );
};
export const getServerSideProps = async () => {
  const data = await fetcher(`${base_url}/api/posts`);
  return {
    props: { data },
  };
};
export default Home;
