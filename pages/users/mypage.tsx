import { Layout } from 'components/index';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { toast } from 'react-toastify';

const tabs = [
  { name: '계정 설정', href: '#', current: true },
  { name: '나의 포스트', href: '#', current: false },
  { name: '저장한 포스트', href: '#', current: false },
];

export default function mypage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <>
      <Layout>
        <div className="w-full bg-white pb-32">
          <div className="mx-auto flex max-w-4xl flex-col md:px-8 xl:px-0">
            <main className="flex-1">
              <div className="relative mx-auto max-w-4xl md:px-8 xl:px-0">
                <div className="pt-10 pb-16">
                  <div className="px-4 sm:px-6 md:px-0">
                    <h1 className="text-3xl font-extrabold">마이페이지</h1>
                  </div>
                  <div className="px-4 sm:px-6 md:px-0">
                    <div className="py-6">
                      <div className=" lg:block">
                        <div className="border-b border-gray-200">
                          <nav className="-mb-px flex space-x-8">
                            {tabs.map((tab) => (
                              <Link href={tab.href} key={tab.name}>
                                <a
                                  key={tab.name}
                                  className={cn(
                                    tab.current
                                      ? 'border-blue-500 text-blue-600'
                                      : 'border-transparent  hover:border-gray-300 hover:text-gray-700',
                                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                                  )}
                                >
                                  {tab.name}
                                </a>
                              </Link>
                            ))}
                          </nav>
                        </div>
                      </div>

                      {/* Description list with inline editing */}
                      <div className="mt-10 divide-y divide-gray-200">
                        <div className="space-y-1">
                          <h3 className="text-lg font-medium leading-6">
                            프로필
                          </h3>
                          <p className="max-w-2xl text-sm text-gray-500">
                            프로필 정보를 설정해주세요.
                          </p>
                        </div>
                        <div className="mt-6">
                          <dl className="divide-y divide-gray-200">
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                              <dt className="text-sm font-medium text-gray-500">
                                이름
                              </dt>
                              <dd className="mt-1 flex text-sm sm:col-span-2 sm:mt-0">
                                <span className="grow">
                                  {(session && session.user?.name) || status}
                                </span>
                                <span className="ml-4 shrink-0">
                                  <Link href="#">
                                    <button
                                      type="button"
                                      className="rounded-md font-medium text-blue-500 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                      수정
                                    </button>
                                  </Link>
                                </span>
                              </dd>
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                              <dt className="text-sm font-medium text-gray-500">
                                사진
                              </dt>
                              <dd className="mt-1 flex text-sm sm:col-span-2 sm:mt-0">
                                <span className="grow">
                                  <img
                                    className="h-8 w-8 rounded-full"
                                    src="https://cdn.finda.co.kr/images/favicon/finda_192.png"
                                    alt=""
                                  />
                                </span>
                                <span className="ml-4 flex shrink-0 items-start space-x-4">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      toast.error('서비스 준비중입니다.', {
                                        autoClose: 1000,
                                      })
                                    }
                                    className="rounded-md font-medium text-blue-500 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                  >
                                    수정
                                  </button>
                                </span>
                              </dd>
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                              <dt className="text-sm font-medium text-gray-500">
                                이메일
                              </dt>
                              <dd className="mt-1 flex text-sm sm:col-span-2 sm:mt-0">
                                <span className="grow">
                                  {(session && session.user?.email) || status}
                                </span>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>

                      <div className="mt-10 divide-y divide-gray-200">
                        <div className="space-y-1">
                          <h3 className="text-lg font-medium leading-6">
                            계정
                          </h3>
                          <p className="max-w-2xl text-sm text-gray-500">
                            계정을 관리해주세요.
                          </p>
                        </div>
                        <div className="mt-6">
                          <dl className="divide-y divide-gray-200">
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                              <dt className="text-sm font-medium text-gray-500">
                                로그아웃
                              </dt>
                              <dd className="mt-1 flex text-sm sm:col-span-2 sm:mt-0">
                                <span className="grow"></span>
                                <span className="ml-4 shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => signOut()}
                                    className="rounded-md font-medium text-blue-500 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                  >
                                    로그아웃
                                  </button>
                                </span>
                              </dd>
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                              <dt className="text-sm font-medium text-gray-500">
                                계정 탈퇴
                              </dt>
                              <dd className="mt-1 flex text-sm sm:col-span-2 sm:mt-0">
                                <span className="grow"></span>
                                <span className="ml-4 shrink-0">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      toast.error('서비스 준비중입니다.', {
                                        autoClose: 1000,
                                      })
                                    }
                                    className="rounded-md font-medium text-blue-500 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                  >
                                    탈퇴하기
                                  </button>
                                </span>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </Layout>
    </>
  );
}
