import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { setDealerBalance, setConnectionStatus } from '../redux/slices/dealerBalanceSlice';

// Make sure to replace this with your actual backend URL
const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_BACKEND_API;

export const useDealerBalance = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize Socket.io connection
    const socket = io(SOCKET_SERVER_URL);

    // Listen for connection success
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      dispatch(setConnectionStatus(true));
    });

    // Listen for dealerBalance updates from the back-end
    socket.on('dealerBalance', (newBalance) => {
      console.log('Received dealerBalance update:', newBalance);
      dispatch(setDealerBalance(newBalance));
    });

    // Handle socket disconnection
    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      dispatch(setConnectionStatus(false));
    });

    // Cleanup the socket connection when component unmounts
    return () => {
      socket.disconnect();
    };
  }, [dispatch]);
};
