import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBalance } from '@/redux/actions/metaMaskActions';  // Import the correct fetchBalance action

export default function Balance({ account }) {
  const dispatch = useDispatch();
  const rouletteBalance = useSelector((state) => state.metaMask.balance);  // Fetch balance from Redux state
  const errorMessage = useSelector((state) => state.metaMask.error);       // Fetch error from Redux state
  const loading = useSelector((state) => state.metaMask.loading);          // Fetch loading state from Redux

  // Fetch the balance when the component mounts or when the account changes
  useEffect(() => {
    if (account) {
      dispatch(fetchBalance(account));
    }
  }, [account, dispatch]);

  if (loading) {
    return <p>Loading balance...</p>;  // Show loading message while fetching data
  }

  return (
    <div className="p-2 text-end w-full">
      <h3 className="text-sm font-overpass">Your EthRoulette Balance:</h3>

      {/* Show Roulette balance (from Redux) */}
      <p className={`text-sm font-overpass mt-2 text-${rouletteBalance === 0 ? 'red' : 'green'}-500`}>
        {errorMessage ? (
          <span className="text-red-500">{errorMessage}</span>
        ) : (
          `${rouletteBalance} ETH`
        )}
      </p>

      {/* Show deposit warning if balance is 0 */}
      {rouletteBalance === 0 && !errorMessage && (
        <p className="text-red-500 mt-4">YOU MUST DEPOSIT FUNDS BEFORE YOU CAN PLAY</p>
      )}
    </div>
  );
}
