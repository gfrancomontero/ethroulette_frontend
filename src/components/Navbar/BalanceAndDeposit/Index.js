// src/components/Navbar/Index.js

import React from 'react';
import Deposit from './Deposit';
import { useSelector } from 'react-redux';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function Index() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const userBalance = useSelector((state) => state.userBalance.balance);
  return (
    <div className="text-end rbp-2 w-full">
      <Button onPress={onOpen}>Your Balance: {userBalance}</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Deposit Eth</ModalHeader>
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
