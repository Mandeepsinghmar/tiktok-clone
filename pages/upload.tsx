// @ts-nocheck
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import useAuthStore from '../store/authStore';
import { topics } from '../utils';
import { client } from '../utils/client';

const Upload = () => {
  const [caption, setCaption] = useState('');
  const [topic, setTopic] = useState('cars');
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState();
  const [savingPost, setSavingPost] = useState(false);
  const [videoAsset, setVideoAsset] = useState();
  const [wrongFileType, setWrongFileType] = useState(false);

  const { userProfile } = useAuthStore();
  const router = useRouter();

  const uploadVideo = (e) => {
    const selectedFile = e.target.files[0];
    // uploading asset to sanity
    if (
      selectedFile.type === 'video/mp4' ||
      selectedFile.type === 'video/webm' ||
      selectedFile.type === '	video/ogg'
    ) {
      setWrongFileType(false);
      console.log(selectedFile);
      setLoading(true);
      client.assets
        .upload('file', selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((document) => {
          console.log(document);
          setVideoAsset(document);
          // console.log('The image was uploaded!', document);
          setLoading(false);
        })
        .catch((error) => {
          console.log('Upload failed:', error.message);
        });
    } else {
      setLoading(false);
      setWrongFileType(true);
    }
  };
  const handlePost = () => {
    if (caption && videoAsset?._id !== undefined && topic) {
      setSavingPost(true);

      const doc = {
        _type: 'post',
        caption,
        video: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile.googleId,
        postedBy: {
          _type: 'postedBy',
          _ref: userProfile.googleId,
        },
        topic,
      };
      client.create(doc).then(() => {
        setSavingPost(false);
        router.push('/');
      });
    } else {
      setFields(true);

      setTimeout(() => {
        setFields(false);
      }, 2000);
    }
  };

  const handleDiscard = () => {
    setVideoAsset(null);
    setCaption('');
    setTopic('');
  };

  return (
    <div className='flex w-full h-full absolute left-0 top-24 mb-10 border-t-2 border-gray-200 pt-20 bg-[#F8F8F8] justify-center'>
      <div className=' bg-white rounded-lg h-full flex gap-6 p-14 pt-6'>
        <div>
          <div>
            <p className='text-3xl font-bold'>Upload Video</p>
            <p className='text-xl text-gray-400 mt-2'>
              Post a video to your account
            </p>
          </div>
          <div className=' border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center  outline-none mt-10 w-[380px] h-[600px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100'>
            {wrongFileType && (
              <p className='text-center text-3xl text-red-400 font-semibold'>
                Please select an video file (mp4 or webm or ogg)
              </p>
            )}

            {loading ? (
              <p className='text-center text-3xl text-red-400 font-semibold'>
                Upoading...
              </p>
            ) : (
              <div>
                {!videoAsset ? (
                  <label className='cursor-pointer'>
                    <div className='flex flex-col items-center justify-center h-full'>
                      <div className='flex flex-col justify-center items-center'>
                        <p className='font-bold text-2xl'>
                          <FaCloudUploadAlt className='text-gray-340 text-6xl' />
                        </p>
                        <p className='text-2xl font-semibold'>
                          Select video to upload
                        </p>
                      </div>

                      <p className='text-gray-400 text-center mt-10 text-xl leading-10'>
                        MP4 or WebM or ogg <br />
                        720x1280 resolution or higher <br />
                        Up to 10 minutes <br />
                        Less than 2 GB
                      </p>
                      <p
                        type='button'
                        className='bg-red-500 text-center mt-8 rounded text-white text-2xl font-medium p-2 w-60 outline-none'
                      >
                        Select file
                      </p>
                    </div>
                    <input
                      type='file'
                      name='upload-video'
                      onChange={uploadVideo}
                      className='w-0 h-0'
                    />
                  </label>
                ) : (
                  <div className=' w-[380px] rounded-3xl  p-4 flex flex-col justify-center items-center'>
                    <video
                      className='rounded-3xl h-[562px] mt-28 bg-black'
                      controls
                      loop
                      src={videoAsset?.url}
                    />
                    <div className='mt-20 flex justify-between gap-20'>
                      <p className='text-lg'>{videoAsset.originalFilename}</p>
                      <button
                        type='button'
                        className=' rounded-full bg-gray-200 text-red-400 p-2 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                        onClick={() => setVideoAsset(null)}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-3 mt-28'>
          <label className='text-xl font-medium '>Caption</label>
          <input
            type='text'
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className='rounded w-650 outline-none text-2xl sm:text-xl border-2 border-gray-200 p-2'
          />
          <label className='text-xl font-medium '>Choose a topic</label>

          <select
            onChange={(e) => {
              setTopic(e.target.value);
            }}
            className='outline-none w-650 border-2 border-gray-200 text-xl capitalize p-4 rounded cursor-pointer'
          >
            {topics.map((item) => (
              <option
                key={item}
                className=' outline-none capitalize bg-white text-gray-700 text-xl p-2 hover:bg-slate-300'
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
          <div className='flex gap-6 mt-10'>
            <button
              onClick={handleDiscard}
              type='button'
              className='border-gray-300 border-2 text-xl font-medium p-2 rounded w-44 outline-none'
            >
              Discard
            </button>
            <button
              disabled={videoAsset?.url ? false : true}
              onClick={handlePost}
              type='button'
              className='bg-red-500 text-white text-xl font-medium p-2 rounded w-44 outline-none'
            >
              {savingPost ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
