import axios from 'axios';
import React, { useRef } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { auth, db } from 'config/firebase';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { Layout } from 'components/index';
import { collection, addDoc } from 'firebase/firestore';

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
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const password = useRef({});
  password.current = watch('password', '');

  return (
    <>
      <Layout>
        <div className="w-full max-w-md p-6 m-auto mx-auto bg-whitel">
          <div className="container mx-auto flex-1 flex flex-col items-center justify-center">
            <div className="bg-white py-8 w-full">
              <h1 className="text-3xl font-semibold text-center text-gray-700 ">
                Findaoverflow
              </h1>
              <form
                className="mt-6"
                onSubmit={handleSubmit(async (data) => {
                  try {
                    const credential = await createUserWithEmailAndPassword(
                      auth,
                      data.email,
                      data.password,
                    );
                    const { user } = credential;
                    // firestore 서버에 데이터 저장
                    const dbData = await addDoc(collection(db, 'users'), {
                      uid: user.uid,
                      name: data.name,
                      email: data.email,
                      createdAt: new Date(),
                    });
                    toast.success('가입을 완료하였습니다.', {
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
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md  focus:border-blue-400  focus:outline-none focus:ring focus:ring-opacity-40"
                    id="name"
                    placeholder="Name"
                    {...register('name', {
                      required: '필수 입력 사항입니다.',
                    })}
                  />
                  <p className="text-red-500 mb-4 text-xs">
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
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md  focus:border-blue-400  focus:outline-none focus:ring focus:ring-opacity-40"
                    id="email"
                    placeholder="Email"
                    {...register('email', {
                      required: '필수 입력 사항입니다',
                    })}
                  />
                  <p className="text-red-500 mb-4 text-xs">
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
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md  focus:border-blue-400  focus:outline-none focus:ring focus:ring-opacity-40"
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
                  <p className="text-red-500 mb-4 text-xs">
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
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md  focus:border-blue-400  focus:outline-none focus:ring focus:ring-opacity-40"
                    id="password_confirmation"
                    placeholder="Confirm Password"
                    {...register('password_confirmation', {
                      validate: (value) =>
                        value === password.current ||
                        '비밀번호가 일치하지 않습니다.',
                    })}
                  />
                  <p className="text-red-500 mb-4 text-xs">
                    {errors.password_confirmation?.message}
                  </p>
                </div>
                <button
                  type="submit"
                  className="w-full text-center py-3 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none my-1"
                >
                  Create Account
                </button>
              </form>

              <div className="text-center text-sm text-grey-dark mt-4">
                By signing up, you agree to the
                <a
                  className="no-underline border-b border-grey-dark text-grey-dark ml-2"
                  href="#"
                >
                  Terms of Service
                </a>{' '}
                and
                <a
                  className="no-underline border-b border-grey-dark text-grey-dark ml-2"
                  href="#"
                >
                  Privacy Policy
                </a>
              </div>
            </div>

            <div className="text-gray-700 text-sm mt-6">
              Already have an account?
              <Link href="/users/login">
                <a className="no-underline border-b border-blue text-blue ml-2">
                  Log in
                </a>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default RegisterPage;
