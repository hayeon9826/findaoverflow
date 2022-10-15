import { useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { collection, addDoc } from 'firebase/firestore';
import { db } from 'config/firebase';
import { Layout } from 'components/index';
import dynamic from 'next/dynamic';

const NoSsrEditor = dynamic(() => import('components/TuiEditor'), {
  ssr: false,
});

type FormValues = {
  title: string;
};

const Page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const ref = useRef<any>(null);

  const showContent = useCallback(() => {
    const editorIns = ref?.current?.getInstance();
    const contentHtml = editorIns.getHTML();
    const contentMark = editorIns.getMarkdown();
    console.log(contentHtml);
    console.log(contentMark);
  }, [ref]);

  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <>
      <Layout noFooter noNav className="h-screen w-full">
        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              const editorIns = ref?.current?.getInstance();
              const contentHtml = editorIns.getHTML();
              const contentMark = editorIns.getMarkdown();
              console.log(contentHtml);
              console.log(contentMark);
              // contentMark 길이 체크

              // add firestore
              const dbData = await addDoc(collection(db, 'posts'), {
                title: data.title,
                content: contentMark,
                createdAt: new Date(),
              });
              toast.success('포스트를 작성했습니다.', {
                autoClose: 1000,
              });
              router.replace('/');
            } catch (e) {
              console.log(e);
              toast.error('다시 시도해주세요.', {
                autoClose: 1000,
              });
            }
          })}
          className="h-screen overflow-hidden"
        >
          <div className="mx-2 md:mx-8 lg:mx-8 mt-4 p-2">
            <div className="relative">
              <label htmlFor="name" className="text-sm leading-7 text-gray-600">
                제목
              </label>
              <input
                {...register('title', {
                  required: '필수 입력 사항입니다.',
                })}
                type="text"
                id="title"
                name="title"
                placeholder="제목을 입력해주세요"
                className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out placeholder:text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <p className="mb-4 mt-2 text-xs text-red-500">
              {errors.title?.message}
            </p>
          </div>
          <NoSsrEditor content="" editorRef={ref} />
          <div className="flex h-12 w-full">
            <button
              className="h-full w-[40%] bg-gray-500 text-sm font-medium text-white hover:bg-gray-700"
              onClick={handleGoBack}
            >
              뒤로가기
            </button>
            <button
              className="h-full w-full bg-blue-600 text-sm font-medium text-white hover:bg-blue-700"
              onClick={showContent}
            >
              작성하기
            </button>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default Page;
