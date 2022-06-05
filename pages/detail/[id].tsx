// @ts-nocheck

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { GoVerified } from 'react-icons/go';
import { MdFavorite } from 'react-icons/md';
import { AiFillMessage } from 'react-icons/ai';
import { FaShare } from 'react-icons/fa';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

import Comments from '../../components/Comments';
import { fetcher, base_url } from '../../utils';
import Image from 'next/image';
import useAuthStore from '../../store/authStore';
import Link from 'next/link';

const Detail = ({ data }) => {
  const [post, setPost] = useState(data);
  const [liked, setLiked] = useState(false);
  const [users, setUsers] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  const videoRef = useRef();
  const router = useRouter();
  const { id } = router.query;
  const { userProfile } = useAuthStore();

  const onVideoClick = () => {
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };
  // useEffect(() => {
  //   if (post) {
  //     videoRef.current.muted = videoMuted;
  //   }
  // }, [videoMuted]);

  const fetchDetails = async () => {
    const data = await fetcher(`http://localhost:3000/api/post/${id}`);
    setPost(data);
  };
  useEffect(() => {
    fetchDetails();
  }, []);

  const like = async () => {
    await fetch(`http://localhost:3000/api/post/${post._id}`, {
      method: 'PUT',
      body: JSON.stringify({ userId: post.userId }),
    });
    fetchDetails();
  };

  useEffect(() => {
    const allUsers = async () => {
      const res = await fetcher('http://localhost:3000/api/auth');
      setUsers(res);
    };
    allUsers();
  }, []);
  console.log(post, id);
  return (
    <>
      {post && (
        <div className='flex w-full absolute left-0 top-0 bg-white'>
          <div className='relative flex-2 w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover'>
            <div className='opacity-90 absolute top-6 left-6 flex gap-6 z-50'>
              <p className='cursor-pointer ' onClick={() => router.back()}>
                <MdOutlineCancel className='text-white text-[40px]' />
              </p>
              <div className='mt-1'>
                <Image
                  width={34}
                  height={34}
                  className='rounded-full'
                  src='https://cdn.pixabay.com/photo/2021/06/15/12/28/tiktok-6338431_1280.png'
                  alt='logo'
                />
              </div>
            </div>
            <div className='relative'>
              <div className='h-[100vh]'>
                <video
                  ref={videoRef}
                  onClick={onVideoClick}
                  loop
                  src={post && post.video.asset.url}
                  className=' h-full cursor-pointer'
                ></video>
              </div>

              <div className='absolute top-[45%] left-[45%]  cursor-pointer'>
                {!playing && (
                  <button onClick={onVideoClick}>
                    <BsFillPlayFill className='text-white text-9xl' />
                  </button>
                )}
              </div>
            </div>
            <div className='absolute bottom-10 right-10  cursor-pointer'>
              {videoMuted ? (
                <button onClick={() => setVideoMuted(false)}>
                  <HiVolumeOff className='text-white text-4xl' />
                </button>
              ) : (
                <button onClick={() => setVideoMuted(true)}>
                  <HiVolumeUp className='text-white text-4xl' />
                </button>
              )}
            </div>
          </div>
          <div className='relative'>
            <div className='mt-20'>
              <Link href={`/profile/${post.postedBy._id}`}>
                <div className='flex gap-6 mb-4 bg-white w-full pl-10 cursor-pointer'>
                  <Image
                    width={80}
                    height={80}
                    alt='user-profile'
                    className='rounded-full'
                    src={post.postedBy.image}
                  />
                  <div>
                    <p className='text-2xl font-bold tracking-wider flex gap-2 items=center'>
                      {post.postedBy.userName}{' '}
                      <GoVerified className='text-blue-400 text-xl' />
                    </p>
                    <p className='text-xl'> {post.postedBy.userName}</p>
                  </div>
                </div>
              </Link>

              <div className='px-10'>
                <p className=' text-xl text-gray-600'>
                  Pick the real @garyvee .. #1 #2 or #3 .. big shout out to
                  @NeemaNaz and @Ami Kozak
                </p>
              </div>
              <div className='flex gap-6 mt-10 px-10'>
                <div className=' flex gap-3 justify-center items-center'>
                  {post?.likes?.filter(
                    (item) => item.postedBy._id === userProfile.googleId
                  ).length > 0 ? (
                    <div
                      className='bg-primary rounded-full p-4 cursor-pointer'
                      onClick={(e) => {
                        setLiked(false);
                      }}
                    >
                      <MdFavorite
                        className='text-2xl'
                        style={{ color: 'red' }}
                      />
                    </div>
                  ) : (
                    <div
                      className='bg-primary rounded-full p-4 cursor-pointer'
                      onClick={(e) => {
                        like();
                      }}
                    >
                      <MdFavorite className='text-2xl' />
                    </div>
                  )}
                  <p className='text-md font-semibold '>
                    {post.likes ? post.likes?.length : 0}
                  </p>
                </div>
                <div className=' flex gap-3 justify-center items-center'>
                  <div className='bg-primary rounded-full p-4 '>
                    <AiFillMessage className='text-2xl' />
                  </div>
                  <p className='text-md font-semibold '>345</p>
                </div>
                <div className=' flex gap-2 justify-center items-center'>
                  <div className='bg-primary rounded-full p-4 '>
                    <FaShare className='text-3xl' />
                  </div>
                  <p className='text-md font-semibold '>45</p>
                </div>
              </div>
              <Comments
                userId={post.userId}
                postId={post._id}
                comments={post.comments}
                fetchDetails={fetchDetails}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const getServerSideProps = async ({ params: { id } }: any) => {
  const data = await fetcher(`${base_url}/api/post/${id}`);

  return {
    props: { data },
  };
};

export default Detail;
