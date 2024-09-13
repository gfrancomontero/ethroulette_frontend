import { useState } from 'react';
import Web3 from 'web3';

export default function Deposit({ account }) {
  const [depositAmount, setDepositAmount] = useState('');  // Amount the user wants to deposit
  const [transactionData, setTransactionData] = useState(null);  // Transaction data state
  const [errorMessage, setErrorMessage] = useState('');  // Error message state
  const [loading, setLoading] = useState(false);  // Loading state for blocking the screen

  // Handle the deposit process
  const handleDeposit = async () => {
    if (!depositAmount || isNaN(depositAmount) || parseFloat(depositAmount) <= 0) {
      setErrorMessage('Please enter a valid amount of ETH.');
      return;
    }

    setLoading(true);  // Set loading state to true to block the screen

    try {
      // Check if MetaMask is available
      if (typeof window.ethereum !== 'undefined') {
        // Request account access if not already connected
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } else {
        setErrorMessage('MetaMask is not installed or enabled. Please install or enable MetaMask.');
        setLoading(false);  // Stop loading if MetaMask is not available
        return;
      }

      // Initialize web3 instance using MetaMask as provider
      const web3 = new Web3(window.ethereum);

      // Get current MetaMask account (connected account)
      const accounts = await web3.eth.getAccounts();
      if (!accounts.length) {
        setErrorMessage('No account found. Please connect MetaMask.');
        setLoading(false);  // Stop loading if no account is found
        return;
      }
      const from = accounts[0];  // Sender wallet

      // Check sender's balance
      const balance = await web3.eth.getBalance(from);
      const balanceInEther = web3.utils.fromWei(balance, 'ether');

      if (parseFloat(balanceInEther) < parseFloat(depositAmount)) {
        setErrorMessage('Insufficient funds for this transaction.');
        setLoading(false);  // Stop loading if insufficient funds
        return;
      }

      // Specify the recipient wallet address (your platform's wallet address)
      const to = process.env.NEXT_PUBLIC_MAIN_WALLET_ADDRESS;  // Replace with your platform's wallet address

      // Convert deposit amount to Wei
      const valueInWei = web3.utils.toWei(depositAmount, 'ether');

      // Initiate transaction using MetaMask
      const transaction = await web3.eth.sendTransaction({
        from,
        to,
        value: valueInWei,
        gas: 21000  // Manually setting the gas limit for simple ETH transfers
      });

      // Update the state with transaction details, including the sent amount in ETH
      setTransactionData({
        from: transaction.from,
        to: transaction.to,
        transactionHash: transaction.transactionHash,
        amount: depositAmount  // Add the deposit amount for display
      });
      setErrorMessage('');  // Clear error message on success
    } catch (error) {
      setErrorMessage(`Transaction failed: ${error.message}`);
    } finally {
      setLoading(false);  // Stop loading after the transaction is processed
    }
  };

  function handleOpen() {
    alert('Opening Modal for deposit');
  }

  return (
    <div>
      {/* Block the screen while loading */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <p className="text-white text-xl">Processing transaction, do not refresh this page.</p>
        </div>
      )}

      {/* Button to open the modal */}
      <div className="font-overpass text-xs whitespace-nowrap underline" color="primary" onClick={handleOpen}>
        DEPOSIT FUNDS
      </div>

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
        <div className="rb bg-gray-100 p-4 mt-4 rounded-lg">
          <p><strong>Transaction Details:</strong></p>
          <p><strong>From:</strong> {transactionData.from}</p>
          <p><strong>To:</strong> {transactionData.to}</p>
          <p><strong>Transaction Hash:</strong> {transactionData.transactionHash}</p>
          <p><strong>Amount Sent (ETH):</strong> {transactionData.amount}</p>  {/* Display amount sent */}
        </div>
      )}
    </div>
  );
}
