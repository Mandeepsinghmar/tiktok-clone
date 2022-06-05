// @ts-nocheck

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Navbar />
      <div className='flex gap-20 2xl:w-1600 m-auto pt-10'>
        <div className='2xl:w-400 w-14 h-88vh overflow-hidden hover:overflow-auto'>
          <Sidebar />
        </div>
        <div className='flex flex-col gap-10 overflow-auto h-88vh videos flex-1'>
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}

export default MyApp;
