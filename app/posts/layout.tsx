import React, { PropsWithChildren } from 'react';

function PostsLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="flex min-h-screen justify-center">
      <section className="container mx-auto mt-12 max-w-3xl pb-24 text-left">
        <h2 className="flex max-w-3xl justify-between text-3xl font-bold">
          핀다 Tech 포스트
        </h2>
        <div className="container mx-auto mt-12 pb-24 text-left">
          {children}
        </div>
      </section>
    </div>
  );
}

export default PostsLayout;
