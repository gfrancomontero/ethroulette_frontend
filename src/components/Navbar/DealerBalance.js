import { useSelector } from 'react-redux';
import { useDealerBalance } from '../../hooks/useDealerBalance';

export default function DealerBalance() {
  useDealerBalance();  // Initialize the WebSocket connection and listen for updates

  const dealerBalance = useSelector((state) => state.dealerBalance.balance);
  const isConnected = useSelector((state) => state.dealerBalance.isConnected);


  return (
    <div className="w-full text-start">
      <p className="text-sm font-overpass">Dealers Balance:</p>

      {isConnected ? (
        <p className="text-blue-500 font-mono">
          {dealerBalance !== null ? `${dealerBalance} ETH` : 'Loading...'}
        </p>
      ) : (
        <p className="text-red-500">Socket Error</p>
      )}
    </div>
  );
}
