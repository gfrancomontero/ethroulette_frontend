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

export const sendTransaction = async (account, toAddress, amountInEth, updateBackend = true) => {
  try {
    const amountInWei = web3.utils.toWei(amountInEth, 'ether');

    // Send transaction to the specified address
    await web3.eth.sendTransaction({
      from: account,
      to: toAddress,
      value: amountInWei,
    });

    console.log(`Transaction successful: Sent ${amountInEth} ETH to ${toAddress}`);

    // If transaction is successful and updateBackend is true, call the backend to update the balance
    if (updateBackend) {
      await updateBackendWithDeposit(account, amountInEth);  // Update backend with the new deposit
    }
  } catch (error) {
    throw new Error('Transaction failed: ' + error.message);
  }
};

// Helper function to update backend with deposit info
const updateBackendWithDeposit = async (account, amountInEth) => {
  const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;

  try {
    const response = await fetch(`${BACKEND_API}/api/users/deposit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        walletAddress: account,
        amount: amountInEth,  // Send deposit amount in ETH to backend
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update backend with deposit.');
    }

    console.log('Backend updated with deposit:', data);
  } catch (error) {
    console.error('Error updating backend:', error);
    throw error;
  }
};
