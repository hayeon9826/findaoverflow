import { PostType } from 'config/interface';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { fetchPostsFromFirebase } from '../../apis/posts';
type Data = {
  posts?: PostType[];
  error?: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'GET') {
    const { count, ts } = req.query;

    const posts: PostType[] = await fetchPostsFromFirebase({
      count: count ? Number(count) : undefined,
      ts: ts ? Number(ts) : undefined,
    });

    res.status(200).json({ posts });
  }

  res.status(400);
  res.end();
}
