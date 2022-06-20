import type { NextApiRequest, NextApiResponse } from 'next';
import { uuid } from 'uuidv4';

import { client } from '../../utils/client';

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
  if (req.method === 'PUT') {
    // TODO: This doesn't make sense. You're stringifying the data before sending it, and then you're parsing it. Don't stringify it at all. 
    // TODO: Same for all other files.
    const { userId, postId } = JSON.parse(req.body);

    const data = await client
      .patch(postId)
      .setIfMissing({ likes: [] })
      .insert('after', 'likes[-1]', [
        {
          _key: uuid(),
          _ref: userId,
        },
      ])
      .commit();
    res.status(200).json(data);
  }
}
