import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { signIn as firebaseSignIn, signInWithGoogle } from "../../../lib/service"
import bcrypt from "bcryptjs"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        
        const user: any = await firebaseSignIn(credentials.email)
        
        if (user && user.password) {
          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
          if (isPasswordCorrect) {
            return { 
              id: user.id, 
              name: user.username, 
              email: user.email, 
              role: user.role 
            }
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.role = token.role
      }
      return session
    },
    async signIn({ user, account }: any) {
      if (account.provider === "google") {
        const data = {
          email: user.email,
          username: user.name,
          image: user.image,
        }
        await signInWithGoogle(data, (result: any) => {
          return result.status
        })
      }
      return true
    }
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }