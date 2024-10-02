import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import EarningsPotential from './EarningsPotential'
import BetSizeInput from './BetSizeInput'
import BetSizeController from './BetSizeController'
import { setCurrentBetSize } from '@/redux/slices/betSlice'
import ColorPicker from './ColorPicker' // Import ColorPicker

export default function DefineBet() {
  const dispatch = useDispatch()
  const currentBetSize = useSelector((state) => state.bet.currentBetSize)
  const canPlaceBet = useSelector((state) => state.bet.canPlaceBet)
  
  return (
    <div className="border border-pink-500 rounded-lg flex flex-col justify-center items-center backdrop-blur-md p-4 z-10">
      <div className="text-center">
        <p>Please Select:</p>

        {/* ColorPicker Component */}
        <ColorPicker />

        {/* Bet Size Input Component */}
        <BetSizeInput
          currentBetSize={currentBetSize}
          setCurrentBetSize={(size) => dispatch(setCurrentBetSize(size))}
        />

        {/* Earnings Potential Component */}
        {currentBetSize > 0 && canPlaceBet && <EarningsPotential betSize={currentBetSize} />}
        
        {/* Bet Size Controller to check if the bet can be placed */}
        <BetSizeController />

      </div>
    </div>
  )
}
