// src/services/convertEthToUsd.js

export const fetchEthToUsdRate = async () => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
    const data = await response.json()
    return data.ethereum.usd
  } catch (error) {
    console.error('Error fetching the ETH to USD rate:', error)
    throw new Error('Failed to fetch ETH to USD rate')
  }
}
