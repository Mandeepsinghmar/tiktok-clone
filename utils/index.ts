// @ts-nocheck

import axios from 'axios';

export const fetcher = (url) => axios.get(url).then((res) => res.data);

export const topics = [
  {
    name: 'cars',
  },
  {
    name: 'fitness',
  },
  {
    name: 'wallpaper',
  },
  {
    name: 'websites',
  },
  {
    name: 'photo',
  },
  {
    name: 'food',
  },
  {
    name: 'nature',
  },
  {
    name: 'art',
  },
  {
    name: 'travel',
  },
  {
    name: 'quotes',
  },
  {
    name: 'cats',
  },
  {
    name: 'dogs',
  },
  {
    name: 'others',
  },
];
