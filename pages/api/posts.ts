import { getFirebaseAdmin } from 'config/firebaseAdmin';
import { PostType } from 'config/interface';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
type Data = {
  posts?: PostType[];
  error?: string;
};

const DEFAULT_POSTS_FETCH_COUNT = 20;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const admin = getFirebaseAdmin();
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
    const timestamp = ts
      ? admin.firestore.Timestamp.fromMillis(Number(ts) * 1000)
      : admin.firestore.Timestamp.fromDate(new Date(2099, 12, 31));

    const data = await admin
      .firestore()
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .startAfter(timestamp)
      .limit(count ? Number(count) : DEFAULT_POSTS_FETCH_COUNT)
      .get();

    const posts = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as PostType[];

    res.status(200).json({ posts });
  }

  res.status(400);
  res.end();
}
