import React, { useState } from 'react';
import type { NextPage } from 'next';

import VideoCard from '../components/HomeVideoCard';
import { fetcher } from '../utils';

const Home: NextPage = ({ data }: any) => {
  const [posts, setPosts] = useState(data);
  return (
    <div className='flex flex-col gap-10 h-88vh videos '>
      {posts?.map((post: any, idx: number) => (
        <div key={idx}>
          <VideoCard post={post} posts={posts} setPosts={setPosts} />
        </div>
      ))}
    </div>
  );
};
export const getServerSideProps = async () => {
  const data = await fetcher('http://localhost:3000/api/posts');
  return {
    props: { data },
  };
};
export default Home;
