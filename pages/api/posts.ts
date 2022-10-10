import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  posts: string[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.status(200).json({ posts: ['a', 'b', 'c'] });
}
