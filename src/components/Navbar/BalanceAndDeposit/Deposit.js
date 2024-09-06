// src/components/Navbar/Deposit.js

import { useState } from 'react';
import { sendTransaction } from '../../../services/Web3Service';  // Import sendTransaction function

export default function Deposit({ account }) {
  const [depositAmount, setDepositAmount] = useState('');  // Amount the user wants to deposit
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const DEALER_ADDRESS = process.env.NEXT_PUBLIC_DEALER_ADDRESS;  // Dealer's address from environment variables
  const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;        // Backend API base URL from environment variables

  // Handle the deposit process
  const handleDeposit = async () => {
    if (!depositAmount) {
      setErrorMessage('Please enter a deposit amount.');
      return;
    }

    try {
      console.log(`Attempting to send ${depositAmount} ETH from ${account} to ${DEALER_ADDRESS}`);

      // Send transaction to the dealer's address using MetaMask
      await sendTransaction(account, DEALER_ADDRESS, depositAmount);

      // If the transaction goes through, show a success alert
      alert(`Transaction successful: ${depositAmount} ETH sent to ${DEALER_ADDRESS}`);

      // After the transaction is confirmed, notify the back-end
      const response = await fetch(`${BACKEND_API}/api/users/deposit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: account,
          amount: depositAmount,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(`Deposit successful! Your new balance is ${data.newBalance} ETH.`);
        setDepositAmount('');  // Clear the deposit input field
      } else {
        setErrorMessage('Deposit failed. Please try again.');
      }
    } catch (error) {
      console.error('Transaction error:', error);  // Log the actual error
      setErrorMessage('Transaction failed: ' + error.message);  // Set a user-friendly error message
      alert(`Transaction failed: ${error.message}`);  // Display alert for transaction failure
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

      {/* Display error/success messages */}
      {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
}
