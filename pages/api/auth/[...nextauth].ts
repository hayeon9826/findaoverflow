import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 2,
    updateAge: 60 * 60,
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
            id: credentials.id,
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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.name = token.name || '';
      session.user.image = token.picture || '';
      session.user.email = token.email || '';
      return session;
    },
  },
});
