// src/components/Navbar/BalanceManager.js

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useBalanceManager } from '../../hooks/useBalanceManager.js';  // Correct hook import
import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure} from "@nextui-org/react";

export default function DealerBalance() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  useBalanceManager();  // Initialize the WebSocket connection and listen for updates

  const dealerBalance = useSelector((state) => state.dealerBalance.balance);
  const dealerAddress = process.env.NEXT_PUBLIC_MAIN_WALLET_ADDRESS
  const totalUserBalances = useSelector((state) => state.dealerBalance.totalUserBalances);
  const effectiveDealerBalance = useSelector((state) => state.dealerBalance.effectiveDealerBalance);
  const isConnected = useSelector((state) => state.dealerBalance.isConnected);

  // Local state to manage the loading state and prevent flicker
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);  // After 1 second, stop loading and show the actual status
    }, 1000);  // Grace period of 1 second

    return () => clearTimeout(timeout);  // Cleanup the timeout on component unmount
  }, []);

  return (
    <div className="sm:w-[300px]">
      <Button className="nextUiButton" onPress={onOpen}>Why you can trust us</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-mono">Everything is Public</ModalHeader>
              <ModalBody>
                {loading ? (
                  <p className="text-gray-500">Loading...</p>
                ) : (
                  <>
                    {isConnected ? (
                      <div className="flex flex-col space-y-4">
                        <div className="flex justify-between">
                          <p className="text-pink font-mono">Check our Address:</p>
                          <p className="text-blue-500 font-mono">
                            <a href={`https://etherscan.io/address/${dealerAddress}`} target="_blank">
                              🔗 ${dealerAddress.slice(0, 5)}...${dealerAddress.slice(-5)}
                            </a>
                          </p>
                        </div>

                        <div className="flex justify-between">
                          <p className="text-blue-500 font-mono">Custody Wallet:</p>
                          <p className="text-blue-500 font-mono">
                            {dealerBalance !== null ? `${parseFloat(dealerBalance).toFixed(6)} ETH` : 'Loading dealer balance...'}
                          </p>
                        </div>

                        <div className="flex justify-between">
                          <p className="text-green-500 font-mono">Belongs to Users:</p>
                          <p className="text-green-500 font-mono">
                            {totalUserBalances !== null ? `${parseFloat(totalUserBalances).toFixed(6)} ETH` : 'Loading user balances...'}
                          </p>
                        </div>

                        <div className="flex justify-between">
                          <p className="text-purple-500 font-mono">We can afford to lose:</p>
                          <p className="text-purple-500 font-mono">
                            {effectiveDealerBalance !== null ? `${parseFloat(effectiveDealerBalance).toFixed(6)} ETH` : 'Calculating...'}
                          </p>
                        </div>

                        {/* <div className="flex justify-between">
                          <p className="text-pink font-mono">Check the Code:</p>
                          <p className="text-blue-500 font-mono">
                            <a href="https://github.com/gfrancomontero/ethroulette_frontend" target="_blank">🔗 GitHub</a>
                          </p>
                        </div>

                        {/* <div className="flex justify-between">
                          <p className="text-pink font-mono">Contact us:</p>
                          <p className="text-blue-500 font-mono">
                            <a href="https://gonzalofranco.com" target="_blank">🔗 Click Here</a>
                          </p>
                        </div> */}

                        <div className="flex justify-between">
                          <small className="text-grey font-mono">Despite the information above, you should know this is a hobby project. We aren&apos;t responsible for your ETH, or malfunctions. This project works, but it is not being maintained, nor there is a support team.</small>
                        </div>

                        <br />
                      </div>
                    ) : (
                      <p className="text-red-500">Socket Error: Unable to connect</p>
                    )}
                  </>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
