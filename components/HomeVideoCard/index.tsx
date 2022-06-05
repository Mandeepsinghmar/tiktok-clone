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
        <Link href={`/profile/${post.postedBy._id}`}>
          <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
            <Image
              width={80}
              height={80}
              className='w-20 h-20 rounded-full'
              src={post.postedBy.image}
              alt='user-profile'
            />
            <div>
              <div className='flex items-center gap-1'>
                <p className='flex gap-1 items-center text-2xl font-bold text-primary'>
                  {post.postedBy.userName}{' '}
                  <GoVerified className='text-blue-400' />
                </p>
                <p className='capitalize text-gray-400 text-lg'>
                  {post.postedBy.userName}
                </p>
              </div>
              <p className='mt-2'>{post.caption}</p>
            </div>
          </div>
        </Link>
      </div>

      <div className='ml-24 flex gap-4 relative'>
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Link href={`/detail/${post._id}`}>
            <video
              loop
              ref={videoRef}
              src={post?.video.asset.url}
              className='w-400 h-600 rounded-xl cursor-pointer'
            ></video>
          </Link>

          {isHover && (
            <div className='absolute bottom-6 cursor-pointer flex justify-between w-400 p-3'>
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className='text-white text-4xl' />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className='text-white text-4xl' />
                </button>
              )}
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
          )}
        </div>

        <div className='self-end'>
          <VideoSidebar post={post} />
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
