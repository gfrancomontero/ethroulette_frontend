import { useState, useEffect } from 'react';
import Web3 from 'web3';
import Link from 'next/link'

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
    <div className="p-2 w-full text-start">
      <p className="text-sm font-overpass">Page Balance:</p>
      <p className="text-blue-500 font-mono">{potBalance} ETH</p>
      <Link className="font-overpass text-xs whitespace-nowrap underline" href={`https://etherscan.io/address/${DEALER_ADDRESS}`} target="_blank">Check on Etherscan</Link>
    </div>
  );
}
