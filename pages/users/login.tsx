import { Layout } from 'components/index';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getUserByEmail, verifyPassword } from 'utils/auth';
import { toast } from 'react-toastify';
import Link from 'next/link';

function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession();

  type FormValues = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (session) {
      router.replace('/');
    }
  }, [session]);

  return (
    <>
      <Layout>
        <div className="m-auto mx-auto w-full max-w-md bg-white p-6">
          <h1 className="text-center text-3xl font-semibold text-gray-700">
            findaoverflow
          </h1>
          <form
            onSubmit={handleSubmit(async (data) => {
              console.log(data);
              try {
                const user = await getUserByEmail(data?.email);
                console.log(user);
                if (!user) {
                  reset();
                  throw new Error('해당 사용자가 없습니다. 다시 시도해주세요.');
                }
                if (user) {
                  const checkPw = await verifyPassword(
                    data?.password,
                    user?.password,
                  );

                  if (!checkPw) {
                    reset();
                    throw new Error('비밀번호가 틀립니다. 다시 시도해주세요.');
                  }
                  if (checkPw) {
                    const result = signIn('credentials', {
                      redirect: false,
                      email: user.email,
                      name: user.name,
                      id: user.uid,
                    });
                    console.log(result);
                    toast.success('로그인을 완료하였습니다.', {
                      autoClose: 1000,
                    });

                    router.replace('/');
                  }
                }
              } catch (e) {
                console.log(e);
                toast.error(`${e}`, {
                  autoClose: 1000,
                });
              }
            })}
            className="mt-6"
          >
            <div>
              <label htmlFor="username" className="block text-sm text-gray-800">
                이메일
              </label>
              <input
                type="text"
                {...register('email', {
                  required: '필수 입력 사항입니다',
                })}
                placeholder="이메일을 입력해주세요."
                className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400  focus:outline-none focus:ring focus:ring-opacity-40"
              />
              <p className="mb-4 mt-2 text-xs text-red-500">
                {errors.email?.message}
              </p>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-800 "
                >
                  비밀번호
                </label>
                {/* <a href="#" className="text-xs text-gray-400 hover:underline">
                  Forget Password?
                </a> */}
              </div>

              <input
                type="password"
                {...register('password', {
                  required: '필수 입력 사항입니다.',
                  minLength: {
                    value: 8,
                    message: '8자 이상 입력해주세요.',
                  },
                })}
                placeholder="비밀번호를 입력해주세요."
                className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700  focus:border-blue-400  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              />
              <p className="mb-4 mt-2 text-xs text-red-500">
                {errors.password?.message}
              </p>
            </div>

            <div className="mt-6">
              <button className="w-full rounded-md bg-gray-700 px-4 py-2 tracking-wide text-white transition-colors duration-300 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
                로그인하기
              </button>
            </div>
          </form>

          <div className="mt-4 flex items-center justify-between">
            <span className="w-1/5 border-b  lg:w-1/5"></span>

            <a
              href="#"
              className="text-center text-xs uppercase text-gray-500  hover:underline"
            >
              or login with Social Media
            </a>

            <span className="w-1/5 border-b lg:w-1/5"></span>
          </div>

          <div className="-mx-2 mt-6 flex items-center">
            <button
              type="button"
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="mx-2 flex w-full items-center justify-center rounded-md bg-blue-500 px-6 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-blue-700 focus:bg-blue-400 focus:outline-none"
            >
              <svg className="mx-2 h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"></path>
              </svg>

              <span className="mx-2 hidden sm:inline">Google로 로그인하기</span>
            </button>
          </div>

          <p className="mt-8 text-center text-xs font-light text-gray-400">
            {' '}
            {`계정이 없으신가요?`}
            <Link href="/users/register">
              <a
                href="#"
                className="font-medium text-gray-700  hover:underline"
              >
                {' '}
                계정 생성하기
              </a>
            </Link>
          </p>
        </div>
      </Layout>
    </>
  );
}

export default LoginPage;
