// src/app/affiliates/[partners]/page.js

import Background from "@/components/shared/Background";
import Stats from './partnerComponents/stats';

export default async function AffiliatePannel({ params }) {
  const { partners: affiliateId } = params;

  if (!affiliateId) {
    console.error('Missing affiliateId parameter in URL');
    return;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const apiEndpoint = `${baseUrl}/api/getAffiliateInfo?affiliateId=${affiliateId}`;

  try {
    const response = await fetch(apiEndpoint, { method: 'GET' });

    // Check for Too Many Requests (429) status code and display custom message
    if (response.status === 429) {
      const errorData = await response.json();
      console.error('Too many requests from this user:', errorData.message);
      return (
        <div>
          <Background />
          <div className="w-full h-screen text-red-500 flex flex-col items-center justify-center">
            <p className="text-2xl font-overpass">{errorData.message}</p>
          </div>
        </div>
      );
    }

    // Handle non-200 responses that aren't 429 errors
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to fetch affiliate info:', errorData.message);
      return (
        <div>
          <Background />
          <div className="w-full h-screen text-green-500 flex flex-col items-center justify-center">
            <p className="text-2xl font-overpass">{errorData.message}</p>
          </div>
        </div>
      );
    }

    const data = await response.json();
    console.log('data received in page comp', data);
    return (
      <div>
        <Background />
        <Stats data={data} /> {/* Pass the received data to the Stats component */}
      </div>
    );
  } catch (error) {
    console.error('Error fetching affiliate info:', error);
    return (
      <div>
        <Background />
        <div className="w-full h-screen text-red-500 flex flex-col items-center justify-center">
          <p className="text-2xl font-overpass">{error.message}</p>
        </div>
      </div>
    );
  }
}
