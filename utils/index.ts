// @ts-nocheck

import axios from 'axios';

export const fetcher = (url) => axios.get(url).then((res) => res.data);

export const topics = [
'comedy', 'gaming', 'food', 'dance', 'beauty', 'animals', 'sports'
];
