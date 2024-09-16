// src/app/api/verifyUser/route.js

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Parse the walletAddress from the request body
    const { walletAddress } = await request.json();

    if (!walletAddress) {
      return NextResponse.json({ message: 'Wallet address is required' }, { status: 400 });
    }

    // Fetch the backend API URL and API KEY from environment variables
    const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    const apiKey = process.env.BACKEND_API_KEY;

    // Log for debugging (optional)
    console.log('Backend API URL:', backendApiUrl);
    console.log('API Key:', apiKey);

    // Forward the request to your Express backend
    const response = await fetch(`${backendApiUrl}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ walletAddress }),
    });

    // Parse the response from the backend
    const responseData = await response.json();

    // Log the response status and data for debugging (optional)
    console.log('Backend response status:', response.status);
    console.log('Backend response data:', responseData);

    if (!response.ok) {
      // Forward the error message from the backend
      return NextResponse.json(responseData, { status: response.status });
    }

    // Return the successful result to the front-end
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error('Error verifying user:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
