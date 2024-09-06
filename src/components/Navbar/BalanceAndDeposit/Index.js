// src/components/Navbar/Index.js

import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Balance from './Balance';
import Deposit from './Deposit';
import { useSelector } from 'react-redux';

export default function Account() {
  // Use state to handle modal open/close
  const [isOpen, setIsOpen] = useState(false);
  const account = useSelector((state) => state.metaMask.account);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="text-end rbp-2 w-full">
      <Balance account={account} />

      <Button variant="contained" color="primary" onClick={handleOpen}>
        DEPOSIT FUNDS
      </Button>

      {/* Material-UI Dialog for Modal */}
      <Dialog className="" open={isOpen} onClose={handleClose}>
        <DialogTitle className="text-green bg-black">Deposit Funds</DialogTitle>
        <DialogContent>
          <Deposit account={account} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
