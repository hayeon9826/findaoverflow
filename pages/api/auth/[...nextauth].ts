import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { type: 'text' },
        password: { type: 'password' },
        name: { type: 'text' },
        id: { type: 'text' },
      },
      async authorize(credentials, req) {
        if (credentials) {
          const user = {
            email: credentials.email,
            name: credentials.name,
            uid: credentials.id,
          };
          if (user) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/users/login',
  },
  callbacks: {},
});
