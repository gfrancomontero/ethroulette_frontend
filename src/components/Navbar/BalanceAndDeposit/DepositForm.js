import React from 'react';
import ErrorMessage from './ErrorMessage';

export default function DepositForm({ depositAmount, setDepositAmount, handleDeposit, userBalance, errorMessage }) {
  return (
    <div className="flex flex-col jca w-full">
      <div className="flex justify-between items-center w-full">
        <input
          type="text"
          placeholder="Amount to deposit (ETH)"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md w-full font-overpass"
        />
        <button
          onClick={handleDeposit}
          className="bg-transparent border-pink text-pink hover:underline px-2 py-1 ml-2"
        >
          Deposit
        </button>
      </div>

      <p className="text-right text-blue-500 font-mono mt-2">
        Your Balance: {parseFloat(userBalance).toFixed(6)} ETH
      </p>

      <small className="text-blue-300 font-overpass flex text-center mt-4">
        After making a deposit, your balance will be credited, and you'll receive full transaction details to check on Etherscan.
      </small>

      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
}
