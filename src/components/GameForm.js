// components/GameForm.js
'use client'
import { useState, useEffect } from 'react';
import { connectWallet, getAccountBalance, sendTransaction } from '../services/Web3Service';
import EnsureMetaMask from './EnsureMetaMask'

export default function GameForm() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleConnectWallet = async () => {
    try {
      const account = await connectWallet();
      setAccount(account);
      const balance = await getAccountBalance(account);
      setBalance(balance);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleDeposit = async () => {
    if (!account || !depositAmount || !selectedColor) {
      setErrorMessage('Please connect your wallet, enter a deposit amount, and select a color.');
      return;
    }

    if (parseFloat(depositAmount) > 0.5) {
      setErrorMessage('Deposit amount cannot exceed 0.5 ETH.');
      return;
    }

    if (parseFloat(depositAmount) > parseFloat(balance)) {
      setErrorMessage('Deposit amount cannot exceed your available balance.');
      return;
    }

    // good to know: ethereum addresses are not case sensitive
    // (5 sept 2024, Gonzalo Franco, source netcoins.com)
    try {
      await sendTransaction(account, 'YOUR_RECEIVING_ETH_ADDRESS', depositAmount);
      setSuccessMessage(`You bet on ${selectedColor}! Waiting for transaction confirmation...`);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  <EnsureMetaMask />

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      {account ? (
        <div className="text-center p-6 bg-gray-100 rounded-md shadow-lg">
          <h3 className="text-lg mb-2 font-semibold">Connected Wallet:</h3>
          <p className="text-blue-500 font-mono break-all">{account}</p>
          <p className="text-lg mt-2">Balance: {balance} ETH</p>

          <div className="mt-4">
            <input
              type="text"
              placeholder="Amount to bet (ETH)"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md mr-2"
            />

            <div className="mt-4">
              <label className="mr-2">Choose a color:</label>
              <button
                onClick={() => setSelectedColor('Red')}
                className={`px-4 py-2 rounded-lg ${selectedColor === 'Red' ? 'bg-red-500' : 'bg-gray-300'} text-white`}
              >
                Red
              </button>
              <button
                onClick={() => setSelectedColor('Black')}
                className={`ml-2 px-4 py-2 rounded-lg ${selectedColor === 'Black' ? 'bg-black' : 'bg-gray-300'} text-white`}
              >
                Black
              </button>
            </div>

            <button
              onClick={handleDeposit}
              className="bg-green-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-green-600"
            >
              Place Bet
            </button>
          </div>

          {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </div>
      ) : (
        <button
          onClick={handleConnectWallet}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Connect MetaMask Wallet
        </button>
      )}
    </div>
  );
}
