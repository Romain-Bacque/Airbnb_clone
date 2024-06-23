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
  const {
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
    description,
    title,
    price,
  } = body;

  for (let key in body) {
    if (!body[key]) {
      return NextResponse.json({ message: `${key} is required` }, { status: 400 }); // status code 400 is used to indicate a bad request
    }
  }

  const listing = await prisma.listing.create({
    data: {
      userId: currentUser.id,
      category,
      locationValue: location.value,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      description,
      title,
      price: parseInt(price, 10),
    },
  });

  return NextResponse.json(listing); // we can also use res.json(listing) here
}
