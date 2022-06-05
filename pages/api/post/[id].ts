import type { NextApiRequest, NextApiResponse } from 'next';

import { postDetailQuery } from './../../../utils/queries';
import { client } from '../../../utils/client';
import { uuid } from 'uuidv4';

// type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const query = postDetailQuery(req.query.id);
    const data = await client.fetch(query);
    console.log(data);
    res.status(200).json(data[0]);
  } else if (req.method === 'PUT') {
    const { comment, userId } = JSON.parse(req.body);
    const { id } = req.query;

    if (comment) {
      await client
        .patch(id)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [
          {
            comment,
            _key: uuid(),
            postedBy: { _type: 'postedBy', _ref: userId },
          },
        ])
        .commit();

      const query = postDetailQuery(req.query.id);

      const data = await client.fetch(query);
      console.log(data);
      res.status(200).json(data[0]);
    } else {
      await client
        .patch(id)
        .setIfMissing({ likes: [] })
        .insert('after', 'likes[-1]', [
          {
            _key: uuid(),
            userId,
            postedBy: {
              _type: 'postedBy',
              _ref: userId,
            },
          },
        ])
        .commit();
      const query = postDetailQuery(req.query.id);
      const data = await client.fetch(query);
      console.log(data);
      res.status(200).json(data[0]);
    }
  }
}
