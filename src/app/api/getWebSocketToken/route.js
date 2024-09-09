// src/app/api/getWebSocketToken/route.js

import { NextResponse } from 'next/server';

export async function POST() {
  // Retrieve the secret key from the environment (server-side only)
  const serverKey = process.env.SOCKET_SECRET_KEY;

  // You can perform additional validation here if necessary

  // Generate a simple "token" - this could be a JWT or another form of token
  const token = serverKey;  // For simplicity, we'll return the server key as the token

  // Return the token as a JSON response
  return NextResponse.json({ token });
}
