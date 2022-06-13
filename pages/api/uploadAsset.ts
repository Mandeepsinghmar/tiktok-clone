import type { NextApiRequest, NextApiResponse } from 'next';

import { client } from '../../utils/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    console.log(req);
    // const data = await client.assets.upload('file', doc, {
    //   contentType: doc.type,
    //   filename: doc.name,
    // });
    // console.log(data);
    // res.status(200).json(data);
  }
}
