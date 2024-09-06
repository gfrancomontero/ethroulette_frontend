// src/app/services/Web3Service.js

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

export const getAccountBalance = async (account) => {
  try {
    const balance = await web3.eth.getBalance(account);  // Get balance in Wei
    return web3.utils.fromWei(balance, 'ether');  // Convert balance to ETH
  } catch (error) {
    throw new Error('Failed to get balance');
  }
};

export const sendTransaction = async (account, toAddress, amountInEth) => {
  try {
    const amountInWei = web3.utils.toWei(amountInEth, 'ether');
    await web3.eth.sendTransaction({
      from: account,
      to: toAddress,
      value: amountInWei,
    });
  } catch (error) {
    throw new Error('Transaction failed');
  }
};
