
import React from 'react'
import Background from './Background'
import DefineBet from './DefineBet'
import PlaceBet from './PlaceBet'


export default function Roulette() {
  return(
    <div className="relative gamecontainer flex flex-col items-center justify-end h-[500px] w-[500px]">
      <Background />
      <DefineBet />
      <PlaceBet />
    </div>
  )
}