import { useState } from 'react';
import { useSelector } from 'react-redux';
import { initializeWeb3, connectWalletAndLogin, getAccountBalance, sendTransaction } from '@/services/web3';
import config from '@/config/config';
import DepositForm from './DepositForm';
import TransactionDetails from './TransactionDetails';
import LoadingOverlay from './LoadingOverlay';
import ErrorMessage from './ErrorMessage';

export default function Deposit({ onClose }) {
  const [depositAmount, setDepositAmount] = useState('');
  const [transactionData, setTransactionData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const userBalance = useSelector((state) => state.userBalance.balance);
  const minimumDeposit = config.MINIMUM_DEPOSIT;

  const handleDeposit = async () => {
    if (!validateDeposit(depositAmount, minimumDeposit, setErrorMessage)) return;

    setLoading(true);
    try {
      const isWeb3Initialized = initializeWeb3();
      if (!isWeb3Initialized) {
        setErrorMessage('MetaMask is not installed or enabled. Please install or enable MetaMask.');
        setLoading(false);
        return;
      }

      const from = await connectWalletAndLogin();
      const balanceInEther = await getAccountBalance(from);
      if (parseFloat(balanceInEther) < parseFloat(depositAmount)) {
        setErrorMessage('Insufficient funds for this transaction.');
        setLoading(false);
        return;
      }

      const to = config.MAIN_WALLET_ADDRESS;
      const transaction = await sendTransaction(from, to, depositAmount);

      setTransactionData({ ...transaction, amount: depositAmount });
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
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
        <DepositForm
          depositAmount={depositAmount}
          setDepositAmount={setDepositAmount}
          handleDeposit={handleDeposit}
          userBalance={userBalance}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
}

// Utility function for deposit validation
const validateDeposit = (amount, minimumDeposit, setErrorMessage) => {
  if (!amount || isNaN(amount)) {
    setErrorMessage('Please enter a valid amount of ETH.');
    return false;
  }
  if (parseFloat(amount) < minimumDeposit) {
    setErrorMessage(`Minimum deposit is ${minimumDeposit} ETH`);
    return false;
  }
  return true;
};
