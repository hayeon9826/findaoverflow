import { useState, useEffect } from 'react';
import { db } from 'config/firebase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { collection, limit, orderBy, getDoc, doc } from 'firebase/firestore';
import { postType } from 'config/interface';
import * as dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

function PostsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<postType | null>(null);

  const getPost = async () => {
    const docRef = doc(db, 'posts', `${id}`);
    // const data = await getFirestoreData(docRef);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setPost(docSnap.data() as postType);
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  };

  useEffect(() => {
    if (id) {
      getPost();
    }
  }, [id]);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container py-24 mx-auto max-w-xl">
        <div className="-my-8 divide-y-2 divide-gray-100">
          <div className="py-8 flex flex-wrap md:flex-nowrap" key={post?.id}>
            <div className="md:flex-grow">
              <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                {post?.title}
              </h2>
              <p className="leading-relaxed text-xs">
                {dayjs
                  .unix(post?.createdAt?.seconds as number)
                  .format('YYYY-MM-DD HH:MM:ss')}
              </p>
              <p className="leading-relaxed mt-4 whitespace-pre-wrap">
                {post?.content}
              </p>
            </div>
          </div>
        </div>
        <hr className="my-8" />
      </div>
    </section>
  );
}

export default PostsPage;
