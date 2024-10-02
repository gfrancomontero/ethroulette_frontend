import React, { useState, useEffect } from 'react';
import { estimateGasFees } from '@/services/web3';
import ErrorMessage from './ErrorMessage';
import { useSelector } from 'react-redux';
import { Button } from '@nextui-org/react';

export default function WithdrawalForm({ handleWithdrawal, userBalance, errorMessage }) {
  const [inputError, setInputError] = useState('');
  const [gasFee, setGasFee] = useState('');
  const [netAmount, setNetAmount] = useState('');
  const [isCalculating, setIsCalculating] = useState(false); // Track when gas fees are being calculated
  const [secondsLeft, setSecondsLeft] = useState(20); // Countdown timer for the next update
  const { account } = useSelector((state) => state.metaMaskUser);

  useEffect(() => {
    console.log('Component mounted or account/userBalance changed.');
    console.log(`User account: ${account}`);
    console.log(`User balance: ${userBalance} ETH`);

    // Function to calculate gas fee
    const calculateGasFee = async () => {
      if (parseFloat(userBalance) <= 0) {
        setInputError("You don't have enough balance to make a withdrawal.");
        console.log("Insufficient balance. Setting input error message.");
        return;
      }

      try {
        setIsCalculating(true); // Set calculating state to true
        setGasFee('re-calculating'); // Show "re-calculating" during gas fee calculation
        setNetAmount('re-calculating'); // Show "re-calculating" during net amount calculation

        const dealerAddress = process.env.NEXT_PUBLIC_MAIN_WALLET_ADDRESS;
        console.log(`Dealer address: ${dealerAddress}`);

        // Estimate gas fees
        const gasFeeInEth = await estimateGasFees(dealerAddress, account, userBalance);
        setGasFee(gasFeeInEth);
        console.log(`Gas fee estimated: ${gasFeeInEth} ETH`);

        // Calculate net amount after gas fees
        const netAmountAfterFees = (parseFloat(userBalance) - parseFloat(gasFeeInEth)).toFixed(6);
        setNetAmount(netAmountAfterFees);
        console.log(`Net amount after fees: ${netAmountAfterFees} ETH`);

        // If the net amount is less than or equal to zero, show an error
        if (parseFloat(netAmountAfterFees) <= 0) {
          const errorMessage = `You can't withdraw the amount because you wouldn't have enough gas fees to withdraw it. Gas fees are ${gasFeeInEth} ETH`;
          setInputError(errorMessage);
          console.log(errorMessage);
        } else {
          setInputError('');
          console.log("Sufficient balance for withdrawal after gas fees.");
        }
      } catch (error) {
        console.error(`Error occurred while estimating gas fees: ${error.message}`);
        setInputError('Failed to estimate gas fees. Please try again later.');
        setGasFee('');
        setNetAmount('');
      } finally {
        setIsCalculating(false); // Reset calculating state
      }
    };

    // Initial calculation on component mount
    calculateGasFee();

    // Set up interval to recalculate gas fees every 10 seconds and update the countdown timer
    const intervalId = setInterval(() => {
      setSecondsLeft((prevSeconds) => {
        if (prevSeconds === 1) {
          calculateGasFee(); // Recalculate gas fees when countdown reaches 0
          return 20; // Reset the countdown timer
        }
        return prevSeconds - 1; // Decrease the countdown timer
      });
    }, 20000
  ); // 1 second interval for countdown

    // Clear interval when component unmounts or dependencies change
    return () => clearInterval(intervalId);
  }, [account, userBalance]);

  return (
    <div className="flex flex-col jca w-full font-overpass">
      <div className="flex flex-col justify-between items-center w-full">
        {/* Display balance and withdrawal info */}
        {inputError ? (
          <p className="text-red-500 mt-2">{inputError}</p>
        ) : (
          <>
            <p className="text-gray-600 mt-2">Sending to: {account.slice(0, 5)}...{account.slice(-5)}</p>
            <p className="text-gray-600 mt-2">Your Balance: {parseFloat(userBalance).toFixed(6)} ETH</p>
            <p className="text-sm text-gray-600 mt-2">
              Gas Fee: <span className="text-blue-500">{isCalculating ? 're-calculating' : parseFloat(gasFee).toFixed(6)} ETH</span>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Next update in: <span className="text-red-500">{secondsLeft}s</span>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              You will receive: <span className="text-green-500">{isCalculating ? 're-calculating' : netAmount || 0} ETH</span>
            </p>
          </>
        )}

        <Button
          onPress={handleWithdrawal}
          className={`px-4 py-1 mt-2 mb-2 bg-[#65FFBE] text-pink font-bold${
            parseFloat(netAmount) <= 0 || isCalculating ? 'cursor-not-allowed opacity-50' : ''
          }`}
          disabled={parseFloat(netAmount) <= 0 || isCalculating} // Disable button while calculating
        >
          Withdraw Entire Balance
        </Button>
        <small className="w-full text-center">*Gas Fees are approximate.<br />
        You can only withdraw your entire balance.</small>
      </div>

      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
}
