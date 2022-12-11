'use client';
import ReactQueryWrapper from 'components/reactQueryWrapper';
import { Layout } from 'components/RootLayout';
import { Session } from 'next-auth';
import { getSession, SessionProvider as Provider } from 'next-auth/react';
import React, { PropsWithChildren, use } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';

function SessionProvider({ children }: PropsWithChildren<unknown>) {
  const session = use(getSession());
  return (
    <Provider session={session as Session}>
      <RecoilRoot>
        <ReactQueryWrapper>
          <ToastContainer />
          <Layout>{children}</Layout>
          <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryWrapper>
      </RecoilRoot>
    </Provider>
  );
}

export default SessionProvider;
