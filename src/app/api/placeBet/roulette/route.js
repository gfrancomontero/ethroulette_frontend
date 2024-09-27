import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Parse the data from the client-side request body
    const { account, currentBetSize, selectedColor } = await request.json();

    // Fetch the backend API URL and API Key from environment variables
    const backendApiUrl = process.env.BACKEND_API_URL;  // Moved to backend-only environment variable
    const apiKey = process.env.BACKEND_API_KEY;

    if (!backendApiUrl || !apiKey) {
      throw new Error('Missing backend API configuration');
    }

    // Forward the request to your Express backend
    const response = await fetch(`${backendApiUrl}/api/placeBet/roulette`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ account, currentBetSize, selectedColor }),
    });

    // Try to parse the response
    const responseData = await response.json();

    console.error('Backend Response:', responseData);
    if (!response.ok) {
      // Log the backend response and forward the error
      return NextResponse.json(responseData, { status: response.status });
    }

    // Return the successful result to the frontend
    return NextResponse.json(responseData, { status: 200 });

  } catch (error) {
    console.error('Error placing bet:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
