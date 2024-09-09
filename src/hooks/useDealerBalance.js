import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { setDealerBalance, setConnectionStatus } from '../redux/slices/dealerBalanceSlice';

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_BACKEND_API;

// Function to get the WebSocket token from the API route
const fetchWebSocketToken = async () => {
  const response = await fetch('/api/getWebSocketToken', { method: 'POST' });
  const data = await response.json();
  return data.token;
};

export const useDealerBalance = () => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);  // Save the socket connection in state

  useEffect(() => {
    // Fetch the WebSocket token from the API route
    const connectSocket = async () => {
      const token = await fetchWebSocketToken();
      console.log('bananas', token)


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

      // Listen for dealerBalance updates
      socket.on('dealerBalance', (newBalance) => {
        console.log('Received dealerBalance update:', newBalance);
        dispatch(setDealerBalance(newBalance));  // Update dealer balance in Redux
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
