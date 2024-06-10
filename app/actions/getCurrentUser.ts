// actions folder is used to store functions that interact with the database or external services, we can use these functions in our components to fetch data or perform actions. In this case, we have a getCurrentUser function that fetches the current user from the database using the session information. We can use this function in our layout component to get the current user and pass it as a prop to the NavBar component. This way, we can conditionally render different components based on the user's authentication status. For example, we can show the UserMenu component if the user is authenticated, or show the LoginModal and RegisterModal components if the user is not authenticated. This separation of concerns makes our code more modular and easier to maintain.

import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    return null;
  }
}
