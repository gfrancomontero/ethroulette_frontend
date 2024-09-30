import React from 'react';
import ErrorMessage from './ErrorMessage';

export default function WithdrawalForm({ withdrawalAmount, setWithdrawalAmount, handleWithdrawal, userBalance, errorMessage }) {
  // State to track input validation error (if withdrawal amount is greater than balance)
  const [inputError, setInputError] = React.useState('');

  // Function to handle input change and prevent entering amounts greater than the user's balance
  const handleAmountChange = (e) => {
    const value = e.target.value;

    // Allow input if it's a valid number and less than or equal to the userBalance
    if (value === '' || (!isNaN(value) && parseFloat(value) <= parseFloat(userBalance))) {
      setWithdrawalAmount(value);
      setInputError(''); // Clear error message if the input is valid
    } else if (parseFloat(value) > parseFloat(userBalance)) {
      setInputError(`Amount exceeds your balance of ${parseFloat(userBalance).toFixed(6)} ETH`);
    }
  };

  return (
    <div className="flex flex-col jca w-full">
      <div className="flex justify-between items-center w-full">
        <input
          type="text"
          placeholder="Amount to withdraw (ETH)"
          value={withdrawalAmount}
          onChange={handleAmountChange}
          className="border border-gray-300 px-3 py-2 rounded-md w-full font-overpass"
        />
        <button
          onClick={handleWithdrawal}
          className={`bg-transparent border-pink text-pink hover:underline px-2 py-1 ml-2 ${
            withdrawalAmount <= 0 || parseFloat(withdrawalAmount) > parseFloat(userBalance) ? 'cursor-not-allowed opacity-50' : ''
          }`}
          disabled={parseFloat(withdrawalAmount) <= 0 || parseFloat(withdrawalAmount) > parseFloat(userBalance)}
        >
          Withdraw
        </button>
      </div>

      {/* Display error message below the input field if the amount exceeds balance */}
      {inputError && <p className="text-red-500 mt-2">{inputError}</p>}

      <p className="text-right text-blue-500 font-mono mt-2">
        Your Balance: {parseFloat(userBalance).toFixed(6)} ETH
      </p>

      <small className="text-blue-300 font-overpass flex text-center mt-4">
        After initiating a withdrawal, your balance will be updated, and you’ll receive transaction details to verify on Etherscan. We will deduct gas fees.
      </small>

      {/* Display any additional errors from the handleWithdrawal function */}
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
}
