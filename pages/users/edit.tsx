import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { db } from 'config/firebase';
import { toast } from 'react-toastify';
import { Layout } from 'components/index';
// import { collection, query, updateDoc, where } from 'firebase/firestore';
import { getUserByEmail } from 'utils/auth';
import { useSession } from 'next-auth/react';

type FormValues = {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
};

function RegisterPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const password = useRef({});
  password.current = watch('password', '');

  console.log(session);

  return (
    <>
      <Layout>
        <div className="bg-white m-auto mx-auto w-full max-w-md p-6">
          <div className="container mx-auto flex flex-1 flex-col items-center justify-center">
            <div className="w-full bg-white py-8">
              <h1 className="text-center text-2xl font-semibold text-gray-700 ">
                내 정보 수정
              </h1>
              <form
                className="mt-6"
                onSubmit={handleSubmit(async (data) => {
                  try {
                    // const user = await getUserByEmail(data?.email);
                    // console.log(user);
                    // if (!user) {
                    //   throw new Error(
                    //     '해당 사용자가 존재하지 않습니다. 다시 시도해주세요.',
                    //   );
                    // }
                    // if (user) {
                    //   // firestore update user
                    //   // next/auth update user
                    //   toast.success('내 정보를 수정했습니다.', {
                    //     autoClose: 1000,
                    //   });
                    // }

                    router.replace('/users/mypage');
                  } catch (e: any) {
                    console.log(e);
                    toast.error(`${e}`, {
                      autoClose: 1000,
                    });
                  }
                })}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-gray-800 "
                  >
                    이름
                  </label>
                  <input
                    type="text"
                    className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700  focus:border-blue-400  focus:outline-none focus:ring focus:ring-opacity-40"
                    id="name"
                    defaultValue={session?.user?.name}
                    placeholder="이름을 입력해주세요"
                    {...register('name', {
                      required: '필수 입력 사항입니다.',
                    })}
                  />
                  <p className="mb-4 mt-2 text-xs text-red-500">
                    {errors.name?.message}
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-gray-800 "
                  >
                    이메일
                  </label>
                  <input
                    type="text"
                    readOnly
                    className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700  focus:border-blue-400  focus:outline-none focus:ring focus:ring-opacity-40"
                    id="email"
                    defaultValue={session?.user?.email}
                    placeholder="이메일을 입력해주세요"
                  />
                  <p className="mb-4 mt-2 text-xs text-red-500">
                    {errors.email?.message}
                  </p>
                </div>
                <button
                  type="submit"
                  className="my-1 mt-16 w-full rounded bg-blue-600 py-2 text-center text-white hover:bg-blue-700 focus:outline-none"
                >
                  정보 수정하기
                </button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default RegisterPage;
