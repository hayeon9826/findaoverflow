'use client';

import { getApiAddress } from 'config/api';
import { PostType } from 'config/interface';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { apiInstance } from 'utils/axios';
import { useIntersection } from 'utils/use-intersection';

interface Props {
  posts: PostType[];
}
function Posts({ posts }: Props) {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, isError } =
    useInfiniteQuery(
      'posts',
      async ({ pageParam = 0 }): Promise<{ posts: PostType[] }> => {
        return apiInstance
          .get(getApiAddress('POSTS'), {
            params: { count: 5, ts: pageParam > 0 ? pageParam : null },
          })
          .then((res) => res.data);
      },
      {
        getNextPageParam: (lastPage) =>
          lastPage.posts.length > 0
            ? lastPage.posts[lastPage.posts.length - 1].createdAt._seconds
            : undefined,
        staleTime: 60 * 1000,
        initialData: {
          pageParams: [0],
          pages: [{ posts }],
        },
      },
    );
  const [setIntersectionRef, isVisible, resetVisible] = useIntersection({
    rootMargin: '200px',
  });

  useEffect(() => {
    if (isVisible) {
      fetchNextPage().then(() => {
        resetVisible();
      });
    }
  }, [isVisible]);

  if (data && data.pages?.length === 0) {
    return (
      <>
        <div className="mt-20 flex w-full flex-wrap rounded border p-8 py-8 md:flex-nowrap">
          <div className="md:grow">
            <h2 className="mb-2 text-xl font-medium text-gray-900">
              게시글이 없습니다.
            </h2>
            <p className="leading-relaxed">첫번째 게시글을 작성해주세요!</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="-my-8 flex flex-wrap">
        {data?.pages?.map(({ posts }) =>
          posts.map((post: PostType) => (
            <div key={post.id} className="p-4 md:w-1/2">
              <div className="h-full overflow-hidden rounded-lg border-2 border-gray-200">
                <img
                  className="w-full object-cover object-center md:h-36 lg:h-48"
                  src="https://dummyimage.com/720x400"
                  alt="blog"
                />
                <div className="p-6">
                  <h2 className="mb-1 text-xs font-medium tracking-widest text-gray-400">
                    {post?.category || 'CATEGORY'}
                  </h2>
                  <h1 className="mb-3 h-8 text-lg font-medium text-gray-900">
                    {post.title.substring(0, 33) || '제목이 없습니다.'}
                  </h1>
                  <p className="mb-3 h-20 overflow-hidden text-clip leading-relaxed">
                    {post?.content?.substring(0, 100)}
                  </p>
                  <div className="flex flex-wrap items-center ">
                    <Link href={`/posts/${post?.id}`}>
                      <span className="inline-flex items-center text-blue-600 md:mb-2 lg:mb-0">
                        더보기
                        <svg
                          className="ml-2 h-4 w-4"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </span>
                    </Link>
                    <span className="mr-3 ml-auto inline-flex items-center border-r-2 border-gray-200 py-1 pr-3 text-sm leading-none text-gray-400 md:ml-0 lg:ml-auto">
                      <svg
                        className="mr-1 h-4 w-4"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      1.2K
                    </span>
                    <span className="inline-flex items-center text-sm leading-none text-gray-400">
                      <svg
                        className="mr-1 h-4 w-4"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                      6
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )),
        )}
      </div>
      <div ref={setIntersectionRef}>
        {isFetchingNextPage && !isError ? (
          <>
            <div
              role="status"
              className="w-full mx-auto flex justify-center mt-20"
            >
              <svg
                aria-hidden="true"
                className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-400 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </>
        ) : (
          <div className="w-full mx-auto flex justify-center mt-20 text-sm text-gray-500">
            문제가 발생했습니다. 다시 시도해주세요.
          </div>
        )}
      </div>
    </>
  );
}

export default Posts;
