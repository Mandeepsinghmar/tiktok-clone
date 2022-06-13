import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='xl:w-[1200px] m-auto overflow-hidden h-[100vh]'>
      <Navbar />
      <div className='flex gap-6 md:gap-20 '>
        <div className='xl:w-400 w-20 h-[92vh] overflow-hidden xl:hover:overflow-auto '>
          <Sidebar />
        </div>
        <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1'>
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}

export default MyApp;
