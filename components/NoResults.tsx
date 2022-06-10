import React from 'react';

interface IProps {
  icon: Element;
  text: string;
}

const NoResults = ({ icon, text }: IProps) => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <p className='text-8xl'>{icon}</p>
      <p className='text-2xl'>{text}</p>
    </div>
  );
};

export default NoResults;
