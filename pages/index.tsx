import type { NextPage } from "next";
import { useSession, signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { dehydrate, QueryClient } from "react-query";
import InputElement from "../components/InputElement";
import NameLengthElement from "../components/NameLengthElement";
import { fetchPosts } from "../hooks/usePosts";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>핀다오버플로우</title>
        <link
          rel="icon"
          href="https://cdn.finda.co.kr/images/favicon/finda_192.png"
        />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        {session && session.user?.name ? (
          <h1 className="text-6xl font-bold">
            {session?.user?.name || status}님 환영합니다!
          </h1>
        ) : (
          <>
            <h1 className="pb-8 text-6xl font-bold">로그인 해주세요!</h1>
            <div className="flex flex-col justify-center gap-5">
              <InputElement />
              <NameLengthElement />
              <button
                className="h-8 animate-bounce shadow-md"
                onClick={() => signIn()}
              >
                로그인하기
              </button>
            </div>
          </>
        )}
      </main>
      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://finda.co.kr"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <Image
            src="https://cdn.finda.co.kr/images/favicon/finda_192.png"
            alt="Finda Logo"
            width={60}
            height={60}
          />
        </a>
      </footer>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["posts", 10], () => fetchPosts());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
