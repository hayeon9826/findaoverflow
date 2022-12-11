'use client';

import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

function PostsLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="container mx-auto mt-12 max-w-3xl px-4 pb-24 text-left">
      <section className="container mx-auto mt-12 max-w-3xl pb-24 text-left">
        <h2 className="flex max-w-3xl justify-between text-3xl font-bold">
          핀다 Tech 포스트
          <Link href="/posts/new">
            <button
              type="button"
              className="mr-2 mb-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              포스트 작성
            </button>
          </Link>
        </h2>
        <div className="container mx-auto mt-12 pb-24 text-left">
          {children}
        </div>
      </section>
    </div>
  );
}

export default PostsLayout;
