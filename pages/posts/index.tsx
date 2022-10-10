import { db } from 'config/firebase';
import Link from 'next/link';
import { collection, orderBy, query } from 'firebase/firestore';
import { useFirestoreQuery } from 'utils/index';
import { postType } from 'config/interface';
import { Layout } from 'components/index';
import * as dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

function PostsPage() {
  const posts = useFirestoreQuery(
    query(collection(db, 'posts'), orderBy('createdAt', 'desc')),
  );

  return (
    <Layout>
      <section className="body-font mt-12 overflow-hidden px-8 text-gray-600 lg:px-20">
        <h2 className="flex max-w-3xl justify-between text-3xl font-bold">
          핀다 Tech 이야기
        </h2>
        <div className="container mx-auto mt-12 max-w-3xl pb-24">
          <div className="-my-8 divide-y-2 divide-gray-100">
            {posts?.map((post: postType) => (
              <div
                className="flex flex-wrap py-8 md:flex-nowrap"
                key={post?.id}
              >
                <div className="md:grow">
                  <h2 className="title-font mb-2 text-2xl font-medium text-gray-900">
                    {post?.title?.substring(0, 100)}
                  </h2>
                  <p className="text-xs leading-relaxed">
                    {dayjs
                      .unix(post?.createdAt?.seconds)
                      .format('YYYY-MM-DD HH:MM:ss')}
                  </p>
                  <p className="leading-relaxed">
                    {post?.content?.substring(0, 200)}
                  </p>
                  <Link href={`/posts/${post?.id}`}>
                    <a className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700">
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
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default PostsPage;
