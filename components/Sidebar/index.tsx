import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SuggestedAccounts from './SuggestedAccounts';
import Discover from './Discover';
import Footer from './Footer';
import { NextPage } from 'next';
import useUsersStore from '../../store/usersStore';

const Sidebar: NextPage = () => {
  const { pathname } = useRouter();
  const { fetchSuggestedAccounts, suggestedAccounts } = useUsersStore();

  const activeLink =
    'flex gap-3 hover:bg-primary p-3 cursor-pointer font-semibold text-red-500 rounded';

  const normalLink =
    'flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded';

  return (
    <div className='flex-col justify-start mb-10 '>
      <div className='border-b-2 border-gray-200 pb-4'>
        <Link href='/'>
          <p className={pathname === '/' ? activeLink : normalLink}>
            <AiFillHome className='text-4xl' />
            <span className='capitalize text-2xl hidden 2xl:block'>
              For You
            </span>
          </p>
        </Link>
      </div>

      <SuggestedAccounts
        fetchSuggestedAccounts={fetchSuggestedAccounts}
        suggestedAccounts={suggestedAccounts}
      />
      <Discover />
      <Footer />
    </div>
  );
};

export default Sidebar;
