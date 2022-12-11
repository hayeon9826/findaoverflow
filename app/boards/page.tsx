'use client';
import { useCallback } from 'react';
import { db } from 'config/firebase';
import Link from 'next/link';
import { collection, orderBy, query } from 'firebase/firestore';
import { useFirestoreQuery } from 'utils/index';
import { BoardType } from 'config/interface';
import { useRouter } from 'next/navigation';
import * as dayjs from 'dayjs';

function BoardsPage() {
  const router = useRouter();
  const boards = useFirestoreQuery(
    query(collection(db, 'boards'), orderBy('createdAt', 'desc')),
  );

  const handleClick = useCallback(() => {
    router.push('/boards/new');
  }, []);

  return (
    <section className="container mx-auto mt-12 max-w-3xl px-4 pb-24 text-left">
      <h2 className="flex max-w-3xl justify-between text-3xl font-bold">
        핀다 Tech 이야기
        <button
          type="button"
          onClick={handleClick}
          className="mr-2 mb-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          이야기 작성
        </button>
      </h2>
      <div className="container mx-auto mt-12 max-w-3xl pb-24">
        <div className="-my-8 divide-y-2 divide-gray-100">
          {boards && boards.length > 0 ? (
            boards?.map((board: BoardType) => (
              <div
                className="flex flex-wrap py-8 md:flex-nowrap"
                key={board?.id}
              >
                <div className="md:grow">
                  <h2 className="mb-2 text-2xl font-medium text-gray-900">
                    {board?.title?.substring(0, 100)}
                  </h2>
                  <p className="text-xs leading-relaxed">
                    {dayjs
                      .unix(board?.createdAt?._seconds)
                      .format('YYYY-MM-DD HH:MM:ss')}
                  </p>
                  <p className="leading-relaxed">
                    {board?.content?.substring(0, 200)}
                  </p>
                  <Link href={`/boards/${board?.id}`}>
                    <span className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700">
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
                </div>
              </div>
            ))
          ) : (
            <div className="mt-20 flex w-full flex-wrap rounded border p-8 py-8 md:flex-nowrap">
              <div className="md:grow">
                <h2 className="mb-2 text-xl font-medium text-gray-900">
                  게시글이 없습니다.
                </h2>
                <p className="leading-relaxed">첫번째 게시글을 작성해주세요!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default BoardsPage;
