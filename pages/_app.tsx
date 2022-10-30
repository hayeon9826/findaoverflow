import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { useState } from 'react';
import { RecoilRoot } from 'recoil';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactQueryDevtools } from 'react-query/devtools';
function MyApp({
  Component,
  pageProps,
}: AppProps<{ session: Session; dehydratedState: DehydratedState }>) {
  const [queryClient] = useState(() => new QueryClient());
  const { dehydratedState, session } = pageProps;
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session as Session}>
          <RecoilRoot>
            <Hydrate state={dehydratedState}>
              <ToastContainer />
              <Component {...pageProps} />
            </Hydrate>
          </RecoilRoot>
        </SessionProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
