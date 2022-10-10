import { useState } from 'react';
import Head from 'next/head';
import { HeaderType, LayoutType } from 'config/interface';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-between p-6 bg-white sm:flex-row container mx-auto flex-wrap md:flex-row">
      <a
        href="https://finda.co.kr"
        target="_blank"
        className="flex title-font font-medium items-center text-gray-900 mb-2 md:mb-0"
      >
        <Image
          src="https://cdn.finda.co.kr/images/favicon/finda_192.png"
          alt="Finda Logo"
          width={18}
          height={18}
        />
        <span className="ml-1 text-sm font-semibold text-gray-900">
          findaoverflow
        </span>
      </a>
      <p className="lg:text-sm text-gray-400 text-xs">
        © Copyright 2022. All Rights Reserved.
      </p>
    </footer>
  );
};

export const Header = ({ title = '핀다오버플로우' }: HeaderType) => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Head>
        <title>{title}</title>
        <link
          rel="icon"
          href="https://cdn.finda.co.kr/images/favicon/finda_192.png"
        />
      </Head>
      <header className="text-gray-600 body-font top-0 pt-safe sticky backdrop-blur-lg">
        <nav className="container mx-auto flex flex-wrap p-5 flex-row items-center justify-between">
          <div className="inline-flex my-auto">
            <Link href="/">
              <a className="flex title-font font-medium items-center text-gray-900">
                <Image
                  src="https://cdn.finda.co.kr/images/favicon/finda_192.png"
                  alt="Finda Logo"
                  width={20}
                  height={20}
                />
                <span className="ml-1 text-lg font-bold text-gray-900">
                  findaoverflow
                </span>
              </a>
            </Link>
          </div>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center px-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-100"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={() => setOpen(!open)}
          >
            <span className="sr-only">Open main menu</span>
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
          <div className="md:ml-auto flex-wrap items-center text-base justify-center hidden w-full md:block lg:block md:w-auto">
            {session && session.user?.name ? (
              <>
                <Link href="/posts/new">
                  <a className="mr-5 hover:text-gray-900">포스트 작성</a>
                </Link>
                <Link href="/posts">
                  <a className="mr-5 hover:text-gray-900">포스트 목록</a>
                </Link>
                <button
                  className="mr-5 hover:text-gray-900"
                  onClick={() => signOut()}
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <button
                  className="mr-5 hover:text-gray-900"
                  onClick={() => signIn()}
                >
                  구글 로그인
                </button>
                <Link href="/users/login">
                  <a className="mr-5 hover:text-gray-900">로그인</a>
                </Link>
                <Link href="/users/register">
                  <a className="mr-5 hover:text-gray-900">회원가입</a>
                </Link>
              </>
            )}
            {session && session.user?.name && (
              <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-sm mt-4 md:mt-0">
                <b>{session?.user?.name || status}</b>님 환영합니다!
              </button>
            )}
          </div>
        </nav>
        {open && (
          <div
            className={`md:ml-auto flex-wrap items-center text-base justify-center block w-full md:hidden lg:hidden md:w-auto absolute bg-white z-100 transition duration-500 ease-in-out ${open} ? 'translate-y-100 : 'translate-y-0`}
          >
            <ul className="w-full text-sm font-normal text-gray-500">
              {session && session.user?.name ? (
                <>
                  <Link href="/posts/new">
                    <li className="py-4 px-6 w-full">
                      <a className="mr-5 hover:text-gray-900">포스트 작성</a>
                    </li>
                  </Link>
                  <Link href="/posts">
                    <li className="py-4 px-6 w-full">
                      <a className="mr-5 hover:text-gray-900">포스트 목록</a>
                    </li>
                  </Link>
                  <button
                    className="mr-5 hover:text-gray-900"
                    onClick={() => signOut()}
                  >
                    <li className="py-4 px-6 w-full">로그아웃</li>
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="mr-5 hover:text-gray-900"
                    onClick={() => signIn()}
                  >
                    <li className="py-4 px-6 w-full">구글 로그인</li>
                  </button>
                  <Link href="/users/login">
                    <li className="py-4 px-6 w-full">
                      <a className="mr-5 hover:text-gray-900">로그인</a>
                    </li>
                  </Link>
                  <Link href="/users/register">
                    <li className="py-4 px-6 w-full">
                      <a className="mr-5 hover:text-gray-900">회원가입</a>
                    </li>
                  </Link>
                </>
              )}
              {session && session.user?.name && (
                <li className="py-4 px-6 w-full">
                  <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-sm md:mt-0">
                    <b>{session?.user?.name || status}</b>님 환영합니다!
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </header>
    </>
  );
};

export const Layout = ({
  noNav = false,
  title = '핀다오버플로우',
  className,
  children,
}: LayoutType) => {
  return (
    <>
      {!noNav && <Header title={title} />}
      <div
        className={
          className || `flex min-h-screen flex-col items-center justify-center`
        }
      >
        {children}
      </div>
      <Footer />
    </>
  );
};
