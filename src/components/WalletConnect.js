'use client'
import { useState, useEffect } from 'react';
import Web3 from 'web3';

export default function WalletConnect() {
  const [account, setAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Check if MetaMask is installed on the browser
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    } else {
      setErrorMessage('MetaMask is not installed. Please install it to use this app.');
    }
  }, []);

  const connectWallet = async () => {
    try {
      // Request account access if MetaMask is installed
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]); // Set the first account to state
    } catch (error) {
      setErrorMessage('Failed to connect wallet');
    }
  };

  const disconnectWallet = () => {
    // Simulate wallet disconnection by clearing the state
    setAccount(null);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      {account ? (
        <div className="text-center p-6 bg-gray-100 rounded-md shadow-lg">
          <h3 className="text-lg mb-2 font-semibold">Connected Wallet:</h3>
          <p className="text-blue-500 font-mono break-all">{account}</p>
          <button
            onClick={disconnectWallet}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Connect MetaMask Wallet
        </button>
      )}

      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
}
