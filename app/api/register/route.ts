import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, name, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12); // Hash the password using bcrypt with a cost of 12 rounds (the higher the cost, the more secure the hash, because it takes longer to compute)

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
