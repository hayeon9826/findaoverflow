'use client';

import { LayoutType } from 'config/interface';
import Footer from './Footer';
import Header from './Header';

export const Layout = ({
  noFooter = false,
  className,
  children,
}: LayoutType) => {
  return (
    <>
      <Header />
      <div
        className={
          className || `flex min-h-screen flex-col items-center justify-center`
        }
      >
        {children}
      </div>
      {!noFooter && <Footer />}
    </>
  );
};
