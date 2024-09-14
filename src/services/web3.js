// src/services/web3.js
import Web3 from 'web3';

let web3;

export const initializeWeb3 = () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    return true;
  }
  return false;
};

export const connectWallet = async () => {
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return accounts[0];  // Return the first account (connected wallet)
  } catch (error) {
    throw new Error('Failed to connect wallet');
  }
};

// Ensure this function is properly defined and exported
export const getAccountBalance = async (account) => {
  try {
    const balance = await web3.eth.getBalance(account);  // Get balance in Wei
    return web3.utils.fromWei(balance, 'ether');  // Convert balance to ETH
  } catch (error) {
    throw new Error('Failed to get balance');
  }
};

// when user deposits from metamask, we 
export const sendTransaction = async (from, to, amount) => {
  try {
    const valueInWei = web3.utils.toWei(amount, 'ether');  // Convert amount to Wei

    const transaction = await web3.eth.sendTransaction({
      from,
      to,
      value: valueInWei,
      gas: 21000  // Set a standard gas limit for ETH transfers
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