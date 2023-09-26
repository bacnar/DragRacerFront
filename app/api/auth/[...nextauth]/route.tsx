import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import configData from "../../../../app.config.json";

interface LoginResponse {
  AccessToken: string
}


const handler = NextAuth({
  /*secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
  },*/
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(configData.API_URL + "Auth/login", {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          })

          if (response.status != 200 || response.ok === false) {
            console.error("Error getting data, error:", await response.text());
            return null
          }

          const data = await response.json()
          return data
        } catch (error) {
          throw new Error('Invalid username or password');
        }
      },
    }),
  ],
  /*pages: {
    signIn: '/api/auth/signin'
  },*/
  // Stayed here
  callbacks: {
    jwt: async ({token, account, user}) => {
      if (user) {
        token.accessToken = (user as any).accessToken
      }
      return token
    },
    session: async ({session, token}) => {
      session.user = {name: "admin", token: token.accessToken as string}
      console.log(session)
      return session
    },
  },
  //secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST }