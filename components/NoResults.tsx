import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';

interface IProps {
  text: string;
}

const NoResults = ({ text }: IProps) => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <p className='text-8xl'>
        <AiOutlineUser />
      </p>
      <p className='text-2xl'>{text}</p>
    </div>
  );
};

export default NoResults;
