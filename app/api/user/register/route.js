// pages/api/user/register.js

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust the path to your prisma client
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { name, email, password } = reqBody;

    // Check if the user already exists in the database
    const foundUser = await prisma.user.findUnique({
      where: { email },
    });

    if (foundUser) {
      return NextResponse.json({
        status: 'fail',
        message: 'User already exists',
      });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user in the database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        image: '/images/avatar/avatar-3.jpg', // Use the string path for the image
      },
    });

    return NextResponse.json({
      status: 'success',
      message: 'User created successfully',
      data: newUser,
    });
  } catch (e) {
    console.error('An error occurred:', e);
    return NextResponse.json({
      status: 'fail',
      message: 'Something went wrong',
      data: e.message,
    });
  }
}
