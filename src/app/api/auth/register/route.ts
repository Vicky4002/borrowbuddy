import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validators/auth";
import { hashPassword } from "@/lib/crypto";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid input", errors: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { fullName, username, email, password, profilePhoto } = parsed.data;

  const existingEmail = await prisma.user.findUnique({ where: { email } });
  if (existingEmail) {
    return NextResponse.json({ message: "Email already in use" }, { status: 409 });
  }

  const existingUsername = await prisma.user.findUnique({
    where: { username },
  });
  if (existingUsername) {
    return NextResponse.json(
      { message: "Username already in use" },
      { status: 409 }
    );
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name: fullName,
      username,
      email,
      passwordHash,
      image: profilePhoto,
      profile: {
        create: {
          profilePhoto,
        },
      },
    },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
    },
  });

  return NextResponse.json({ user }, { status: 201 });
}
