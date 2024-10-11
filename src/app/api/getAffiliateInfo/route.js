// src/app/api/getAffiliateInfo/route.js

import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Get the query parameters from the request URL
    const url = new URL(request.url);
    const affiliateId = url.searchParams.get('affiliateId');

    if (!affiliateId) {
      return NextResponse.json({ message: 'Missing affiliateId parameter' }, { status: 400 });
    }

    console.log('Affiliate ID received in Next.js API route:', affiliateId);

    // Fetch the backend API URL and API Key from environment variables
    const backendApiUrl = process.env.BACKEND_API_URL;
    const apiKey = process.env.BACKEND_API_KEY;

    if (!backendApiUrl || !apiKey) {
      throw new Error('Missing backend API configuration');
    }

    // Forward the request to your Express backend (using query parameter)
    const response = await fetch(`${backendApiUrl}/api/affiliateInfo?affiliateId=${affiliateId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    // Log the response to see if it is coming correctly from the backend
    console.log('Response from Express backend:', response);

    // Check if the response is not JSON (often happens with HTML error pages)
    const contentType = response.headers.get('content-type');
    if (!contentType.includes('application/json')) {
      console.error('Expected JSON response but received:', contentType);
      const errorText = await response.text(); // Read the response text for debugging
      console.error('Response Text:', errorText);
      throw new Error('Invalid response type from backend. Expected JSON.');
    }

    // Parse the response
    const responseData = await response.json();

    if (!response.ok) {
      return NextResponse.json(responseData, { status: response.status });
    }

    // Return the successful result to the frontend
    return NextResponse.json(responseData, { status: 200 });

  } catch (error) {
    console.error('Error fetching affiliate info:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
