'use client';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <p>에러가 발생했습니다.!</p>
      <button onClick={() => reset()}>새로고침</button>
    </div>
  );
}
