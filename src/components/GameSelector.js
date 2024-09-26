'use client';
import Roulette from './Games/Roulette/Roulette.js';
import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { useSelector } from 'react-redux';

export default function Game() {
  const canPlaceBet = useSelector((state) => state.bet.canPlaceBet);
  const currentBetSize = useSelector((state) => state.bet.currentBetSize)
  

  const showButton = canPlaceBet && currentBetSize > 0

  return (
    <div className="rb h-screen w-screen flex flex-col jca text-white">
      <p className="text-pink">Super-secure Web3 Micro-Casino</p>
      <p className="text-pink">A quick way to double your Ethereum</p>
      <Roulette />
      {showButton && 
        <Button className="nextUiButton py-2 px-4 mt-4">
          Place Bet ({currentBetSize} ETH)
        </Button>
      }
    </div>
  );
}
