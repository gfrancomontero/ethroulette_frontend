import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAnnounceResult } from '@/redux/slices/betSlice';
import UserWins from './AnnounceResult/UserWins';
import UserLoses from './AnnounceResult/UserLoses';

export default function AnnounceResult() {
  const dispatch = useDispatch();

  const announceResult = useSelector((state) => state.bet.announceResult)
  const userWins = useSelector((state) => state.bet.userWins)
  const winningColor = useSelector((state) => state.bet.winningColor)
  const selectedColor = useSelector((state) => state.bet.selectedColor)
  const lastBetSize = useSelector((state) => state.bet.lastBetSize)

  return (
    announceResult && (
      userWins ? (
        <UserWins selectedColor={selectedColor} winningColor={winningColor} lastBetSize={lastBetSize} onPress={() => dispatch(setAnnounceResult(false))} userWins={userWins} />
      ) : (
        <UserLoses selectedColor={selectedColor} winningColor={winningColor} lastBetSize={lastBetSize} onPress={() => dispatch(setAnnounceResult(false))} userWins={userWins} />
      )
    )
  )
}