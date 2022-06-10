// @ts-nocheck

import React, { useEffect } from 'react';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import Image from 'next/image';

const SuggestedAccounts = ({ fetchSuggestedAccounts, suggestedAccounts }) => {
  useEffect(() => {
    fetchSuggestedAccounts();
  }, []);

  const users = suggestedAccounts
    .sort(() => 0.5 - Math.random())
    .slice(0, suggestedAccounts.length);

  return (
    <div className='xl:border-b-2 border-gray-200 pb-4'>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
        Suggested accounts
      </p>
      <div>
        {users?.slice(0, 6).map((user) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
              <Image
                width={34}
                height={34}
                className='rounded-full'
                src={user.image}
                alt='user-profile'
              />

              <div className='hidden xl:block'>
                <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                  {user.userName.replace(/\s+/g, '')}{' '}
                  <GoVerified className='text-blue-400' />
                </p>
                <p className='capitalize text-gray-400 text-xs'>
                  {user.userName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedAccounts;
