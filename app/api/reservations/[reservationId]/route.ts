import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { reservationId: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error(); // NextResponse.error() is used to return a 500 status code (Internal Server Error), the diff compare to NextResponse.json() is that it doesn't return a JSON response
  }
  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid ID"); //  throw new Error is used to throw an error, which will be caught by the error handler. Compare to NextResponse.error(), it will return a 500 status code (Internal Server Error) and a JSON response with the error message. It's similar to NextResponse.json({ message: "Invalid ID" }, { status: 500 })
  }

  await prisma.reservation.delete({
    where: {
      id: reservationId,
      OR: [
        {
          userId: currentUser.id, // user can cancel reservation
        },
        {
          listing: {
            userId: currentUser.id, // host (owner of the listing) can also cancel reservation
          },
        },
      ],
    },
  });

  return NextResponse.json({ message: "Reservation cancelled" });
}
