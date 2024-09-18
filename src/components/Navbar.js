
'use client';

import MetaMaskBalance from './Navbar/MetaMaskBalance';
import BalanceManager from './Navbar/BalanceManager';  
import BalanceAndDeposit from './Navbar/BalanceAndDeposit/Index';  


export default function App() {
  
  return (
    <div className="flex w-full flex-row justify-between fixed top-0 p-2">
      <BalanceManager />
      <MetaMaskBalance />
      <BalanceAndDeposit />
      {/* <Button onPress={onOpen}>Internal Data</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Here is why you can trust us</ModalHeader>
              <ModalBody>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal> */}
    </div>
  );
}