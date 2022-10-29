import { useState, useEffect, useCallback } from 'react';
import { db } from 'config/firebase';
import { useRouter } from 'next/router';
import { getDoc, doc } from 'firebase/firestore';
import { PostType } from 'config/interface';
import * as dayjs from 'dayjs';
import { Layout } from 'components/index';
import dynamic from 'next/dynamic';
import 'dayjs/locale/ko';
dayjs.locale('ko');

function PostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<PostType | null>(null);

  const getPost = useCallback(async () => {
    const docRef = doc(db, 'posts', `${id}`);
    const docSnap = await getDoc(docRef);

    return docSnap.exists() ? (docSnap.data() as PostType) : null;
  }, [db, id]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPost();
      setPost(data);
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <Layout className="min-h-screen px-8 lg:px-0">
      <section className="overflow-hidden text-gray-600">
        <div className="container mx-auto max-w-3xl py-24">
          <div className="-my-8 divide-y-2 divide-gray-100">
            <div className="flex flex-wrap py-8 md:flex-nowrap" key={post?.id}>
              <div className="md:grow">
                <h2 className="mb-2 text-2xl font-medium text-gray-900">
                  {post?.title}
                </h2>
                <p className="text-xs leading-relaxed">
                  {dayjs
                    .unix(post?.createdAt?.seconds as number)
                    .format('YYYY-MM-DD HH:MM:ss')}
                </p>
                <div className="mt-8">{post?.content}</div>
              </div>
            </div>
          </div>
          <hr className="my-8" />
          {/* comment section */}
          <section>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 lg:text-2xl">
                Discussion (20)
              </h2>
            </div>
            <form className="mb-6">
              <div className="mb-4 rounded-lg border border-gray-200 bg-white py-2 px-4">
                <label htmlFor="comment" className="sr-only">
                  Your comment
                </label>
                <textarea
                  id="comment"
                  rows={6}
                  className="w-full border-0 px-0 text-sm text-gray-900 focus:ring-0"
                  placeholder="Write a comment..."
                  required
                ></textarea>
              </div>
              <div className="flex flex-row-reverse">
                <button
                  type="submit"
                  className="focus:ring-primary-200 hover:bg-primary-800 inline-flex items-center rounded-lg bg-blue-600 py-2.5 px-4 text-center text-xs font-medium text-white focus:ring-4"
                >
                  board comment
                </button>
              </div>
            </form>
            <article className="mb-6 rounded-lg bg-white p-6 text-base">
              <footer className="mb-2 flex items-center justify-between">
                <div className="flex items-center">
                  <p className="mr-3 inline-flex items-center text-sm text-gray-900">
                    <img
                      className="mr-2 h-6 w-6 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                      alt="Michael Gough"
                    />
                    Michael Gough
                  </p>
                  <p className="text-sm text-gray-600 ">Feb. 8, 2022</p>
                </div>
                <button
                  id="dropdownComment1Button"
                  data-dropdown-toggle="dropdownComment1"
                  className="inline-flex items-center rounded-lg bg-white p-2 text-center text-sm font-medium text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50"
                  type="button"
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                  </svg>
                  <span className="sr-only">Comment settings</span>
                </button>
                <div
                  id="dropdownComment1"
                  className="z-10 hidden w-36 divide-y divide-gray-100 rounded bg-white shadow"
                >
                  <ul
                    className="py-1 text-sm text-gray-700"
                    aria-labelledby="dropdownMenuIconHorizontalButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 "
                      >
                        Edit
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 "
                      >
                        Remove
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 "
                      >
                        Report
                      </a>
                    </li>
                  </ul>
                </div>
              </footer>
              <p>
                Very straight-to-point article. Really worth time reading. Thank
                you! But tools are just the instruments for the UX designers.
                The knowledge of the design tools are as important as the
                creation of the design strategy.
              </p>
              <div className="mt-4 flex items-center space-x-4">
                <button
                  type="button"
                  className="flex items-center text-sm text-gray-500 hover:underline "
                >
                  <svg
                    aria-hidden="true"
                    className="mr-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                  Reply
                </button>
              </div>
            </article>
            <article className="mb-6 ml-6 rounded-lg bg-white p-6 text-base lg:ml-12">
              <footer className="mb-2 flex items-center justify-between">
                <div className="flex items-center">
                  <p className="mr-3 inline-flex items-center text-sm text-gray-900">
                    <img
                      className="mr-2 h-6 w-6 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="Jese Leos"
                    />
                    Jese Leos
                  </p>
                  <p className="text-sm text-gray-600 ">Feb. 12, 2022</p>
                </div>
                <button
                  id="dropdownComment2Button"
                  data-dropdown-toggle="dropdownComment2"
                  className="inline-flex items-center rounded-lg bg-white p-2 text-center text-sm font-medium text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50"
                  type="button"
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                  </svg>
                  <span className="sr-only">Comment settings</span>
                </button>
                <div
                  id="dropdownComment2"
                  className="z-10 hidden w-36 divide-y divide-gray-100 rounded bg-white shadow"
                >
                  <ul
                    className="py-1 text-sm text-gray-700"
                    aria-labelledby="dropdownMenuIconHorizontalButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 "
                      >
                        Edit
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 "
                      >
                        Remove
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 "
                      >
                        Report
                      </a>
                    </li>
                  </ul>
                </div>
              </footer>
              <p>Much appreciated! Glad you liked it ☺️</p>
              <div className="mt-4 flex items-center space-x-4">
                <button
                  type="button"
                  className="flex items-center text-sm text-gray-500 hover:underline "
                >
                  <svg
                    aria-hidden="true"
                    className="mr-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                  Reply
                </button>
              </div>
            </article>
            <article className="mb-6 border-t border-gray-200 bg-white p-6 text-base">
              <footer className="mb-2 flex items-center justify-between">
                <div className="flex items-center">
                  <p className="mr-3 inline-flex items-center text-sm text-gray-900">
                    <img
                      className="mr-2 h-6 w-6 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                      alt="Bonnie Green"
                    />
                    Bonnie Green
                  </p>
                  <p className="text-sm text-gray-600 ">Mar. 12, 2022</p>
                </div>
                <button
                  id="dropdownComment3Button"
                  data-dropdown-toggle="dropdownComment3"
                  className="inline-flex items-center rounded-lg bg-white p-2 text-center text-sm font-medium text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50"
                  type="button"
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                  </svg>
                  <span className="sr-only">Comment settings</span>
                </button>
                <div
                  id="dropdownComment3"
                  className="z-10 hidden w-36 divide-y divide-gray-100 rounded bg-white shadow"
                >
                  <ul
                    className="py-1 text-sm text-gray-700"
                    aria-labelledby="dropdownMenuIconHorizontalButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 "
                      >
                        Edit
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 "
                      >
                        Remove
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 "
                      >
                        Report
                      </a>
                    </li>
                  </ul>
                </div>
              </footer>
              <p>
                The article covers the essentials, challenges, myths and stages
                the UX designer should consider while creating the design
                strategy.
              </p>
              <div className="mt-4 flex items-center space-x-4">
                <button
                  type="button"
                  className="flex items-center text-sm text-gray-500 hover:underline "
                >
                  <svg
                    aria-hidden="true"
                    className="mr-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                  Reply
                </button>
              </div>
            </article>
            <article className="border-t border-gray-200 bg-white p-6 text-base">
              <footer className="mb-2 flex items-center justify-between">
                <div className="flex items-center">
                  <p className="mr-3 inline-flex items-center text-sm text-gray-900">
                    <img
                      className="mr-2 h-6 w-6 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                      alt="Helene Engels"
                    />
                    Helene Engels
                  </p>
                  <p className="text-sm text-gray-600 ">Jun. 23, 2022</p>
                </div>
                <button
                  id="dropdownComment4Button"
                  data-dropdown-toggle="dropdownComment4"
                  className="inline-flex items-center rounded-lg bg-white p-2 text-center text-sm font-medium text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50"
                  type="button"
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                  </svg>
                </button>
                <div
                  id="dropdownComment4"
                  className="z-10 hidden w-36 divide-y divide-gray-100 rounded bg-white shadow"
                >
                  <ul
                    className="py-1 text-sm text-gray-700"
                    aria-labelledby="dropdownMenuIconHorizontalButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 "
                      >
                        Edit
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 "
                      >
                        Remove
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 "
                      >
                        Report
                      </a>
                    </li>
                  </ul>
                </div>
              </footer>
              <p>
                Thanks for sharing this. I do came from the Backend development
                and explored some of the tools to design my Side Projects.
              </p>
              <div className="mt-4 flex items-center space-x-4">
                <button
                  type="button"
                  className="flex items-center text-sm text-gray-500 hover:underline "
                >
                  <svg
                    aria-hidden="true"
                    className="mr-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                  Reply
                </button>
              </div>
            </article>
          </section>
        </div>
      </section>
    </Layout>
  );
}

export default PostPage;
