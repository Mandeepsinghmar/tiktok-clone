// @ts-nocheck

import axios from 'axios';
import { BsEmojiSunglasses } from 'react-icons/bs';
import { FiShoppingBag } from 'react-icons/fi';

export const fetcher = (url) => axios.get(url).then((res) => res.data);

export const topics = [
  {
    name: 'comedy',
    icon: FiShoppingBag,
  },
];

export const base_url = process.env.NEXT_PUBLIC_BASE_URL;
