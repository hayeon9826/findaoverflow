import { useQuery } from "react-query";

const fetchPosts = async () => {
  const parsed = await fetch("/posts");
  return await parsed.json();
};

const usePosts = (limit: number) => {
  return useQuery(["posts", limit], () => fetchPosts());
};

export { usePosts, fetchPosts };
