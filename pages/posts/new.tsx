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
        <div className="flex flex-col text-center w-full mb-8">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            게시글 작성
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
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
            className="flex flex-wrap -m-2"
          >
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
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
                  className="placeholder:text-sm w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <p className="text-red-500 mb-4 mt-2 text-xs">
                {errors.title?.message}
              </p>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="message"
                  className="leading-7 text-sm text-gray-600"
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
                  className="placeholder:text-sm w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
              <p className="text-red-500 mb-4 mt-2 text-xs">
                {errors.content?.message}
              </p>
            </div>
            <div className="p-2 w-full text-center">
              <button className="mx-auto text-white bg-blue-600 border-0 py-2 w-full text-center focus:outline-none hover:bg-blue-700 rounded text-lg">
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