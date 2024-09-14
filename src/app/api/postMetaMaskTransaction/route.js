// src/app/api/postMetaMaskTransaction/route.js

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Parse the transaction data from the request body
    const transaction = await request.json();

    console.log('Next Server has received transaction data:', transaction);
    
    // Fetch the backend API URL and API KEY from env 
    const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API;
    const apiKey = process.env.BACKEND_API_KEY;

    // Log the backend URL and API key for debugging

    const response = await fetch(`${backendApiUrl}/api/users/processDeposit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(transaction),
    });

    // Log the response status and response body for debugging
    console.log('Backend response status:', response.status);
    const responseData = await response.json();
    console.log('Backend response data:', responseData);

    if (!response.ok) {
      throw new Error('TRANSACTION AA FAILED to send transaction to backend');
    }

    // Return the successful result
    return NextResponse.json({ message: 'Transaction data received successfully', result: responseData });
  } catch (error) {
    console.error('Error processing transaction data:', error);
    return NextResponse.json({ message: 'Error processing transaction data', error }, { status: 500 });
  }
}
