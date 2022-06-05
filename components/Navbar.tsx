// @ts-nocheck

import Image from 'next/image';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { GoogleLogout, GoogleLogin } from 'react-google-login';
import toast from 'react-hot-toast';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import useAuthStore from '../store/authStore';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const { userProfile, addUser, removeUser, setSearchText } = useAuthStore();

  const responseGoogle = async (response: any) => {
    const { name, googleId, imageUrl } = response.profileObj;
    addUser(response.profileObj);
    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    };

    const res = await fetch('http://localhost:3000/api/auth', {
      method: 'POST',
      body: JSON.stringify(doc),
    });
    const msg = await res.json();
    console.log(msg);
    toast.success(msg);
  };

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search/${searchValue}`);
  };
  return (
    <div className='w-full flex justify-around items-center border-b-2 border-gray-200 p-2'>
      <Link href='/'>
        <Image
          width={118}
          height={30}
          className='cursor-pointer'
          src='data:image/png;base64,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'
          alt='logo'
        />
      </Link>
      <div className='relative'>
        <form onSubmit={handleSearch}>
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className='bg-primary p-3 text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[350px] rounded-full'
            placeholder='Search accounts and videos'
          />
          <button
            onClick={handleSearch}
            className='absolute right-5 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {user ? (
          <div className='flex gap-10'>
            <Link href='/upload'>
              <button className='border-2 px-4 text-md font-semibold flex items-center gap-2'>
                <IoMdAdd className='text-xl' /> Upload
              </button>
            </Link>
            <Link href={`/profile/${user?.googleId}`}>
              <Image
                className='rounded-full cursor-pointer'
                src={user?.imageUrl}
                alt='user'
                width={40}
                height={40}
              />
            </Link>
            <GoogleLogout
              clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
              render={(renderProps) => (
                <button
                  type='button'
                  className=' border-2 p-2 rounded-full cursor-pointer outline-none shadow-md'
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <AiOutlineLogout color='red' fontSize={21} />
                </button>
              )}
              onLogoutSuccess={() => removeUser()}
              cookiePolicy='single_host_origin'
            />
          </div>
        ) : (
          <div>
            <GoogleLogin
              clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
              render={(renderProps) => (
                <button
                  className='bg-red-500 text-xl text-white font-bold p-2 rounded-md w-28 outline-none'
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Log in
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy='single_host_origin'
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
