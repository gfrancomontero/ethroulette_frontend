// src/components/Navbar/BalanceAndDeposit/Deposit.js
import { useState } from 'react';
import { initializeWeb3, connectWalletAndLogin, getAccountBalance, sendTransaction } from '@/services/web3';
import config from '@/config/config';  // Import configuration

export default function Deposit() {
  const [depositAmount, setDepositAmount] = useState('');  // Amount the user wants to deposit
  const [transactionData, setTransactionData] = useState(null);  // Transaction data state
  const [errorMessage, setErrorMessage] = useState('');  // Error message state
  const [loading, setLoading] = useState(false);  // Loading state for blocking the screen

  const minimumDeposit = config.MINIMUM_DEPOSIT;  // Get the minimum deposit from config

  // Handle the deposit process
  const handleDeposit = async () => {
    if (!depositAmount || isNaN(depositAmount)) {
      setErrorMessage('Please enter a valid amount of ETH.');
      return;
    }

    if (parseFloat(depositAmount) < minimumDeposit) {
      setErrorMessage(`Minimum deposit is ${minimumDeposit} ETH`);
      return;
    }

    setLoading(true);  // Set loading state to block the screen

    try {
      // Initialize Web3
      const isWeb3Initialized = initializeWeb3();
      if (!isWeb3Initialized) {
        setErrorMessage('MetaMask is not installed or enabled. Please install or enable MetaMask.');
        setLoading(false);  // Stop loading if MetaMask is not available
        return;
      }

      // Connect to the wallet
      const from = await connectWalletAndLogin();

      // Get account balance
      const balanceInEther = await getAccountBalance(from);
      if (parseFloat(balanceInEther) < parseFloat(depositAmount)) {
        setErrorMessage('Insufficient funds for this transaction.');
        setLoading(false);  // Stop loading if insufficient funds
        return;
      }

      // Use the platform's wallet address from the config
      const to = config.MAIN_WALLET_ADDRESS;

      // Send the transaction using the service method
      const transaction = await sendTransaction(from, to, depositAmount);

      // Update the state with transaction details, including the sent amount in ETH
      setTransactionData(transaction);
      setErrorMessage('');  // Clear error message on success

    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      // Ensure the loading state changes back after the transaction is processed or fails
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Block the screen while loading */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <p className="text-white text-xl">Processing transaction, do not refresh this page.</p>
        </div>
      )}

      <input
        type="text"
        placeholder="Amount to deposit (ETH)"
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
        className="border border-gray-300 px-3 py-2 rounded-md mt-4 w-full"
      />

      <button
        onClick={handleDeposit}
        className="bg-green-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-green-600 w-full"
        disabled={loading}  // Disable button while loading
      >
        Add ETH to your Ethereum Roulette balance
      </button>

      {/* Display error message if any */}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

      {/* Display transaction details after a successful transaction */}
      {transactionData && (
        <div className="bg-gray-100 p-4 mt-4 rounded-lg">
          <p><strong>Transaction Details:</strong></p>
          <p><strong>From:</strong> {transactionData.from}</p>
          <p><strong>To:</strong> {transactionData.to}</p>
          <p><strong>Transaction Hash:</strong> {transactionData.transactionHash}</p>
          <p><strong>Amount Sent (ETH):</strong> {transactionData.amount}</p>
        </div>
      )}
    </div>
  );
}
