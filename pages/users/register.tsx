import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { db } from 'config/firebase';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { Layout } from 'components/index';
import { collection, addDoc } from 'firebase/firestore';
import { hash, genSaltSync } from 'bcryptjs';
import { getUserByEmail } from 'utils/auth';
import { signIn } from 'next-auth/react';

type FormValues = {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
};

function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const password = useRef({});
  password.current = watch('password', '');

  return (
    <>
      <Layout>
        <div className="bg-white m-auto mx-auto w-full max-w-md p-6">
          <div className="container mx-auto flex flex-1 flex-col items-center justify-center">
            <div className="w-full bg-white py-8">
              <h1 className="text-center text-3xl font-semibold text-gray-700 ">
                findaoverflow
              </h1>
              <form
                className="mt-6"
                onSubmit={handleSubmit(async (data) => {
                  try {
                    // const credential = await createUserWithEmailAndPassword(
                    //   auth,
                    //   data.email,
                    //   data.password,
                    // );
                    // const { user } = credential;
                    const user = await getUserByEmail(data?.email);
                    // firestore 서버에 데이터 저장. password는 해싱해서
                    if (user) {
                      // form reset
                      reset();
                      throw new Error(
                        '해당 사용자가 존재합니다. 다른 이메일로 가입해주세요.',
                      );
                    }

                    if (!user) {
                      const randomUid = genSaltSync(12);
                      await addDoc(collection(db, 'users'), {
                        uid: randomUid,
                        name: data.name,
                        email: data.email,
                        password: await hash(data.password, 12),
                        createdAt: new Date(),
                      });
                      const result = signIn('credentials', {
                        redirect: false,
                        email: data.email,
                        name: data.name,
                        id: randomUid,
                      });
                      console.log(result);
                      toast.success('가입을 완료하였습니다.', {
                        autoClose: 1000,
                      });

                      router.replace('/');
                    }
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
                    Username
                  </label>
                  <input
                    type="text"
                    className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700  focus:border-blue-400  focus:outline-none focus:ring focus:ring-opacity-40"
                    id="name"
                    placeholder="Name"
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
                    Email
                  </label>
                  <input
                    type="text"
                    className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700  focus:border-blue-400  focus:outline-none focus:ring focus:ring-opacity-40"
                    id="email"
                    placeholder="Email"
                    {...register('email', {
                      required: '필수 입력 사항입니다',
                    })}
                  />
                  <p className="mb-4 mt-2 text-xs text-red-500">
                    {errors.email?.message}
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm text-gray-800 "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700  focus:border-blue-400  focus:outline-none focus:ring focus:ring-opacity-40"
                    id="password"
                    placeholder="Password"
                    {...register('password', {
                      required: '필수 입력 사항입니다.',
                      minLength: {
                        value: 8,
                        message: '8자 이상 입력해주세요.',
                      },
                    })}
                  />
                  <p className="mb-4 mt-2 text-xs text-red-500">
                    {errors.password?.message}
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="password_confirmation"
                    className="block text-sm text-gray-800 "
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700  focus:border-blue-400  focus:outline-none focus:ring focus:ring-opacity-40"
                    id="password_confirmation"
                    placeholder="Confirm Password"
                    {...register('password_confirmation', {
                      required: '필수 입력 사항입니다.',
                      validate: (value) =>
                        value === password.current ||
                        '비밀번호가 일치하지 않습니다.',
                    })}
                  />
                  <p className="mb-4 mt-2 text-xs text-red-500">
                    {errors.password_confirmation?.message}
                  </p>
                </div>
                <button
                  type="submit"
                  className="my-1 w-full rounded bg-blue-600 py-2 text-center text-white hover:bg-blue-700 focus:outline-none"
                >
                  Create Account
                </button>
              </form>

              <div className="mt-4 text-center text-sm">
                By signing up, you agree to the
                <a className="ml-2 border-b no-underline" href="#">
                  Terms of Service
                </a>{' '}
                and
                <a className="ml-2 border-b no-underline" href="#">
                  Privacy Policy
                </a>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-700">
              Already have an account?
              <Link href="/users/login">
                <a className="ml-2 border-b no-underline">Log in</a>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default RegisterPage;
