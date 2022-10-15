import { db } from 'config/firebase';
import { PostType } from 'config/interface';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
} from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  posts: PostType[];
};

const DEFAULT_POSTS_FETCH_COUNT = 20;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'GET') {
    const { count, ts } = req.query;

    const timestamp: Timestamp = ts
      ? Timestamp.fromMillis(Number(ts) * 1000)
      : Timestamp.fromDate(new Date(2099, 12, 31));

    const docs = await getDocs(
      query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc'),
        startAfter(timestamp),
        limit(count ? Number(count) : DEFAULT_POSTS_FETCH_COUNT),
      ),
    ).then(({ docs }) => docs);

    const posts = docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as PostType[];

    res.status(200).json({ posts });
  }

  res.status(400);
  res.end();
}
