import { Button } from '@nextui-org/react';
import { useState } from 'react';
import { setCurrentBetSize, setUserWins, setAnnounceResult, setWinningColor } from '@/redux/slices/betSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function Roulette() {
  const dispatch = useDispatch();

  const { account, canPlaceBet, currentBetSize, selectedColor, userWins } = useSelector((state) => ({
    account: state.metaMaskUser.account,
    canPlaceBet: state.bet.canPlaceBet,
    currentBetSize: state.bet.currentBetSize,
    selectedColor: state.bet.selectedColor,
    userWins: state.bet.userWins,
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
        body: JSON.stringify({ account, currentBetSize, selectedColor }), // Removed canPlaceBet
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to place bet');
      }

      // Handle success
      console.log('Bet placed successfully', data);
      
      // Update Redux state
      dispatch(setWinningColor(data.winningColor));
      dispatch(setCurrentBetSize(''));
      dispatch(setUserWins(data.userWins));
      // show the result component
      dispatch(setAnnounceResult(true));

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
