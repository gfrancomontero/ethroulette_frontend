import React from 'react'
import Background from './Background'
import Betplacing from './Betplacing'

export default function Roulette() {
  return(
    <div className="relative gamecontainer flex flex-col items-center justify-end h-[500px] w-[500px]">
      <Background />
      <Betplacing />
    </div>
  )
}