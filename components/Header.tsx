'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const Header = () => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className="sticky top-0 text-gray-600 backdrop-blur-lg">
        <nav className="container mx-auto flex flex-row flex-wrap items-center justify-between p-5">
          <div className="my-auto inline-flex items-center">
            <Link href="/">
              <Image
                src="https://cdn.finda.co.kr/images/favicon/finda_192.png"
                alt="Finda Logo"
                width={20}
                height={20}
              />
            </Link>
            <span className="ml-2 text-lg font-bold text-gray-900">
              findaoverflow
            </span>
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
            {session && session.user?.id ? (
              <>
                <Link href="/posts">
                  <span className="mr-5 hover:text-gray-900">????????? ??????</span>
                </Link>
                <Link href="/boards">
                  <span className="mr-5 hover:text-gray-900">????????? ??????</span>
                </Link>
                <button
                  className="mr-5 hover:text-gray-900"
                  onClick={() => signOut()}
                >
                  ????????????
                </button>
              </>
            ) : (
              <>
                <button
                  className="mr-5 hover:text-gray-900"
                  onClick={() => signIn()}
                >
                  ?????? ?????????
                </button>
                <Link href="/users/login">
                  <span className="mr-5 hover:text-gray-900">?????????</span>
                </Link>
                <Link href="/users/register">
                  <span className="mr-5 hover:text-gray-900">????????????</span>
                </Link>
              </>
            )}
            {session && session.user?.name && (
              <button className="mt-4 inline-flex items-center rounded border-0 bg-gray-100 py-1 px-3 text-sm hover:bg-gray-200 focus:outline-none md:mt-0">
                <b>{session?.user?.name || status}</b>??? ???????????????!
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
                      <span className="mr-5 hover:text-gray-900">
                        ????????? ??????
                      </span>
                    </li>
                  </Link>
                  <Link href="/boards">
                    <li className="w-full py-4 px-6">
                      <span className="mr-5 hover:text-gray-900">
                        ????????? ??????
                      </span>
                    </li>
                  </Link>

                  <button
                    className="mr-5 hover:text-gray-900"
                    onClick={() => signOut()}
                  >
                    <li className="w-full py-4 px-6">????????????</li>
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="mr-5 hover:text-gray-900"
                    onClick={() => signIn()}
                  >
                    <li className="w-full py-4 px-6">?????? ?????????</li>
                  </button>
                  <Link href="/users/login">
                    <li className="w-full py-4 px-6">
                      <span className="mr-5 hover:text-gray-900">?????????</span>
                    </li>
                  </Link>
                  <Link href="/users/register">
                    <li className="w-full py-4 px-6">
                      <span className="mr-5 hover:text-gray-900">????????????</span>
                    </li>
                  </Link>
                </>
              )}
              {session && session.user?.name && (
                <li className="w-full py-4 px-6">
                  <button className="inline-flex items-center rounded border-0 bg-gray-100 py-1 px-3 text-sm hover:bg-gray-200 focus:outline-none md:mt-0">
                    <b>{session?.user?.name || status}</b>??? ???????????????!
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
