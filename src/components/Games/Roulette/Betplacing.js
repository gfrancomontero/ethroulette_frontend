import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@nextui-org/react'
import styles from './Betplacing.module.scss'
import EarningsPotential from './EarningsPotential'
import BetSizeInput from './BetSizeInput'
import BetSizeController from './BetSizeController'
import { setCurrentBetSize, setCanPlaceBet } from '@/redux/slices/betSlice'

export default function Betplacing() {
  const dispatch = useDispatch()
  const currentBetSize = useSelector((state) => state.bet.currentBetSize)
  const canPlaceBet = useSelector((state) => state.bet.canPlaceBet)
  const [selectedColor, setSelectedColor] = useState('')

  return (
    <div className="border border-pink-500 rounded-lg flex flex-col justify-center items-center backdrop-blur-md p-4 z-10">
      <div className="text-center">
        <p>Please Select:</p>
        <div className="flex justify-center mt-2 mb-2">
          {['red', 'black'].map((color) => (
            <Button
              key={color}
              onPress={() => setSelectedColor(color)}
              className={`${styles[color]} ${styles.colorOption} ${
                selectedColor === color && styles.selected
              }`}
            >
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </Button>
          ))}
        </div>

        {/* Bet Size Input Component */}
        <BetSizeInput
          currentBetSize={currentBetSize}
          setCurrentBetSize={(size) => dispatch(setCurrentBetSize(size))}
        />

        {/* Earnings Potential Component */}
        {currentBetSize > 0 && canPlaceBet && <EarningsPotential betSize={currentBetSize} />}
        
        {/* Bet Size Controller to check if the bet can be placed */}
        <BetSizeController 
          canPlaceBet={canPlaceBet}
          setCanPlaceBet={(canBet) => dispatch(setCanPlaceBet(canBet))}
          currentBetSize={currentBetSize}
        />
      </div>
    </div>
  )
}
