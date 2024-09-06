'use client';  // Ensure this is a client-side component

import ClientProvider from '@/components/ClientProvider';  // Your wrapper for client components
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import EnsureMetaMask from '@/components/enforcers/EnsureMetaMask';
import EnsureWalletConnected from '@/components/enforcers/EnsureWalletConnected';
import { checkWalletConnection, handleConnectWallet } from '@/redux/actions/metaMaskActions';  // Import your async actions

export default function Home() {
  return (
    <ClientProvider>  {/* Wrap with ClientProvider to ensure Redux and other client-side logic */}
      <Content />
    </ClientProvider>
  );
}

function Content() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkWalletConnection());  // Check wallet connection on load

    const interval = setInterval(() => {
      dispatch(checkWalletConnection());  // Optionally check connection periodically
    }, 30000);

    return () => clearInterval(interval);  // Clean up the interval on unmount
  }, [dispatch]);

  const isMetaMaskInstalled = useSelector((state) => state.metaMask.isMetaMaskInstalled);
  const account = useSelector((state) => state.metaMask.account);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {isMetaMaskInstalled ? (
        account ? (
          <Navbar />  // Show Navbar if MetaMask is installed and connected
        ) : (
          <EnsureWalletConnected onConnect={() => dispatch(handleConnectWallet())} />
        )
      ) : (
        <EnsureMetaMask />
      )}
    </div>
  );
}
