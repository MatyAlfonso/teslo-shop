import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { dbUsers } from "../../../database";


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
      },
      async authorize(credentials) {
        console.log({ credentials });

        return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password);
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  //Custom Pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },

  // Callbacks
  session: {
    maxAge: 2592000, // 30 days
    strategy: 'jwt',
    updateAge: 86400 // 1 day
  },

  callbacks: {
    async jwt({ token, account, user }) {
      /* console.log({token, account, user}); */
      if (account) {
        token.accesToken = account.access_token;

        switch (account.type) {

          case 'oauth':
            token.user = await dbUsers.oAuthToDbUser(user?.email || '', user?.name || '');
            break;

          case 'credentials':
            token.user = user;
            break;
        }
      }

      return token;
    },
    async session({ session, token, user }) {
      /* console.log({ session, token, user }); */
      session.accessToken = token.accesToken;
      session.user = token.user as any;

      return session;
    }
  }
});
