import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SuggestedAccounts from './SuggestedAccounts';
import Discover from './Discover';
import Footer from './Footer';
import { NextPage } from 'next';
import useUsersStore from '../../store/usersStore';
import GoogleLogin from 'react-google-login';
import useAuthStore from '../../store/authStore';
import { responseGoogle } from '../../utils';

const Sidebar: NextPage = () => {
  const { pathname } = useRouter();
  const { fetchSuggestedAccounts, suggestedAccounts }: any = useUsersStore();
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
          <p className='text-gray-400'>
            Log in to follow creators, like videos, and view comments.
          </p>
          <div className='px-4'>
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
        fetchSuggestedAccounts={fetchSuggestedAccounts}
        suggestedAccounts={suggestedAccounts}
      />
      <Footer />
    </div>
  );
};

export default Sidebar;
