import type { NextApiRequest, NextApiResponse } from 'next';

import { client } from '../../utils/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const file = req.body;
    console.log(file);
    const data = await client.assets.upload('file', file, {
      contentType: file.type,
      filename: file.name,
    });
    console.log(data);
    // client.create(data).then(() => {
    // res.status(200).json('video created');
    // });
  }
}
