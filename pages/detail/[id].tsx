// @ts-nocheck

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { GoVerified } from 'react-icons/go';

import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

import Comments from '../../components/Comments';
import { fetcher, base_url } from '../../utils';
import Image from 'next/image';
import useAuthStore from '../../store/authStore';
import Link from 'next/link';
import LikeComment from '../../components/LikeComment';

const Detail = ({ postDetails }) => {
  const [post, setPost] = useState(postDetails);
  const [playing, setPlaying] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  const videoRef = useRef();
  const router = useRouter();

  const onVideoClick = () => {
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (post) {
      videoRef.current.muted = videoMuted;
    }
  }, [videoMuted]);

  const handleLike = async () => {
    const res = await fetch(`http://localhost:3000/api/post/${post._id}`, {
      method: 'PUT',
      body: JSON.stringify({ userId: post.userId }),
    });
    const data = await res.json();

    console.log(data.likes);
    setPost({ ...post, likes: data.likes });
  };

  return (
    <>
      {post && (
        <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap'>
          <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover'>
            <div className='opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
              <p className='cursor-pointer ' onClick={() => router.back()}>
                <MdOutlineCancel className='text-white text-[35px] hover:opacity-90' />
              </p>
              <div className='mt-1'>
                <Image
                  width={26}
                  height={26}
                  className='rounded-full'
                  src='https://cdn.pixabay.com/photo/2021/06/15/12/28/tiktok-6338431_1280.png'
                  alt='logo'
                />
              </div>
            </div>
            <div className='relative'>
              <div className='lg:h-[100vh] h-[60vh]'>
                <video
                  ref={videoRef}
                  onClick={onVideoClick}
                  loop
                  src={post && post.video.asset.url}
                  className=' h-full cursor-pointer'
                ></video>
              </div>

              <div className='absolute top-[45%] left-[40%]  cursor-pointer'>
                {!playing && (
                  <button onClick={onVideoClick}>
                    <BsFillPlayFill className='text-white text-6xl lg:text-8xl' />
                  </button>
                )}
              </div>
            </div>
            <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10  cursor-pointer'>
              {videoMuted ? (
                <button onClick={() => setVideoMuted(false)}>
                  <HiVolumeOff className='text-white text-3xl lg:text-4xl' />
                </button>
              ) : (
                <button onClick={() => setVideoMuted(true)}>
                  <HiVolumeUp className='text-white text-3xl lg:text-4xl' />
                </button>
              )}
            </div>
          </div>
          <div className='relative w-[1000px] md:w-[900px] lg:w-[700px]'>
            <div className='lg:mt-20 mt-10'>
              <Link href={`/profile/${post.postedBy._id}`}>
                <div className='flex gap-4 mb-4 bg-white w-full pl-10 cursor-pointer'>
                  <Image
                    width={60}
                    height={60}
                    alt='user-profile'
                    className='rounded-full'
                    src={post.postedBy.image}
                  />
                  <div>
                    <p className='text-xl font-bold lowercase tracking-wider flex gap-2 items=center'>
                      {post.postedBy.userName.replace(/\s+/g, '')}{' '}
                      <GoVerified className='text-blue-400 text-xl' />
                    </p>
                    <p className='text-md'> {post.postedBy.userName}</p>
                  </div>
                </div>
              </Link>
              <div className='px-10'>
                <p className=' text-md text-gray-600'>{post.caption}</p>
              </div>
              <div className='mt-10 px-10'>
                <LikeComment post={post} flex='flex' handleLike={handleLike} />
              </div>
              <Comments
                userId={post.userId}
                postId={post._id}
                comments={post.comments}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const getServerSideProps = async ({ params: { id } }: any) => {
  const postDetails = await fetcher(`${base_url}/api/post/${id}`);

  return {
    props: { postDetails },
  };
};

export default Detail;
