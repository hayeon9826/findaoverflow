import { useState } from 'react';
import Head from 'next/head';
import { HeaderType, LayoutType } from 'config/interface';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="container mx-auto flex flex-col flex-wrap items-center justify-between bg-white p-6 sm:flex-row md:flex-row">
      <a
        href="https://finda.co.kr"
        target="_blank"
        className="mb-2 flex items-center font-medium text-gray-900 md:mb-0"
        rel="noreferrer"
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
      <p className="text-xs text-gray-400 lg:text-sm">
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
      <header className="sticky top-0 text-gray-600 backdrop-blur-lg">
        <nav className="container mx-auto flex flex-row flex-wrap items-center justify-between p-5">
          <div className="my-auto inline-flex">
            <Link href="/">
              <a className="flex items-center font-medium text-gray-900">
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
            className="ml-3 inline-flex items-center rounded-lg px-2 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-100 md:hidden"
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
                className="h-6 w-6"
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
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
          <div className="hidden w-full flex-wrap items-center justify-center text-base md:ml-auto md:block md:w-auto lg:block">
            {session && session.user?.name ? (
              <>
                <Link href="/posts">
                  <a className="mr-5 hover:text-gray-900">포스트 목록</a>
                </Link>
                <Link href="/boards">
                  <a className="mr-5 hover:text-gray-900">이야기 목록</a>
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
              <button className="mt-4 inline-flex items-center rounded border-0 bg-gray-100 py-1 px-3 text-sm hover:bg-gray-200 focus:outline-none md:mt-0">
                <b>{session?.user?.name || status}</b>님 환영합니다!
              </button>
            )}
          </div>
        </nav>
        {open && (
          <div
            className={`z-100 absolute block w-full flex-wrap items-center justify-center bg-white text-base transition duration-500 ease-in-out md:ml-auto md:hidden md:w-auto lg:hidden ${open} ? 'translate-y-100 : 'translate-y-0`}
          >
            <ul className="w-full text-sm font-normal text-gray-500">
              {session && session.user?.name ? (
                <>
                  <Link href="/posts">
                    <li className="w-full py-4 px-6">
                      <a className="mr-5 hover:text-gray-900">포스트 목록</a>
                    </li>
                  </Link>
                  <Link href="/boards">
                    <li className="w-full py-4 px-6">
                      <a className="mr-5 hover:text-gray-900">이야기 목록</a>
                    </li>
                  </Link>

                  <button
                    className="mr-5 hover:text-gray-900"
                    onClick={() => signOut()}
                  >
                    <li className="w-full py-4 px-6">로그아웃</li>
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="mr-5 hover:text-gray-900"
                    onClick={() => signIn()}
                  >
                    <li className="w-full py-4 px-6">구글 로그인</li>
                  </button>
                  <Link href="/users/login">
                    <li className="w-full py-4 px-6">
                      <a className="mr-5 hover:text-gray-900">로그인</a>
                    </li>
                  </Link>
                  <Link href="/users/register">
                    <li className="w-full py-4 px-6">
                      <a className="mr-5 hover:text-gray-900">회원가입</a>
                    </li>
                  </Link>
                </>
              )}
              {session && session.user?.name && (
                <li className="w-full py-4 px-6">
                  <button className="inline-flex items-center rounded border-0 bg-gray-100 py-1 px-3 text-sm hover:bg-gray-200 focus:outline-none md:mt-0">
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
  noFooter = false,
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
      {!noFooter && <Footer />}
    </>
  );
};
