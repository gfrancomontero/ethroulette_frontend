
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectMetaMask, fetchMetaMaskBalance } from '@/redux/slices/metaMaskUserBalanceSlice';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";

export default function MetaMaskBalance() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const dispatch = useDispatch();
  const { account, balance, loading, error } = useSelector((state) => state.metaMaskUser);

  // Connect MetaMask and fetch account on component mount
  useEffect(() => {
    if (!account) {
      dispatch(connectMetaMask());  // Connect to MetaMask and store the account in Redux
    }
  }, [account, dispatch]);

  // Fetch balance when the account is available
  useEffect(() => {
    if (account) {
      dispatch(fetchMetaMaskBalance(account));  // Fetch balance using Redux when account is set
    }
  }, [account, dispatch]);

  // MetaMask event listeners for account and network changes
  useEffect(() => {
    const { ethereum } = window;

    if (ethereum && ethereum.on) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          dispatch(connectMetaMask());  // Update account and fetch balance when account changes
        }
      };

      const handleChainChanged = () => {
        window.location.reload();  // Reload page when network is changed (optional, can be improved)
      };

      // Listen for MetaMask account change
      ethereum.on('accountsChanged', handleAccountsChanged);

      // Listen for MetaMask network change
      ethereum.on('chainChanged', handleChainChanged);

      // Clean up the event listeners on component unmount
      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
          ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, [dispatch]);

  if (loading) {
    return <p>Loading balance...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
    <Button className="nextUiButton" onPress={onOpen}>What we know about you</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-mono">Basically nothing.</ModalHeader>
              <ModalBody>


              <div className="flex flex-col space-y-4">
                <div className="flex justify-between">
                  <p className="text-pink font-mono">Your Metamask Wallet:</p>
                  <p className="text-blue-500 font-mono">
                    <a href={`https://etherscan.io/address/${account}`} target="_blank">
                      🔗 ${account.slice(0, 5)}...${account.slice(-5)}
                    </a>
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-blue-500 font-mono">Your Metamask Balance:</p>
                  <p className="text-blue-500 font-mono">
                    {parseFloat(balance).toFixed(6)} ETH
                  </p>
                </div>
                <br />
              </div>


              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
