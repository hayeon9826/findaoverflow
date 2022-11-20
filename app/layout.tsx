import { getSession } from 'next-auth/react';
import React, { PropsWithChildren, use } from 'react';
import '../styles/globals.css';
import RootAppLayout from './RootAppLayout';

function RootLayout({ children }: PropsWithChildren<unknown>) {
  const session = use(getSession());
  return (
    <html>
      <body>
        <RootAppLayout session={session}>{children}</RootAppLayout>
      </body>
    </html>
  );
}

export default RootLayout;
