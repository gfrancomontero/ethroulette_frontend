import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectMetaMask, fetchMetaMaskBalance } from '../../redux/slices/metaMaskUserBalanceSlice';

export default function MetaMaskBalance() {
  const dispatch = useDispatch();
  const { account, balance, loading, error } = useSelector((state) => state.metaMaskUser);

  // Connect MetaMask and fetch account on component mount
  useEffect(() => {
    if (!account) {
      dispatch(connectMetaMask());  // Connect to MetaMask and store the account in Redux
    }
  }, [account, dispatch]);

  // Fetch balance when the account is available
  useEffect(() => {
    if (account) {
      dispatch(fetchMetaMaskBalance(account));  // Fetch balance using Redux when account is set
    }
  }, [account, dispatch]);

  // MetaMask event listeners for account and network changes
  useEffect(() => {
    const { ethereum } = window;

    if (ethereum && ethereum.on) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          dispatch(connectMetaMask());  // Update account and fetch balance when account changes
        }
      };

      const handleChainChanged = () => {
        window.location.reload();  // Reload page when network is changed (optional, can be improved)
      };

      // Listen for MetaMask account change
      ethereum.on('accountsChanged', handleAccountsChanged);

      // Listen for MetaMask network change
      ethereum.on('chainChanged', handleChainChanged);

      // Clean up the event listeners on component unmount
      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
          ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, [dispatch]);

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
