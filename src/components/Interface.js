'use client';
import { useState, useEffect } from 'react';
import EnsureMetaMask from '../components/EnsureMetaMask';
import ConnectWallet from '../components/ConnectWallet';
import GameForm from '../components/GameForm';
import { initializeWeb3, connectWallet } from '../services/Web3Service';

export default function Home() {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(true);
  const [account, setAccount] = useState(null);
  const [showConnectWallet, setShowConnectWallet] = useState(false);  // New state to control ConnectWallet rendering

  useEffect(() => {
    const web3Initialized = initializeWeb3();

    if (!web3Initialized) {
      setIsMetaMaskInstalled(false);  // MetaMask not installed
    } else {
      // MetaMask installed, check if it's connected
      checkIfWalletConnected();
    }
  }, []);

  // Check if wallet is already connected when the page loads (persistence)
  const checkIfWalletConnected = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setAccount(accounts[0]);  // Set the first connected account
      } else {
        // Delay the showing of the ConnectWallet component by 1 second
        setTimeout(() => {
          setShowConnectWallet(true);  // Show ConnectWallet button after 1 second
        }, 1000);
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  // Handle wallet connection when the button is clicked
  const handleConnectWallet = async () => {
    try {
      const connectedAccount = await connectWallet();
      setAccount(connectedAccount);
      setShowConnectWallet(false);  // Hide ConnectWallet button after connecting
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {/* 1. Check if MetaMask is installed */}
      {!isMetaMaskInstalled && <EnsureMetaMask />}

      {/* 2. If MetaMask is installed but not connected, show connect button after 1 second */}
      {isMetaMaskInstalled && !account && showConnectWallet && <ConnectWallet onConnect={handleConnectWallet} />}

      {/* 3. If MetaMask is installed and connected, show the game form */}
      {isMetaMaskInstalled && account && <GameForm account={account} />}
    </div>
  );
}
