import { fetchPostsFromFirebase } from '@apis/posts';
import { use } from 'react';
import Posts from './posts';

export const revalidate = 60 * 60;

function PostsPage() {
  const posts = use(fetchPostsFromFirebase());

  return <Posts posts={posts} />;
}

export default PostsPage;
