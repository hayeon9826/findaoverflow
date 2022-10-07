import { signIn, useSession } from 'next-auth/react';

function LoginPage() {
  const { data: session } = useSession();

  return (
    <div>
      {!session && <button onClick={() => signIn()}>구글로 로그인하기</button>}
    </div>
  );
}

export default LoginPage;
