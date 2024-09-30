// src/components/Navbar/Index.js

import React, { useState } from 'react';
import Deposit from './Deposit';
import { useSelector } from 'react-redux';
import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure} from "@nextui-org/react";

export default function Index() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const userBalance = useSelector((state) => state.userBalance.balance);
  return (
    <div className="text-end rbp-2">
      <Button className="nextUiButton" onPress={onOpen}>Your Balance: {parseFloat(userBalance).toFixed(6)} ETH</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row font-mono w-100">
                <div className="mr-6">Deposit Eth</div>
                <div className="mr-6">Withdraw Eth</div>
              </ModalHeader>
              <ModalBody>
                <Deposit />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
