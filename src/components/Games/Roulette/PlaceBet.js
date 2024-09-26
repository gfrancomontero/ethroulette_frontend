import { Button } from '@nextui-org/react';
import { useSelector } from 'react-redux';


export default function Roulette() {
  const canPlaceBet = useSelector((state) => state.bet.canPlaceBet);
  const currentBetSize = useSelector((state) => state.bet.currentBetSize)
  const showButton = canPlaceBet && currentBetSize > 0


  const handlePlaceBet = async () => {
  
    const response = await fetch('/api/placeBet/roulette', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ canPlaceBet, currentBetSize, showButton }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to place bet');
    }      


  }

  return(

      showButton && 
        <Button className="nextUiButton py-2 px-4 mt-4" onPress={() => handlePlaceBet()}>
          Place Bet ({currentBetSize} ETH)
        </Button>

  )
}