'use client';

import ReactQueryWrapper from 'components/reactQueryWrapper';
import { Layout } from 'components/RootLayout';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React, { PropsWithChildren } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';

function RootAppLayout({
  children,
  session,
}: PropsWithChildren<{ session: Session | null }>) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <ReactQueryWrapper>
          <ToastContainer />
          <Layout>{children}</Layout>
          <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryWrapper>
      </RecoilRoot>
    </SessionProvider>
  );
}

export default RootAppLayout;
