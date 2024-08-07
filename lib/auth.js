import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import prisma from '@/lib/prisma'; // Adjust the path to your Prisma client

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),

    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        // Query the database for the user
        const foundUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!foundUser) {
          throw new Error("User not found");
        }

        // Check the hashed password
        const correctPassword = await bcrypt.compare(credentials.password, foundUser.password);

        if (!correctPassword) {
          throw new Error("Invalid password");
        }

        return foundUser;
      },
      callbacks: {
        async signIn({ user }) {
          if (!user.email?.endsWith(process.env.ALLOWED_DOMAIN)) {
            throw new Error("You are not allowed to access this platform");
          }
          return true;
        },

        jwt: async ({ token, user }) => {
          if (user) {
            token.role = user.role; // Adjust if your user model has roles
          }
          return token;
        },
        async session({ session, token }) {
          if (session.user) {
            session.user.role = token.role; // Adjust if your user model has roles
          }
          return session;
        },
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV !== "production",
};
