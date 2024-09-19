import React from 'react'
import { useSelector } from 'react-redux'

export default function BetSizeController() {
  const canPlaceBet = useSelector((state) => state.bet.canPlaceBet)
  const currentBetSize = useSelector((state) => state.bet.currentBetSize)

  return (
    <>
      {!canPlaceBet && (
        <div className="text-red-500">
          <p>Can't place bet. Reason(s):</p>
          <p>Bet size must be between 0 and 1 ETH.</p>
        </div>
      )}
    </>
  )
}
