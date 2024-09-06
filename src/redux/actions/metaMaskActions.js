import { initializeWeb3, connectWallet, sendTransaction } from '@/services/Web3Service';  // Import Web3Service functions
import { setMetaMaskInstalled, setAccount, clearAccount, setBalance, setError, setLoading, setMetaMaskTransactionLoading } from '../slices/metaMaskSlice';

// Redux Thunk to check if MetaMask is installed and whether the wallet is connected
export const checkWalletConnection = () => async (dispatch) => {
  const web3Initialized = initializeWeb3();  // Use initializeWeb3 from Web3Service.js

  if (!web3Initialized) {
    dispatch(setMetaMaskInstalled(false));
    dispatch(setAccount(null));  // No account available if MetaMask is not installed
  } else {
    dispatch(setMetaMaskInstalled(true));
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        dispatch(setAccount(accounts[0]));
        dispatch(fetchBalance(accounts[0]));  // Fetch the balance for the connected account
      } else {
        dispatch(setAccount(null));
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
      dispatch(setError('Error checking wallet connection.'));
    }

    // Event listeners to handle account changes and chain changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          dispatch(setAccount(accounts[0]));
          dispatch(fetchBalance(accounts[0]));  // Fetch new balance when account changes
        } else {
          dispatch(clearAccount());
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }
};

// Redux Thunk to fetch balance from the backend
export const fetchBalance = (walletAddress) => async (dispatch) => {
  const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;
  dispatch(setLoading(true)); // Start loading
  
  try {
    const response = await fetch(`${BACKEND_API}/api/users/user-balance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ walletAddress })
    });

    const data = await response.json();
    if (response.ok) {
      dispatch(setBalance(data.balance));  // Set the user's balance in Redux
    } else {
      dispatch(setError(`Failed to fetch balance: ${data.message}`));
    }
  } catch (error) {
    dispatch(setError('Failed to fetch balance from the back-end.'));
    console.error('Failed to fetch balance:', error);
  } finally {
    dispatch(setLoading(false)); // Stop loading
  }
};

// Redux Thunk to connect wallet on user action
export const handleConnectWallet = () => async (dispatch) => {
  try {
    const connectedAccount = await connectWallet();
    dispatch(setAccount(connectedAccount));  // Set the connected account in Redux
    dispatch(fetchBalance(connectedAccount));  // Fetch the balance for the connected account
  } catch (error) {
    console.error('Failed to connect wallet:', error);
    dispatch(setError('Failed to connect wallet.'));
  }
};

// Redux Thunk to handle a MetaMask transaction
export const handleMetaMaskTransaction = (account, toAddress, amount) => async (dispatch) => {
  dispatch(setMetaMaskTransactionLoading(true));  // Start transaction loading state
  try {
    // Perform the transaction via Web3Service
    await sendTransaction(account, toAddress, amount);

    dispatch(setMetaMaskTransactionLoading(false));  // Stop transaction loading state
    window.location.reload();  // Reload the page after the transaction

  } catch (error) {
    dispatch(setError('Transaction failed.'));  // Dispatch error to Redux
    dispatch(setMetaMaskTransactionLoading(false));  // Ensure loading state is stopped on failure
    console.error('Transaction failed:', error);
  }
};
