'use client';
import Roulette from './Games/Roulette/Roulette.js'
import { useState } from 'react'
import {Button} from "@nextui-org/react";

export default function Game() {
  const [betSize, setBetSize] = useState(0)

  return (
    <div className="rb h-screen w-screen flex flex-col jca text-white">
      <p className="text-pink">Super-secure Web3 Micro-Casino</p>
      <p className="text-pink">A quick way to double your Ethereum</p>
      <Roulette setBetSize={setBetSize} />
      <Button className="nextUiButton py-2 px-4 mt-4">
        Place Bet ({betSize} ETH)
      </Button>
    </div>
  );
}