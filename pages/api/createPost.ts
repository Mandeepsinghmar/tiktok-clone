import type { NextApiRequest, NextApiResponse } from 'next';

import { client } from '../../utils/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const doc = JSON.parse(req.body);

    client
      .create(doc)
      .then(() => {})
      .then(() => {
        res.status(200).json('video created');
      });
  }
}
