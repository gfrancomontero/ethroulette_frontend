import React, { useState, useEffect } from 'react'
import { fetchEthToUsdRate } from '@/services/convertEthToUsd' // Adjust path as necessary

export default function EarningsPotential({ betSize }) {
  const [ethToUsdRate, setEthToUsdRate] = useState(null)

  useEffect(() => {
    const getEthToUsdRate = async () => {
      try {
        const rate = await fetchEthToUsdRate()
        setEthToUsdRate(rate)
      } catch (error) {
        console.error(error.message)
      }
    }

    getEthToUsdRate()

  }, [])

  const formatNumber = (num, decimals) => parseFloat(Number(num).toFixed(decimals)).toLocaleString()

  const calculatePotentialEarnings = () => formatNumber(betSize * 2, 4) || 0
  const calculateUSDValue = () =>
    ethToUsdRate ? formatNumber(betSize * 2 * ethToUsdRate, 2) : 'Loading...'

  return (
    <div className="w-full pt-4 flex flex-col">
      <div className="flex justify-between mb-4">
        <p className="text-white-500 font-mono">You are betting:</p>
        <p className="text-white-500 font-mono">
        {formatNumber(betSize, 4)} ETH
        </p>
      </div>

      <div className="flex justify-between">
        <p className="text-green-500 font-mono">You can make:</p>
        <p className="text-green-500 font-mono">
          {calculatePotentialEarnings()} ETH
        </p>
      </div>

      <div className="flex justify-between">
        <p className="text-blue-500 font-mono">
        </p>
        <p className="text-blue-500 font-mono">
          = {calculateUSDValue()} USD
        </p>
      </div>
    </div>
  )
}
