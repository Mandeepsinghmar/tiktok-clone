import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { GoVerified } from 'react-icons/go';

import VideoCard from '../../components/VideoCard';
import useAuthStore from '../../store/authStore';
import useUsersStore from '../../store/usersStore';
import { fetcher } from '../../utils';

const Search = ({ videos }: any) => {
  const [isAccounts, setIsAccounts] = useState(true);
  const { suggestedAccounts } = useUsersStore();
  const router = useRouter();
  const { searchTerm } = router.query;

  const accounts = isAccounts ? 'border-b-2 border-black' : '';
  const isVideos = !isAccounts ? 'border-b-2 border-black' : '';
  const searchedAccounts = suggestedAccounts?.filter((user) =>
    user.userName.toLowerCase().includes(searchTerm)
  );
  return (
    <div className='w-full  '>
      <div className='flex gap-10 mb-10 border-b-2 border-gray-200 fixed bg-white w-full'>
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
        <div>
          {searchedAccounts?.map((user, idx) => (
            <div
              key={idx}
              className='mt-20 flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200'
            >
              <Image
                width={80}
                height={80}
                className='rounded-full'
                alt='user-profile'
                src={user.image}
              />
              <div>
                <div>
                  <p className='flex gap-1 items-center text-2xl font-bold text-primary'>
                    {user.userName} <GoVerified className='text-blue-400' />
                  </p>
                  <p className='capitalize text-gray-400 text-lg'>
                    {user.userName}
                  </p>
                </div>
                <p className='mt-2'>It's my bio</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='mt-20 flex flex-wrap gap-6'>
          {videos?.map((post: any, idx: number) => (
            <VideoCard post={post} key={idx} />
          ))}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({ params: { searchTerm } }: any) => {
  const videos = await fetcher(
    `http://localhost:3000/api/search/${searchTerm}`
  );
  return {
    props: { videos },
  };
};
export default Search;
