import React, { PropsWithChildren } from 'react';
import '../styles/globals.css';
import RootAppLayout from './RootAppLayout';

function RootLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <html>
      <body>
        <RootAppLayout>{children}</RootAppLayout>
      </body>
    </html>
  );
}

export default RootLayout;
