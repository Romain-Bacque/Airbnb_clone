import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import NextAuth from "next-auth/next";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GiTHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/", // Add the sign-in page URL here (e.g., /auth/signin)
  },
  debug: process.env.NODE_ENV === "development", // it is used to display debug messages in the console when set to true (here, it is set to true only in development mode).
  session: {
    strategy: "jwt", // it is used to specify the session strategy. In this case, it is set to jwt.
  },
  secret: process.env.NEXTAUTH_SECRET, // it is used to specify the secret key used to encrypt the JWT token.
};

export default NextAuth(authOptions); // it is used to export the NextAuth function with the authOptions object as an argument. This function is used to initialize the NextAuth library with the specified options.