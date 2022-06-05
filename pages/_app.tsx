// @ts-nocheck

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='2xl:w-[1200px] m-auto'>
      <Navbar />
      <div className='flex gap-20  pt-10'>
        <div className='2xl:w-400 w-14 h-[90vh] 2xl:h-88vh overflow-hidden 2xl:hover:overflow-auto'>
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
