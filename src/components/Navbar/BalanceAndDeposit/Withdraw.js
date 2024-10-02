import { useState } from 'react';
import { useSelector } from 'react-redux';
import { initializeWeb3, connectWalletAndLogin } from '@/services/web3';
import WithdrawalForm from './WithdrawalForm';
import TransactionDetails from './TransactionDetails';
import LoadingOverlay from './LoadingOverlay';

export default function Withdrawal({ onClose }) {
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [transactionData, setTransactionData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const userBalance = useSelector((state) => state.userBalance.balance);

  // Handle the withdrawal request
  const handleWithdrawal = async () => {

    if (!validateWithdrawal(userBalance, setErrorMessage)) return;

    setLoading(true);
    try {
      // Initialize Web3 and connect to MetaMask
      const isWeb3Initialized = initializeWeb3();
      if (!isWeb3Initialized) {
        setErrorMessage('MetaMask is not installed or enabled. Please install or enable MetaMask.');
        setLoading(false);
        return;
      }

      const from = await connectWalletAndLogin();

      // Send the withdrawal request to the back-end API
      const response = await requestWithdrawal(from, userBalance);

      if (response.success) {
        setTransactionData({
          ...response.transaction,
          amount: userBalance,
        });
        setErrorMessage('');
      } else {
        setErrorMessage(`Withdrawal failed: ${response.error}`);
      }
    } catch (error) {
      setErrorMessage(`Error processing withdrawal: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-4">
      {loading && <LoadingOverlay />}

      {transactionData ? (
        <TransactionDetails transactionData={transactionData} />
      ) : (
        <WithdrawalForm
          withdrawalAmount={withdrawalAmount}
          setWithdrawalAmount={setWithdrawalAmount}
          handleWithdrawal={handleWithdrawal}
          userBalance={userBalance}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
}

// Utility function for withdrawal validation
const validateWithdrawal = (userBalance, setErrorMessage) => {
  if (!userBalance || isNaN(userBalance)) {
    setErrorMessage('Please enter a valid amount of ETH.');
    return false;
  }
  if (parseFloat(userBalance) <= 0) {
    setErrorMessage('Withdrawal amount must be greater than zero.');
    return false;
  }
  if (parseFloat(userBalance) > userBalance) {
    setErrorMessage('Insufficient balance for this withdrawal.');
    return false;
  }
  return true;
};

// Function to request a withdrawal from the server
const requestWithdrawal = async (address, amount) => {
  try {
    const response = await fetch('/api/requestWithdrawal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address,
        amount,
      }),
    });

    return await response.json();
  } catch (error) {
    return { success: false, error: error.message };
  }
};
