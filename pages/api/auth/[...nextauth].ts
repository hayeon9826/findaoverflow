import { db } from 'config/firebase';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { FirestoreAdapter } from '../../../utils/firebaseAdapter';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: '/users/login',
  },
  adapter: FirestoreAdapter({ db } as any),
  callbacks: {},
});
