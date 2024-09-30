import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAnnounceResult } from '@/redux/slices/betSlice';

export default function AnnounceResult() {
  const announceResult = useSelector((state) => state.bet.announceResult)
  const userWins = useSelector((state) => state.bet.userWins)
  const winningColor = useSelector((state) => state.bet.winningColor)
  const selectedColor = useSelector((state) => state.bet.selectedColor)
  const dispatch = useDispatch();

  return (
    announceResult && (
      <div className="z-50 fixed top-0 left-0 h-screen w-full flex flex-col jca text-white bg-black rb">
        <div className="text-2xl">
          {userWins ? 'YOU HAVE WON' : 'YOU HAVE LOST' }
          <br />
          You chose {selectedColor} and {winningColor} won
        </div>
        <button onClick={() => dispatch(setAnnounceResult(false))}>OK</button>
      </div>
    )
  )
}