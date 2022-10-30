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
    try {
      const token = await getToken({ req });

      if (!token) {
        throw new Error('토큰 에러');
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return res.status(403).json({ error: '토큰 인증 실패' });
    }

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
