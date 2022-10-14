import { useCallback } from 'react';
import { db } from 'config/firebase';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { collection, orderBy, query } from 'firebase/firestore';
import { useFirestoreQuery } from 'utils/index';
import { PostType } from 'config/interface';
import { Layout } from 'components/index';
import * as dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

function PostsPage() {
  const router = useRouter();
  const posts = useFirestoreQuery(
    query(collection(db, 'posts'), orderBy('createdAt', 'desc')),
  );

  const handleClick = useCallback(() => {
    router.push('/posts/new');
  }, []);

  return (
    <Layout className="flex min-h-screen justify-center">
      <section className="container mx-auto mt-12 max-w-3xl pb-24 text-left">
        <h2 className="flex max-w-3xl justify-between text-3xl font-bold px-4">
          핀다 Tech 포스트
          <button
            type="button"
            onClick={handleClick}
            className="mr-2 mb-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            포스트 작성
          </button>
        </h2>
        <div className="container mx-auto mt-12 pb-24 text-left">
          <div className="-my-8 flex flex-wrap">
            {posts && posts.length > 0 ? (
              posts?.map((post: PostType) => (
                <div className="p-4 md:w-1/2" key={post?.id}>
                  <div className="h-full overflow-hidden rounded-lg border-2 border-gray-200 border-opacity-60">
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
                        {post?.title?.substring(0, 33) || '제목이 없습니다.'}
                      </h1>
                      <p className="mb-3 h-20 overflow-hidden text-clip leading-relaxed">
                        {post?.content?.substring(0, 100)}
                      </p>
                      <div className="flex flex-wrap items-center ">
                        <Link href={`/posts/${post?.id}`}>
                          <a className="inline-flex items-center text-blue-600 md:mb-2 lg:mb-0">
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
                          </a>
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
              ))
            ) : (
              <>
                <div className="mt-20 flex w-[100%] flex-wrap rounded border p-8 py-8 md:flex-nowrap">
                  <div className="md:grow">
                    <h2 className="mb-2 text-xl font-medium text-gray-900">
                      게시글이 없습니다.
                    </h2>
                    <p className="leading-relaxed">
                      첫번째 게시글을 작성해주세요!
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default PostsPage;
