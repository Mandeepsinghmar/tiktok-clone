// @ts-nocheck

import axios from 'axios';

export const fetcher = (url) => axios.get(url).then((res) => res.data);

export const topics = [
  'comedy',
  'gaming',
  'food',
  'dance',
  'beauty',
  'animals',
  'sports',
];

export const base_url = process.env.NEXT_PUBLIC_BASE_URL;
