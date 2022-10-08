import { db } from 'config/firebase';
import Link from 'next/link';
import { useRouter } from "next/router";
import { collection, limit, orderBy, query, where } from "firebase/firestore";
import { useFirestoreQuery } from 'utils/index'
import { postType } from 'config/interface'
import * as dayjs from 'dayjs'
import 'dayjs/locale/ko'
dayjs.locale('ko')


function PostsPage() {
const router = useRouter();
  const { id } = router.query;
  const post = useFirestoreQuery(query(collection(db, "posts")))

  console.log(post)

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container py-24 mx-auto max-w-xl">
        <div className="-my-8 divide-y-2 divide-gray-100">
          <div className="py-8 flex flex-wrap md:flex-nowrap" key={post[0]?.id}>
            <div className="md:flex-grow">
              <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">{post[0]?.title}</h2>
              <p className="leading-relaxed text-xs">{dayjs.unix(post[0]?.createdAt?.seconds).format('YYYY-MM-DD HH:MM:ss')}</p>
              <p className="leading-relaxed">{post[0]?.content}</p>
            </div>
          </div>
        </div>
        <hr className="my-8" />
      </div>
    </section>
  );
}

export default PostsPage;
