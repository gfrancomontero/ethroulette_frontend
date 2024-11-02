import React from 'react';
import ErrorMessage from './ErrorMessage';
import { useSelector } from 'react-redux';


export default function DepositForm({ depositAmount, setDepositAmount, handleDeposit, userBalance, errorMessage }) {
  const { balance } = useSelector((state) => state.metaMaskUser);
  const metaMaskBalance = parseFloat(balance).toFixed(4)
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
        {/* <button
          onClick={handleDeposit}
          className="bg-transparent border-pink text-pink hover:underline px-2 py-1 ml-2"
        >
          Deposit
        </button> */}
      </div>

      <p className="text-right text-blue-500 font-mono mt-2">
        Metamask Balance: {metaMaskBalance} ETH
      </p>

      <small className="text-blue-300 font-overpass flex text-center mt-4">
        After making a deposit, your balance will be credited, and you&apos;ll receive full transaction details to check on Etherscan. Additionally, this is a hobby project. We coded it the best we colud, but we aren&apos;t responsible for your ETH, or malfunctions. This project works, but it is not being maintained, nor there is a support team. You hereby agree that you may lose all your ETH, and that&apos;s okay with you.
      </small>
      <small className="text-center">
        {errorMessage && <ErrorMessage message={writeError(errorMessage)} />}
      </small>
    </div>
  );
}


function writeError(errorMessage) {
  if (errorMessage.includes('gas')) { // Corrected 'include' to 'includes'
    return "Must be less. You don't have enough to cover gas fees. Remember, for low block transactions, gas fees don't really depend of the amount being sent.";
  } else {
    return errorMessage;
  }
}