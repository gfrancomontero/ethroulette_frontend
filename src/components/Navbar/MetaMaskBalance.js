import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectMetaMask, fetchMetaMaskBalance } from '../../redux/slices/metaMaskUserBalanceSlice';

export default function MetaMaskBalance() {
  const dispatch = useDispatch();
  const { account, balance, loading, error } = useSelector((state) => state.metaMaskUser);

  // IF no metamsk connected, connect MetaMask and fetch account on component mount
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
