import { PostType } from 'config/interface';
import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchPostByIdFromFirebase } from '@apis/posts';
type Data = {
  post?: PostType;
  error?: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'GET') {
    const { id } = req.query;

    if (id && typeof id === 'string') {
      const post: PostType = await fetchPostByIdFromFirebase({
        id,
      });
      res.status(200).json({ post });
    }
    res.status(400);
    res.end();
  }
}
