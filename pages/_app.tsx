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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({
  Component,
  pageProps,
}: AppProps<{ session: Session; dehydratedState: DehydratedState }>) {
  const [queryClient] = useState(() => new QueryClient());
  const { dehydratedState, session } = pageProps;
  return (
    <SessionProvider session={session as Session}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={dehydratedState}>
            <ToastContainer />
            <Component {...pageProps} />
          </Hydrate>
        </QueryClientProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
