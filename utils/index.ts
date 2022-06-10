// @ts-nocheck

import axios from 'axios';

export const fetcher = (url) => axios.get(url).then((res) => res.data);

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
