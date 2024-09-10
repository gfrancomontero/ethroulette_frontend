// src/hooks/useBalanceManager.js
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { setDealerBalance, setTotalUserBalances, setEffectivetotalBalance, setConnectionStatus } from '../redux/slices/dealerBalanceSlice';

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_BACKEND_API;

// Function to get the WebSocket token from the API route
const fetchWebSocketToken = async () => {
  const response = await fetch('/api/getWebSocketToken', { method: 'POST' });
  const data = await response.json();
  return data.token;
};

export const useBalanceManager = () => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);  // Save the socket connection in state

  useEffect(() => {
    // Fetch the WebSocket token from the API route
    const connectSocket = async () => {
      const token = await fetchWebSocketToken();

      // Initialize the WebSocket connection with the token
      const socket = io(SOCKET_SERVER_URL, {
        auth: {
          token,  // Pass the token received from the API
        },
      });

      // Listen for connection success
      socket.on('connect', () => {
        console.log('Connected to WebSocket server');
        dispatch(setConnectionStatus(true));  // Update connection status in Redux
      });

      // Listen for balancesManager updates
      socket.on('balancesManager', (balances) => {
        console.log('Received balancesManager update:', balances);
        const { walletBalance, totalUserBalances, effectiveBalancesManager } = balances;

        // Dispatch the balances to the Redux store
        dispatch(setDealerBalance(walletBalance));  // Update dealer balance
        dispatch(setTotalUserBalances(totalUserBalances));  // Update total user balances
        dispatch(setEffectivetotalBalance(effectiveBalancesManager));  // Update effective balance
      });

      // Handle socket disconnection
      socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
        dispatch(setConnectionStatus(false));  // Update connection status in Redux
      });

      // Handle authentication errors (if the token is invalid)
      socket.on('connect_error', (err) => {
        console.log('Error connecting:', err.message);
      });

      setSocket(socket);  // Save the socket in state for cleanup later
    };

    connectSocket();  // Run the function to connect the socket

    // Cleanup on component unmount
    return () => {
      if (socket) socket.disconnect();
    };
  }, [dispatch]);

  return { socket };
};
