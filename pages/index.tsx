import { Layout } from 'components/index';
import { db } from 'config/firebase';
import { BoardType, PostType } from 'config/interface';
import * as dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { collection, limit, orderBy, query } from 'firebase/firestore';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useFirestoreQuery } from 'utils/index';
dayjs.locale('ko');

const Home: NextPage = () => {
  const { data: session } = useSession();
  const boards = useFirestoreQuery(
    query(collection(db, 'boards'), orderBy('createdAt', 'desc'), limit(5)),
  );
  const posts = useFirestoreQuery(
    query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(6)),
  );

  return (
    <Layout>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-8 text-center lg:px-20">
        {session && session.user?.id ? (
          <>
            <section className="container mx-auto mt-12 max-w-3xl pb-24 text-left">
              <h2 className="m-auto flex max-w-3xl justify-between px-4 text-3xl font-bold">
                핀다 Tech 포스트
                {posts && posts.length > 0 && (
                  <Link href="/posts">
                    <a className="text-base font-semibold text-blue-600">
                      더보기
                    </a>
                  </Link>
                )}
              </h2>
              <button
                onClick={async () => {
                  fetch('/api/posts').then((res) => console.log(res.json()));
                }}
              >
                Test!!
              </button>
              <div className="container mx-auto mt-12 pb-24 text-left">
                <div className="-my-8 flex flex-wrap">
                  {posts && posts.length > 0 ? (
                    posts.map((post: PostType) => (
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
                              {post.title.substring(0, 33) ||
                                '제목이 없습니다.'}
                            </h1>
                            <div
                              className="mb-3 h-20 overflow-hidden text-clip leading-relaxed"
                              dangerouslySetInnerHTML={{
                                __html: post?.content.substring(0, 100),
                              }}
                            />
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
                      <div className="mt-20 flex w-full flex-wrap rounded border p-8 py-8 md:flex-nowrap">
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
            <section className="container mx-auto mt-12 max-w-3xl px-4 pb-24 text-left">
              <h2 className="m-auto flex max-w-3xl justify-between text-3xl font-bold">
                핀다 Tech 이야기
                {boards && boards.length > 0 && (
                  <Link href="/boards">
                    <a className="text-base font-semibold text-blue-600">
                      더보기
                    </a>
                  </Link>
                )}
              </h2>
              <div className="container mx-auto mt-12 max-w-3xl pb-24">
                <div className="-my-8 divide-y-2 divide-gray-100">
                  {boards && boards.length > 0 ? (
                    boards?.map((board: BoardType) => (
                      <div
                        className="flex flex-wrap py-8 md:flex-nowrap "
                        key={board?.id}
                      >
                        <div className="md:grow">
                          <h2 className="mb-2 text-2xl font-medium text-gray-900">
                            {board?.title?.substring(0, 100)}
                          </h2>
                          <p className="text-xs leading-relaxed">
                            {dayjs
                              .unix(board?.createdAt?.seconds)
                              .format('YYYY-MM-DD HH:MM:ss')}
                          </p>
                          <p className="leading-relaxed">
                            {board?.content?.substring(0, 200)}
                          </p>
                          <Link href={`/boards/${board?.id}`}>
                            <a className="mt-4 inline-flex items-center text-blue-600">
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
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="mt-20 flex w-full flex-wrap rounded border p-8 py-8 md:flex-nowrap">
                      <div className="md:grow">
                        <h2 className="mb-2 text-xl font-medium text-gray-900">
                          게시글이 없습니다.
                        </h2>
                        <p className="leading-relaxed">
                          첫번째 게시글을 작성해주세요!
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="bg-white px-4">
              <div className="container mx-auto flex flex-col items-center px-4 py-12 text-center">
                <h2 className="text-3xl font-semibold tracking-tight text-gray-700 sm:text-4xl ">
                  findaoverflow
                </h2>
                <h3 className="mt-2 text-lg text-gray-500">
                  로그인 후 이용하실 수 있습니다.
                </h3>

                <div className="mt-6 sm:-mx-2">
                  <div className="inline-flex w-full sm:mx-2 sm:w-auto">
                    <Link href="/users/login">
                      <a
                        href="#"
                        className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                      >
                        핀다 로그인
                      </a>
                    </Link>
                  </div>

                  <div className="mt-4 inline-flex w-full sm:mx-2 sm:mt-0 sm:w-auto">
                    <Link href="/users/register">
                      <a
                        href="#"
                        className="inline-flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2 text-gray-700 transition-colors duration-150 hover:bg-gray-100  focus:ring  focus:ring-gray-200  focus:ring-opacity-80 sm:w-auto"
                      >
                        회원가입
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </Layout>
  );
};

export default Home;
