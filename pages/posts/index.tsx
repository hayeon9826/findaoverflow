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
      <section className="text-gray-600 body-font overflow-hidden mt-12 px-8 lg:px-20">
        <h2 className="font-bold text-3xl max-w-3xl justify-between flex">
          핀다 Tech 이야기
        </h2>
        <div className="container pb-24 mt-12 mx-auto max-w-3xl">
          <div className="-my-8 divide-y-2 divide-gray-100">
            {posts?.map((post: postType) => (
              <div
                className="py-8 flex flex-wrap md:flex-nowrap"
                key={post?.id}
              >
                <div className="md:flex-grow">
                  <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                    {post?.title?.substring(0, 100)}
                  </h2>
                  <p className="leading-relaxed text-xs">
                    {dayjs
                      .unix(post?.createdAt?.seconds)
                      .format('YYYY-MM-DD HH:MM:ss')}
                  </p>
                  <p className="leading-relaxed">
                    {post?.content?.substring(0, 200)}
                  </p>
                  <Link href={`/posts/${post?.id}`}>
                    <a className="text-blue-600 inline-flex items-center mt-4 hover:text-blue-700">
                      더보기
                      <svg
                        className="w-4 h-4 ml-2"
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
