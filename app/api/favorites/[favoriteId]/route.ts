// route is used to define the API route for the register endpoint. This route is used to create a new user in the database. The route uses the POST method to handle the request. The request body is parsed as JSON, and the email, name, and password fields are extracted from the body. The password is hashed using bcrypt with a cost of 12 rounds. The hashed password is then stored in the database along with the email and name. The user object is returned as a JSON response.

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  req: Request,
  { params }: { params: { favoriteId: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.favoriteIds.includes(params.favoriteId)) {
    throw new Error("Invalid ID");
  }

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds: [...currentUser.favoriteIds, params.favoriteId],
    },
  });

  return NextResponse.json(user); // we can also use res.json(user) here
}

export async function DELETE(
  req: Request,
  { params }: { params: { favoriteId: string } }
) {
  const currentUser = await getCurrentUser();
  const { favoriteId } = params;

  if (!currentUser || !currentUser.favoriteIds.includes(favoriteId)) {
    throw new Error("Invalid ID");
  }

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds: currentUser.favoriteIds.filter((id) => id !== favoriteId),
    },
  });

  return NextResponse.json(user); // we can also use res.json(user) here
}
