// src/services/convertEthToUsd.js

export const fetchEthToUsdRate = async () => {
  const cacheKey = 'ethUsdRate';
  const cacheExpirationKey = 'ethUsdRateTimestamp';
  const cacheDuration = 3 * 60 * 1000; // 3 minutes in milliseconds

  // Retrieve stored data from localStorage
  const cachedRate = localStorage.getItem(cacheKey);
  const cachedTimestamp = localStorage.getItem(cacheExpirationKey);

  // Check if the cached rate exists and is not older than 3 minutes
  if (cachedRate && cachedTimestamp) {
    const now = new Date().getTime();
    if (now - cachedTimestamp < cacheDuration) {
      return parseFloat(cachedRate); // Return the cached rate
    }
  }

  // If no valid cached rate, fetch from the API
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const data = await response.json();
    const ethUsdRate = data.ethereum.usd;

    // Store the new rate and timestamp in localStorage
    localStorage.setItem(cacheKey, ethUsdRate.toString());
    localStorage.setItem(cacheExpirationKey, new Date().getTime().toString());

    return ethUsdRate;
  } catch (error) {
    console.error('Error fetching the ETH to USD rate:', error);
    throw new Error('Failed to fetch ETH to USD rate');
  }
};
