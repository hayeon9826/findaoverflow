import { getApiAddress } from 'config/api';
import { getFirebaseAdmin } from 'config/firebaseAdmin';
import { PostType } from 'config/interface';
import { apiInstance } from 'utils/axios';

const DEFAULT_POSTS_FETCH_COUNT = 5;
interface Props {
  count?: number;
  ts?: number;
}
export function getPosts({ count = 10, ts }: Props = {}): Promise<{
  posts: PostType[];
}> {
  return apiInstance
    .get(getApiAddress('POSTS'), { params: { count, ts } })
    .then((res) => res.data);
}

export async function fetchPostsFromFirebase({
  count = DEFAULT_POSTS_FETCH_COUNT,
  ts,
}: Props = {}): Promise<PostType[]> {
  const admin = getFirebaseAdmin();

  const timestamp = ts
    ? admin.firestore.Timestamp.fromMillis(Number(ts) * 1000)
    : admin.firestore.Timestamp.fromDate(new Date(2099, 12, 31));

  const data = await admin
    .firestore()
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .startAfter(timestamp)
    .limit(count)
    .get();

  const posts = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as PostType[];

  return posts;
}

interface FetchPost {
  id: string;
}
export async function fetchPostByIdFromFirebase({
  id,
}: FetchPost): Promise<PostType> {
  const admin = getFirebaseAdmin();

  const result = await admin.firestore().collection('posts').doc(id).get();

  return result.data() as PostType;
}
