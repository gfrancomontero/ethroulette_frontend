import { useState, useEffect } from 'react';
import Web3 from 'web3';

export default function Pot() {
  const [potBalance, setPotBalance] = useState(0);
  const DEALER_ADDRESS = process.env.NEXT_PUBLIC_DEALER_ADDRESS;  // Dealer's Ethereum address

  useEffect(() => {
    const fetchPotBalance = async () => {
      try {
        const web3 = new Web3(window.ethereum);
        const balance = await web3.eth.getBalance(DEALER_ADDRESS);  // Fetch balance in Wei
        setPotBalance(web3.utils.fromWei(balance, 'ether'));  // Convert Wei to ETH
      } catch (error) {
        console.error('Error fetching pot balance:', error);
      }
    };

    fetchPotBalance();  // Fetch the pot balance when the component mounts
  }, [DEALER_ADDRESS]);

  return (
    <div className="text-center p-4 bg-gray-100 rounded-md shadow-lg mb-6">
      <h3 className="text-lg font-semibold">Current Pot Balance</h3>
      <p className="text-blue-500 font-mono">{potBalance} ETH</p>
    </div>
  );
}
