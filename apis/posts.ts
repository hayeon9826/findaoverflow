import { getApiAddress } from 'config/api';
import { PostType } from 'config/interface';

export function getPosts(): Promise<{ posts: PostType[] }> {
  return fetch(getApiAddress('POSTS')).then((res) => res.json());
}
