import Head from 'next/head';
import { HeaderType, LayoutType } from 'config/interface';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-between p-6 bg-white sm:flex-row container mx-auto flex-wrap  md:flex-row">
      <a href="https://finda.co.kr" target="_blank">
        <Image
          src="https://cdn.finda.co.kr/images/favicon/finda_192.png"
          alt="Finda Logo"
          width={25}
          height={25}
        />
      </a>
      <p className="text-sm text-gray-400">
        © Copyright 2022. All Rights Reserved.
      </p>
    </footer>
  );
};

export const Header = ({ title = '핀다오버플로우' }: HeaderType) => {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>{title}</title>
        <link
          rel="icon"
          href="https://cdn.finda.co.kr/images/favicon/finda_192.png"
        />
      </Head>
      <header className="text-gray-600 body-font top-0 pt-safe sticky  backdrop-blur-lg">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link href="/">
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <Image
                src="https://cdn.finda.co.kr/images/favicon/finda_192.png"
                alt="Finda Logo"
                width={25}
                height={25}
              />
              <span className="ml-3 text-xl font-bold text-gray-500">
                Findaoverflow
              </span>
            </a>
          </Link>

          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
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
          </nav>
          {session && session.user?.name && (
            <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-sm mt-4 md:mt-0">
              <b>{session?.user?.name || status}</b>님 환영합니다!
            </button>
          )}
        </div>
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
