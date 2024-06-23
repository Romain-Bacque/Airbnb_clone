// route is used to define the API route for the register endpoint. This route is used to create a new user in the database. The route uses the POST method to handle the request. The request body is parsed as JSON, and the email, name, and password fields are extracted from the body. The password is hashed using bcrypt with a cost of 12 rounds. The hashed password is then stored in the database along with the email and name. The user object is returned as a JSON response.

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { totalPrice, startDate, endDate, listingId } = body;

  if (!totalPrice || !startDate || !endDate || !listingId) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 } // 400 is used to indicate a bad request
    );
  }

  const listingAndReservation = await prisma.listing.update({
    // this method is better than prisma.reservation.create because it allows us to update the listing with the new reservation (so we are sure that the reservation is created for the listing)
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json(listingAndReservation); // we can also use res.json(listing) here
}
