import {
  getServerSession,
  type DefaultUser,
  type NextAuthOptions,
} from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid: string
  }
}

export const authOptions: NextAuthOptions = {
  // @ts-ignore
  // adapter: PrismaAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid
      }
      return session
    },
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        token.uid = user.id
      }
      if (trigger === "update") {
        return { ...token, ...session.user }
      }
      return { ...token, ...user }
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/api/auth/error",
  },
}

export const getUserSession = async () => {
  const session = await getServerSession(authOptions)
  return session?.user
}
