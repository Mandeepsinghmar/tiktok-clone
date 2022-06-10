// @ts-nocheck

import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { GoVerified } from 'react-icons/go';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';

import NoResults from '../../components/NoResults';
import VideoCard from '../../components/VideoCard';
import useUsersStore from '../../store/usersStore';
import { fetcher, base_url } from '../../utils';
import Link from 'next/link';

const Search = ({ videos }: any) => {
  const [isAccounts, setIsAccounts] = useState(true);
  const { suggestedAccounts } = useUsersStore();
  const router = useRouter();
  const { searchTerm } = router.query;

  const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  const searchedAccounts = suggestedAccounts?.filter((user) =>
    user.userName.toLowerCase().includes(searchTerm)
  );
  console.log(videos);
  return (
    <div className='w-full  '>
      <div className='flex gap-10 mb-10 border-b-2 border-gray-200 md:fixed z-50 bg-white w-full'>
        <p
          onClick={() => setIsAccounts(true)}
          className={`text-xl  font-semibold cursor-pointer ${accounts} mt-2`}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer ${isVideos} mt-2`}
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div className='md:mt-16'>
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user, idx) => (
              <Link key={idx} href={`/profile/${user._id}`}>
                <div className=' flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200'>
                  <div>
                    <Image
                      width={50}
                      height={50}
                      className='rounded-full'
                      alt='user-profile'
                      src={user.image}
                    />
                  </div>
                  <div>
                    <div>
                      <p className='flex gap-1 items-center text-lg font-bold text-primary'>
                        {user.userName} <GoVerified className='text-blue-400' />
                      </p>
                      <p className='capitalize text-gray-400 text-sm'>
                        {user.userName}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults
              icon={<AiOutlineUser />}
              text={`No Account Results for ${searchTerm}`}
            />
          )}
        </div>
      ) : (
        <div className='md:mt-16 flex flex-wrap gap-6 justify-center '>
          {videos.length > 0 ? (
            videos.map((post: any, idx: number) => (
              <VideoCard post={post} key={idx} />
            ))
          ) : (
            <NoResults
              icon={<BsFillCameraVideoFill />}
              text={`No Video Results for ${searchTerm}`}
            />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({ params: { searchTerm } }: any) => {
  const videos = await fetcher(`${base_url}/api/search/${searchTerm}`);
  return {
    props: { videos },
  };
};
export default Search;
