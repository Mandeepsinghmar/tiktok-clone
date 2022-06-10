import React from 'react';

const NoResults = ({ icon, text }: any) => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <p className='text-8xl'>{icon}</p>
      <p className='text-2xl'>{text}</p>
    </div>
  );
};

export default NoResults;
