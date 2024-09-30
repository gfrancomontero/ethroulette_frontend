// src/components/Navbar/Index.js

import React, { useState } from 'react';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import { useSelector } from 'react-redux';
import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure} from "@nextui-org/react";

export default function Index() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const userBalance = useSelector((state) => state.userBalance.balance);
  const [transactionType, setTransactionType] = useState('deposit')

  return (
    <div className="text-end rbp-2">
      <Button className="nextUiButton" onPress={onOpen}>Your Balance: {parseFloat(userBalance).toFixed(6)} ETH</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <div className={`flex gap-4 flex-row transition-ease font-mono`}>
                  <div className={`cursor-pointer ${transactionType == 'deposit' ? 'text-pink' : 'text-slate-400'}`} onClick={() => setTransactionType('deposit')}>Deposit Eth</div>
                  <div className={`cursor-pointer ${transactionType == 'withdraw' ? 'text-pink' : 'text-slate-400'}`} onClick={() => setTransactionType('withdraw')}>Withdraw Eth</div>
                </div>
              </ModalHeader>
              <ModalBody>
                {transactionType == 'deposit' ? <Deposit /> : <Withdraw />}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
