import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import prisma from "@/lib/prisma"; // Adjust the path to your Prisma client

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

        // Query the database for the user and include the role
        const foundUser = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            email: true,
            password: true,
            role: true,
            name: true,
            image: true,
          }, // Include role and name in the selection
        });

        if (!foundUser) {
          throw new Error("User not found");
        }

        // Check the hashed password
        const correctPassword = await bcrypt.compare(
          credentials.password,
          foundUser.password
        );

        if (!correctPassword) {
          throw new Error("Invalid password");
        }

        // Return the user object with the role included
        return {
          email: foundUser.email,
          name: foundUser.name, // Add name if necessary
          role: foundUser.role,
          image: foundUser.image, // Add image if necessary
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Add role to the token
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("Token role in session:", token.role);
      if (session.user) {
        session.user.role = token.role; // Add role to the session
      }
      console.log("Session ", session);
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV !== "production",
};
