import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { Layout } from 'components/index';
import { useRouter } from 'next/router';

function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

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
          <form className="mt-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm text-gray-800 "
              >
                Username
              </label>
              <input
                type="text"
                className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700  focus:border-blue-400  focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-800 "
                >
                  Password
                </label>
                <a href="#" className="text-xs text-gray-400 hover:underline">
                  Forget Password?
                </a>
              </div>

              <input
                type="password"
                className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700  focus:border-blue-400  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              />
            </div>

            <div className="mt-6">
              <button className="w-full rounded-md bg-gray-700 px-4 py-2 tracking-wide text-white transition-colors duration-300 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
                Login
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
              onClick={() => signIn('google')}
              className="mx-2 flex w-full items-center justify-center rounded-md bg-blue-500 px-6 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-blue-700 focus:bg-blue-400 focus:outline-none"
            >
              <svg className="mx-2 h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"></path>
              </svg>

              <span className="mx-2 hidden sm:inline">Sign in with Google</span>
            </button>

            <a
              href="#"
              className="mx-2 rounded-md bg-gray-300 p-2 text-sm font-medium text-gray-500 transition-colors duration-300 hover:bg-gray-200"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"></path>
              </svg>
            </a>
          </div>

          <p className="mt-8 text-center text-xs font-light text-gray-400">
            {' '}
            {`Don't have an account?`}
            <a href="#" className="font-medium text-gray-700  hover:underline">
              Create One
            </a>
          </p>
        </div>
      </Layout>
    </>
  );
}

export default LoginPage;
