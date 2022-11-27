import { fetchPostsFromFirebase } from '@apis/posts';
import { use } from 'react';
import Posts from './posts';

function PostsPage() {
  const posts = use(fetchPostsFromFirebase());

  return <Posts posts={posts} />;
}

export default PostsPage;
