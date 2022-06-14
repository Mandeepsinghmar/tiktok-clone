import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import GoogleLogin from 'react-google-login';
import { AiFillHome } from 'react-icons/ai';

import SuggestedAccounts from './SuggestedAccounts';
import Discover from './Discover';
import Footer from './Footer';
import useUsersStore from '../../store/usersStore';
import useAuthStore from '../../store/authStore';
import { responseGoogle } from '../../utils';
import { IUser } from '../../types';

interface IProps {
  fetchSuggestedAccounts?: () => void;
  suggestedAccounts?: IUser[];
}

const Sidebar: NextPage = () => {
  const { pathname } = useRouter();
  const { fetchSuggestedAccounts, suggestedAccounts }: IProps = useUsersStore();
  const { addUser, userProfile } = useAuthStore();

  const activeLink =
    'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-red-500 rounded';

  const normalLink =
    'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded';

  return (
    <div className='flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3 '>
      <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
        <Link href='/'>
          <div className={pathname === '/' ? activeLink : normalLink}>
            <p className='text-2xl'>
              <AiFillHome />
            </p>
            <span className='capitalize text-xl hidden xl:block'>For You</span>
          </div>
        </Link>
      </div>
      {!userProfile && (
        <div className='px-2 py-4 hidden xl:block'>
          <p className='text-gray-400'>Log in to like and comment on videos.</p>
          <div className='pr-4'>
            <GoogleLogin
              clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
              render={(renderProps) => (
                <button
                  className='bg-white text-lg text-red-500 border-[1px] border-red-500 font-semibold px-6 py-3 rounded-md outline-none w-full mt-3'
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Log in
                </button>
              )}
              onSuccess={(res) => responseGoogle(res, addUser)}
              onFailure={(res) => responseGoogle(res, addUser)}
              cookiePolicy='single_host_origin'
            />
          </div>
        </div>
      )}

      <Discover />
      <SuggestedAccounts
        // @ts-ignore
        fetchSuggestedAccounts={fetchSuggestedAccounts}
        // @ts-ignore
        suggestedAccounts={suggestedAccounts}
      />
      <Footer />
    </div>
  );
};

export default Sidebar;
