'use client';  // Ensure this is a client-side component

import { useEffect, useState } from 'react';  // Include useState for grace period
import { useDispatch, useSelector } from 'react-redux';
import { checkMetaMaskStatus, monitorMetaMaskInstallation } from '@/redux/slices/metaMaskValidationSlice';  // Import the thunk actions

import EnsureWalletConnected from '@/components/enforcers/EnsureWalletConnected';
import ClientProvider from './ClientProvider';  // Your wrapper for client components
import Navbar from '@/components/Navbar';
import EnsureMetaMask from '@/components/enforcers/EnsureMetaMask';

export default function Home() {
  return (
    <ClientProvider>  {/* Wrap with ClientProvider to ensure Redux and other client-side logic */}
      <HomeContent />
    </ClientProvider>
  );
}

function HomeContent() {
  const dispatch = useDispatch();

  // Select MetaMask and wallet connection state from Redux
  const isMetaMaskInstalled = useSelector((state) => state.metaMaskValidation.isMetaMaskInstalled);
  const isWalletConnected = useSelector((state) => state.metaMaskValidation.isWalletConnected);

  // State to track if we are in a "loading" grace period to prevent flickering
  const [isLoading, setIsLoading] = useState(true);  // Initial loading state

  // Check MetaMask installation and wallet connection status on component mount
  useEffect(() => {
    dispatch(checkMetaMaskStatus());
    const stopMonitoring = dispatch(monitorMetaMaskInstallation());

    // Cleanup function to stop monitoring when the component unmounts
    return () => stopMonitoring();
  }, [dispatch]);

  // Grace period logic to avoid flickering
  useEffect(() => {
    // Start grace period timer only when both statuses are being checked
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);  // End grace period after 1 second
    }, 1000);  // 1 second grace period

    // Cleanup the timeout if the component unmounts or the status changes
    return () => clearTimeout(timeout);
  }, [isMetaMaskInstalled, isWalletConnected]);  // Watch both MetaMask installation and wallet connection status

  // Function to open MetaMask and trigger wallet connection
  const onConnect = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Trigger MetaMask wallet connection
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        // If the user connects, we trigger the MetaMask status check again to update Redux
        if (accounts.length > 0) {
          dispatch(checkMetaMaskStatus());  // Update the wallet connection status in Redux
        }
      } catch (error) {
        console.error('Error connecting MetaMask:', error);
      }
    } else {
      alert('MetaMask is not installed. Please install MetaMask to connect.');
    }
  };

  // Render loading spinner or nothing while in grace period
  if (isLoading) {
    return <div>Loading...</div>
  }

  // After grace period, decide what to render based on MetaMask and wallet connection state
  return (
    <>
      {isMetaMaskInstalled ? (
        isWalletConnected ? (
          <Game />  // If MetaMask is installed and wallet is connected
        ) : (
          <EnsureWalletConnected onConnect={onConnect} />  // Pass onConnect to the EnsureWalletConnected component
        )
      ) : (
        <EnsureMetaMask />  // If MetaMask is not installed
      )}
    </>
  );
}

function Game() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Navbar />
    </div>
  );
}
