import axios from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { collection, addDoc } from 'firebase/firestore';
import { db } from 'config/firebase';
import { Layout } from 'components/index';

type FormValues = {
  title: string;
  content: string;
};

const Page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <>
      <Layout>
        <div className="mb-8 flex w-full flex-col text-center">
          <h1 className="title-font mb-4 text-2xl font-medium text-gray-900 sm:text-3xl">
            게시글 작성
          </h1>
          <p className="mx-auto text-base leading-relaxed lg:w-2/3">
            게시글을 작성해주세요
          </p>
        </div>
        <div className="mx-8">
          <form
            onSubmit={handleSubmit(async (data) => {
              console.log(data);
              try {
                // add firestore
                const dbData = await addDoc(collection(db, 'posts'), {
                  title: data.title,
                  content: data.content,
                  createdAt: new Date(),
                });
                toast.success('게시글을 작성했습니다.', {
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
            className="-m-2 flex flex-wrap"
          >
            <div className="w-full p-2">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="text-sm leading-7 text-gray-600"
                >
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
            <div className="w-full p-2">
              <div className="relative">
                <label
                  htmlFor="message"
                  className="text-sm leading-7 text-gray-600"
                >
                  내용
                </label>
                <textarea
                  {...register('content', {
                    required: '필수 입력 사항입니다.',
                    minLength: {
                      value: 10,
                      message: '10자 이상 입력해주세요.',
                    },
                  })}
                  placeholder="내용을 입력해주세요."
                  id="content"
                  name="content"
                  className="h-32 w-full resize-none rounded border border-gray-300 bg-gray-100 bg-opacity-50 py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out placeholder:text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                ></textarea>
              </div>
              <p className="mb-4 mt-2 text-xs text-red-500">
                {errors.content?.message}
              </p>
            </div>
            <div className="w-full p-2 text-center">
              <button className="mx-auto w-full rounded border-0 bg-blue-600 py-2 text-center text-lg text-white hover:bg-blue-700 focus:outline-none">
                작성
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Page;
