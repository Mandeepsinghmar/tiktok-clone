import axios from 'axios';
import sanityClient from '@sanity/client';

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const base_url = process.env.NEXT_PUBLIC_BASE_URL;

export const responseGoogle = async (response: any, addUser: any) => {
  const { name, googleId, imageUrl } = response.profileObj;
  addUser(response.profileObj);
  const doc = {
    _id: googleId,
    _type: 'user',
    userName: name,
    image: imageUrl,
  };

  await fetch(`${base_url}/api/auth`, {
    method: 'POST',
    body: JSON.stringify(doc),
  });
};

export const createPost = async (doc: any) => {
  const res = await fetch(`${base_url}/api/createPost`, {
    method: 'POST',
    body: JSON.stringify(doc),
  });
  const data = await res.json();
  return data;
};
