// src/services/web3.js

import Web3 from 'web3';
import { store } from '@/redux/store';  // Adjust this path to where your store is
import { setUserBalance } from '@/redux/slices/userBalanceSlice';  // Adjust the path as necessary

let web3;

export const initializeWeb3 = () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);

    // Listen for account changes and reload the page
    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length > 0) {
        // Reload the page to reset session for new account
        window.location.reload();
      }
    });

    return true;
  }
  return false;
};

export const connectWalletAndLogin = async () => {
  try {
    // Initialize web3 if not already initialized
    if (!web3) {
      const initialized = initializeWeb3();
      if (!initialized) {
        throw new Error('MetaMask is not installed');
      }
    }
    
    // Request account access
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const walletAddress = accounts[0];
    const referralCode = localStorage.getItem('referralCode');
    
    // Send walletAddress to the back-end login route
    const response = await fetch('/api/verifyUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ walletAddress, referralCode }),
    });
    
    const data = await response.json();
    store.dispatch(setUserBalance(data.userBalance));

    if (!response.ok) {
      throw new Error(data.message || 'Failed to login user');
    }

    // Return the wallet address and any data from the back-end (e.g., userBalance)
    return walletAddress;
  } catch (error) {
    throw new Error(error.message || 'Failed to connect and login');
  }
};

// Other functions remain unchanged
export const getAccountBalance = async (account) => {
  try {
    const balance = await web3.eth.getBalance(account); // Get balance in Wei
    return web3.utils.fromWei(balance, 'ether'); // Convert balance to ETH
  } catch (error) {
    throw new Error('Failed to get balance');
  }
};

export const sendTransaction = async (from, to, amount) => {
  try {
    const valueInWei = web3.utils.toWei(amount, 'ether'); // Convert amount to Wei

    const transaction = await web3.eth.sendTransaction({
      from,
      to,
      value: valueInWei,
      gas: 21000, // Standard gas limit for ETH transfers
    });

    return {
      from: transaction.from,
      to: transaction.to,
      transactionHash: transaction.transactionHash,
      amount,
    };
  } catch (error) {
    throw new Error(`Transaction failed: ${error.message}`);
  }
};
