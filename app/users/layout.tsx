import React, { PropsWithChildren } from 'react';

function PostsLayout({ children }: PropsWithChildren<unknown>) {
  return <div>{children}</div>;
}

export default PostsLayout;
