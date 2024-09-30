import { setCurrentBetSize, setCanPlaceBet } from '@/redux/slices/betSlice';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import config from '@/config/config';
import styles from './BetSizeController.module.scss'

export default function BetSizeController() {
  const dispatch = useDispatch();

  // Redux selectors to get the necessary state
  const canPlaceBet = useSelector((state) => state.bet.canPlaceBet);
  const currentBetSize = useSelector((state) => state.bet.currentBetSize);
  const userBalance = useSelector((state) => state.userBalance.balance);
  const effectiveDealerBalance = useSelector((state) => state.dealerBalance.effectiveDealerBalance);

  // Config values
  const minimumBet = config.MINIMUM_BET;
  const maxBetPercentageOfDealerBalance = config.MAXIMUM_BET_PERCENTAGE_OF_DEALER_BALANCE;

  // Component state
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [suggestedBet, setSuggestedBet] = useState(null); // Stores the calculated max bet suggestion

  // Handles dispatching the suggested bet size
  function handlePlaceSuggestedBet(size) {
    dispatch(setCurrentBetSize(size));
  }

  useEffect(() => {
    const betSize = parseFloat(currentBetSize);
    const errors = [];
  
    // Calculate the maximum allowable bet based on dealer and user constraints
    const maxBetDealerCanCover = Math.min(effectiveDealerBalance / 2, effectiveDealerBalance / 10);
    const maxAllowableBet = Math.min(userBalance, maxBetDealerCanCover);
    const finalSuggestedBet = Math.max(minimumBet, maxAllowableBet);
  
    // Validation checks
    if (betSize > userBalance) {
      errors.push('You don’t have enough ETH to place this bet.');
    }
  
    if (betSize < minimumBet) {
      errors.push(`That's below our minimum bet (${minimumBet} ETH).`);
    }
  
    if (betSize * 2 > effectiveDealerBalance) {
      errors.push('Bet too large. We wouldn’t have enough ETH to pay you if you won.');
    }
  
    if (betSize * 2 > effectiveDealerBalance / maxBetPercentageOfDealerBalance) {
      errors.push(`Bet too large. We don’t risk more than 1/${maxBetPercentageOfDealerBalance}th of our reserve in one single bet.`);
    }
  
    // Use a clearer name for the local variable inside useEffect
    const isBetValid = errors.length === 0;
    dispatch(setCanPlaceBet(isBetValid));
  
    // Update error messages and suggested bet state
    setErrorMessages(errors);
    setShowError(errors.length > 0);
    setSuggestedBet(errors.length > 0 ? finalSuggestedBet : null);
  }, [currentBetSize, userBalance, effectiveDealerBalance, minimumBet, maxBetPercentageOfDealerBalance, dispatch]);
  
  // Helper to format the suggested bet by rounding down
  const formatSuggestedBet = (bet) => (Math.floor(bet * 10000) / 10000).toFixed(4);

  return (
    <>
      {showError && currentBetSize > 0 && (
        <div className={`text-red-500 mt-2 rounded-lg p-6 bg-slate-900	 ${styles.errorSection}`} >
          <p className="text-red-300">Can&apos;t place bet. Reason{errorMessages.length > 1 && 's'}:</p>
          <ol className="list-decimal pl-5">
            {errorMessages.map((message, index) => (
              <li key={index} className="text-left ml-1">{message}</li>
            ))}
          </ol>
          {suggestedBet && (
            <p
              className="text-green mt-2 cursor-pointer mt-2 underline cursor-pointer"
              onClick={() => handlePlaceSuggestedBet(formatSuggestedBet(suggestedBet))}
            >
              Place Suggested bet: {formatSuggestedBet(suggestedBet)} ETH
            </p>
          )}
        </div>
      )}
    </>
  );
}
