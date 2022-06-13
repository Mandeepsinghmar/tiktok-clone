import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import useUsersStore from '../store/usersStore';
import NoResults from './NoResults';
import { IUser, SuggestedAccountsState } from '../types';

interface IProps {
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: any) => void;
  comments: IComment[];
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref: string };
}

const Comments = ({ comment, setComment, addComment, comments }: IProps) => {
  const { suggestedAccounts }: SuggestedAccountsState = useUsersStore();

  return (
    <div className='border-t-2 border-gray-200 pt-4 pl-10 mt-4 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]'>
      <div className='overflow-scroll lg:h-[457px]'>
        {comments?.length > 0 ? (
          comments?.map((item: IComment, idx: number) => (
            <>
              {suggestedAccounts?.map(
                (user: IUser) =>
                  user._id === item.postedBy._ref && (
                    <div className='flex gap-3 p-2' key={idx}>
                      <Link href={`/profile/${user._id}`}>
                        <Image
                          width={60}
                          height={60}
                          className='rounded-full cursor-pointer'
                          // @ts-ignore
                          src={user.image}
                          alt='user-profile'
                        />
                      </Link>
                      <div>
                        <div className='flex items-center gap-1'>
                          <Link href={`/profile/${user._id}`}>
                            <p className='flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-primary'>
                              {user.userName}{' '}
                              <GoVerified className='text-blue-400' />
                            </p>
                          </Link>
                        </div>
                        <p className='mt-2 text-[16px'>{item.comment}</p>
                      </div>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <NoResults text='No Comments Yet! Be First to do add the comment.' />
        )}
      </div>
      <div className='absolute bottom-0 left-0  pb-6 px-10 '>
        <form onSubmit={addComment} className='flex gap-4'>
          <input
            value={comment}
            // @ts-ignore
            onChange={(e) => setComment(e.target.value)}
            className='bg-primary px-6 py-4 text-md font-medium border-2 w-[330px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'
            placeholder='Add comment..'
          />
          <button className='text-md text-gray-400 ' onClick={addComment}>
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;
