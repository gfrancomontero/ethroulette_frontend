// src/components/Navbar/BalanceManager.js

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useBalanceManager } from '../../hooks/useBalanceManager.js';  // Correct hook import

export default function DealerBalance() {
  useBalanceManager();  // Initialize the WebSocket connection and listen for updates

  const dealerBalance = useSelector((state) => state.dealerBalance.balance);
  const totalUserBalances = useSelector((state) => state.dealerBalance.totalUserBalances);
  const effectiveDealerBalance = useSelector((state) => state.dealerBalance.effectiveDealerBalance);
  const isConnected = useSelector((state) => state.dealerBalance.isConnected);

  // Local state to manage the loading state and prevent flicker
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);  // After 1 second, stop loading and show the actual status
    }, 1000);  // Grace period of 1 second

    return () => clearTimeout(timeout);  // Cleanup the timeout on component unmount
  }, []);

  return (
    <div className="w-full text-start">
      <p className="text-sm font-overpass">Balance Under Management:</p>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <>
          {isConnected ? (
            <div>
              <p className="text-blue-500 font-mono">In Custody: {dealerBalance !== null ? `${dealerBalance} ETH` : 'Loading dealer balance...'}</p>
              <p className="text-green-500 font-mono">From Players: {totalUserBalances !== null ? `${totalUserBalances} ETH` : 'Loading user balances...'}</p>
              <p className="text-purple-500 font-mono">Available to Gamble: {effectiveDealerBalance !== null ? `${effectiveDealerBalance} ETH` : 'Calculating...'}</p>
            </div>
          ) : (
            <p className="text-red-500">Socket Error: Unable to connect</p>
          )}
        </>
      )}
    </div>
  );
}
