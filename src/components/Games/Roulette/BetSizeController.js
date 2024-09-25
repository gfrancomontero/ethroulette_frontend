import { setCanPlaceBet } from '@/redux/slices/betSlice'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'


export default function BetSizeController() {
  const dispatch = useDispatch()
  const canPlaceBet = useSelector((state) => state.bet.canPlaceBet)
  const currentBetSize = useSelector((state) => state.bet.currentBetSize)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    console.log('Current Bet size', currentBetSize)
    const betSize = parseFloat(currentBetSize)
    // HERE THIS IS THE MODIFIER
    betSize == 0 && dispatch(setCanPlaceBet(false))
    betSize == undefined && dispatch(setCanPlaceBet(false))
    dispatch(setCanPlaceBet(betSize < 2))
    // HERE THIS IS THE MODIFIER

    setShowError(!canPlaceBet && currentBetSize)

  },[currentBetSize, dispatch, setShowError, canPlaceBet])
  

  return (
    <>
      {showError && (
        <div className="text-red-500">
          <p>Can&apos;t place bet. Reason(s):</p>
          <p>Bet size must be between 0 and 1 ETH.</p>
          <p>Current Bet Size is {currentBetSize}</p>
        </div>
      )}
    </>
  )
}
