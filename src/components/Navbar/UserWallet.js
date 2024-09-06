// src/components/Navbar/UserWallet.js

import { useState, useEffect } from 'react';
import { getAccountBalance } from '../../services/Web3Service';
import { useSelector } from 'react-redux';

export default function DepositComponent() {
  const account = useSelector((state) => state.metaMask.account);
  const [metamaskBalance, setMetamaskBalance] = useState(0); // User's MetaMask balance
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch the MetaMask balance for the connected account
  const fetchMetaMaskBalance = async () => {
    try {
      const balance = await getAccountBalance(account);
      setMetamaskBalance(balance); // Display only 8 characters
    } catch (error) {
      console.error('Failed to get MetaMask balance:', error);
      setErrorMessage('Failed to get MetaMask balance.');
    }
  };

  // Automatically fetch MetaMask balance when the component mounts
  useEffect(() => {
    fetchMetaMaskBalance();
  }, [account]);

  return (
    <div className="text-center p-2 text-center w-full">
      <h3 className="text-sm font-overpass">Your Wallet:</h3>
      <p className="text-blue-500 font-mono break-all">
        {/* {account.slice(0, 5)}...{account.slice(account.length - 5, account.length)} */}
        {account}
      </p>

      {/* Show MetaMask balance */}
      <p className={`text-sm font-overpass mt-2 text-${metamaskBalance == 0 ? 'red' : 'green'}-500`}>
        MetaMask Balance: {metamaskBalance} ETH
      </p>

      {/* Display error message if any */}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
}
