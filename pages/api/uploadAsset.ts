import type { NextApiRequest, NextApiResponse } from 'next';

import { client } from '../../utils/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const selectedFile = JSON.parse(req.body);

    client.assets
      .upload('file', selectedFile, {
        contentType: selectedFile.type,
        filename: selectedFile.name,
      })
      .then((document) => {
        res.status(200).json(document);
      })
      .catch((error) => {
        console.log('Upload failed:', error.message);
      });
  }
}
