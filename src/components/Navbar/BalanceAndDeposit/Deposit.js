// src/components/Navbar/Deposit.js

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleMetaMaskTransaction } from '@/redux/actions/metaMaskActions'; // Import the Redux action

export default function Deposit({ account }) {
  const [depositAmount, setDepositAmount] = useState('');  // Amount the user wants to deposit
  const [errorMessage, setErrorMessage] = useState('');
  const DEALER_ADDRESS = process.env.NEXT_PUBLIC_DEALER_ADDRESS;  // Dealer's address from environment variables
  const dispatch = useDispatch();  // Access Redux dispatch

  // Handle the deposit process
  const handleDeposit = async () => {
    if (!depositAmount) {
      setErrorMessage('Please enter a deposit amount.');
      return;
    }

    try {
      console.log(`Attempting to send ${depositAmount} ETH from ${account} to ${DEALER_ADDRESS}`);

      // Dispatch the transaction through Redux action
      dispatch(handleMetaMaskTransaction(account, DEALER_ADDRESS, depositAmount));
    } catch (error) {
      console.error('Transaction error:', error);  // Log the actual error
      setErrorMessage('Transaction failed: ' + error.message);  // Set a user-friendly error message
    }
  };

  return (
    <div className="p-2 text-end w-full">
      {/* Input for deposit amount */}
      <input
        type="text"
        placeholder="Amount to deposit (ETH)"
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
        className="border border-gray-300 px-3 py-2 rounded-md mt-4"
      />

      <button
        onClick={handleDeposit}
        className="bg-green-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-green-600"
      >
        Add ETH to your Ethereum Roulette balance
      </button>

      {/* Display error message if any */}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
}
