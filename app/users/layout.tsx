import React, { PropsWithChildren } from 'react';

function PostsLayout({ children }: PropsWithChildren<unknown>) {
  return <div>aaa{children}</div>;
}

export default PostsLayout;
