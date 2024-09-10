import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMetaMaskBalance } from '../../redux/slices/metaMaskUserBalanceSlice';
import { initializeWeb3, connectWallet } from '../../services/web3';

export default function MetaMaskBalance() {
  const dispatch = useDispatch();
  const { balance, loading, error } = useSelector((state) => state.metaMaskUserBalance);
  const [account, setAccount] = useState(null);  // Local state to store MetaMask account

  // Connect MetaMask and set the account locally
  useEffect(() => {
    const connectMetaMask = async () => {
      try {
        const initialized = initializeWeb3();  // Initialize Web3 instance
        if (!initialized) {
          console.error('MetaMask is not installed');
          return;
        }

        const account = await connectWallet();  // Connect to MetaMask and get the account
        setAccount(account);  // Store the account in local state
      } catch (error) {
        console.error('Failed to connect MetaMask:', error.message);
      }
    };

    if (!account) {
      connectMetaMask();  // Connect MetaMask if account is not already set
    }
  }, [account]);

  // Fetch balance when the account is available
  useEffect(() => {
    if (account) {
      dispatch(fetchMetaMaskBalance(account));  // Fetch balance using Redux
    }
  }, [account, dispatch]);

  if (loading) {
    return <p>Loading balance...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="text-center w-full">
      <h3 className="text-sm font-overpass">Your Wallet:</h3>
      <p className="text-blue-500 font-mono break-all">{account || 'No account connected'}</p>
      <p className={`text-sm font-overpass mt-2 text-${balance > 0 ? 'green' : 'red'}-500`}>
        MetaMask Balance: {balance} ETH
      </p>
    </div>
  );
}
