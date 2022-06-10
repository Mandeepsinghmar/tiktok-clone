// @ts-nocheck

import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';

import VideoSidebar from './VideoSidebar';
import useAuthStore from '../../store/authStore';
import { client } from '../../utils/client';
import { uuid } from 'uuidv4';
import { fetcher } from '../../utils';

const VideoCard: NextPage = ({ post, posts, setPosts }: any) => {
  const [playing, setPlaying] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  const [users, setUsers] = useState([]);
  const videoRef = useRef(null);

  const onVideoPress = () => {
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };
  useEffect(() => {
    videoRef.current.muted = videoMuted;
  }, [videoMuted]);

  return (
    <div className=' flex flex-col border-b-2 border-gray-200 pb-6'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded '>
          <div className='md:w-16 md:h-16 w-10 h-10'>
            <Link href={`/profile/${post.postedBy._id}`}>
              <Image
                width={62}
                height={62}
                className=' rounded-full'
                src={post.postedBy.image}
                alt='user-profile'
                layout='responsive'
              />
            </Link>
          </div>
          <div>
            <Link href={`/profile/${post.postedBy._id}`}>
              <div className='flex items-center gap-1 w-28 md:w-72'>
                <p className='flex md:gap-1 items-center md:text-md font-bold text-primary'>
                  {post.postedBy.userName}{' '}
                  <GoVerified className='text-blue-400 text-md' />
                </p>
                <p className='capitalize font-medium text-xs text-gray-500'>
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
            <Link href={`/detail/${post._id}`}>
              <p className='mt-2 font-normal '>{post.caption}</p>
            </Link>
          </div>
        </div>
      </div>

      <div className='lg:ml-24 ml-10 flex gap-4 relative'>
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Link href={`/detail/${post._id}`}>
            <video
              loop
              ref={videoRef}
              src={post?.video.asset.url}
              className='w-[295px] h-[340px] lg:h-[528px] rounded-xl cursor-pointer'
            ></video>
          </Link>

          {isHover && (
            <div className='absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] lg:w-[283px] p-3'>
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className='text-white text-2xl lg:text-4xl' />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className='text-white text-2xl lg:text-4xl' />
                </button>
              )}
              {videoMuted ? (
                <button onClick={() => setVideoMuted(false)}>
                  <HiVolumeOff className='text-white text-2xl lg:text-4xl' />
                </button>
              ) : (
                <button onClick={() => setVideoMuted(true)}>
                  <HiVolumeUp className='text-white text-2xl lg:text-4xl' />
                </button>
              )}
            </div>
          )}
        </div>

        <div className='self-end mr-2'>
          <VideoSidebar post={post} />
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
