import { Button } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function Roulette() {
  const { account, balance, canPlaceBet, currentBetSize, selectedColor } = useSelector((state) => ({
    account: state.metaMaskUser.account,
    balance: state.metaMaskUser.balance,
    canPlaceBet: state.bet.canPlaceBet,
    currentBetSize: state.bet.currentBetSize,
    selectedColor: state.bet.selectedColor,
  }));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const showButton = canPlaceBet && currentBetSize > 0;

  const handlePlaceBet = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error before placing the bet

      const response = await fetch('/api/placeBet/roulette', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ account, balance, currentBetSize, selectedColor }), // Removed canPlaceBet
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to place bet');
      }

      // Handle success (could show a success message, update UI, etc.)
      console.log('Bet placed successfully', data);
      
    } catch (err) {
      console.error('Error placing bet:', err);
      setError(err.message || 'Error placing bet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showButton && (
        <Button
          className="nextUiButton py-2 px-4 mt-4"
          onPress={handlePlaceBet}
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Placing Bet...' : `Bet ${currentBetSize} ETH on ${selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}`}
        </Button>
      )}
      {error && <p className="text-red-500 mt-2">Error: {error}</p>} {/* Show error message if exists */}
    </>
  );
}
