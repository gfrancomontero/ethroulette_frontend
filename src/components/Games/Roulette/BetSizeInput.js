import React from 'react'

export default function BetSizeInput({ currentBetSize, setCurrentBetSize }) {
  const handleInputChange = (e) => setCurrentBetSize(e.target.value.replace(',', '.'))
  
  return (
    <input
      type="text"
      value={currentBetSize}
      placeholder="How much (ETH)"
      onChange={handleInputChange}
      className="text-center bg-transparent border border-gray-300 px-3 py-2 rounded-md w-full font-overpass"
    />
  )
}
