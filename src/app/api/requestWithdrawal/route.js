// src/app/api/requestWithdrawal/route.js

export const POST = async (req) => {
  try {
    console.log('Received POST request to /api/requestWithdrawal');
    
    // Parse the request body using req.json() to extract `address` and `amount`
    const { address, amount } = await req.json();
    console.log('Parsed request body:', { address, amount });

    // Check if address and amount are provided and valid
    if (!address || !amount || isNaN(amount) || parseFloat(amount) <= 0) {
      console.error('Invalid address or amount in request:', { address, amount });
      return new Response(JSON.stringify({ success: false, error: 'Invalid address or amount' }), { status: 400 });
    }

    // Verify environment variables are correctly loaded
    const apiKey = process.env.BACKEND_API_KEY;
    const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    if (!apiKey || !backendApiUrl) {
      console.error('Missing BACKEND_API_KEY or NEXT_PUBLIC_BACKEND_API_URL in environment variables.');
      return new Response(JSON.stringify({ success: false, error: 'Server configuration error' }), { status: 500 });
    }

    console.log('Environment variables loaded successfully.');
    console.log('Sending request to back-end:', backendApiUrl);

    // Send the withdrawal request to your Express.js back-end
    const response = await fetch(`${backendApiUrl}/api/withdraw`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ address, amount }),
    });

    const result = await response.json();

    // Log the back-end response for debugging purposes
    console.log('Back-end response:', result);

    // Handle the response according to the server response status
    if (response.ok) {
      return new Response(JSON.stringify({ success: true, transaction: result }), { status: 200 });
    } else {
      console.error('Back-end error:', result.error);
      return new Response(JSON.stringify({ success: false, error: result.error }), { status: response.status });
    }
  } catch (error) {
    // Log any errors caught during processing
    console.error('Error processing withdrawal request:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
};
