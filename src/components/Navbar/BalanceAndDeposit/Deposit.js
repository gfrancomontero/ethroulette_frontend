// src/components/Navbar/Deposit.js

import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent } from '@mui/material';

export default function Deposit({ account }) {
  const [depositAmount, setDepositAmount] = useState('');  // Amount the user wants to deposit
  const [errorMessage, setErrorMessage] = useState('');  // Error message state
  const [isOpen, setIsOpen] = useState(false);  // Modal open/close state

  // Handle modal open/close
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // Handle the deposit process
  const handleDeposit = async () => {
    alert('You have arrived at the handleDeposit async function')
  };

  return (
    <div>
      {/* Button to open the modal */}
      <div className="font-overpass text-xs whitespace-nowrap underline" color="primary" onClick={handleOpen}>
        DEPOSIT FUNDS
      </div>

      {/* Material-UI Dialog for Modal */}
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle className="text-green bg-black">Deposit Funds</DialogTitle>
        <DialogContent>
          {/* Input for deposit amount */}
          <input
            type="text"
            placeholder="Amount to deposit (ETH)"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md mt-4 w-full"
          />

          <button
            onClick={handleDeposit}
            className="bg-green-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-green-600 w-full"
          >
            Add ETH to your Ethereum Roulette balance
          </button>

          {/* Display error message if any */}
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </DialogContent>
      </Dialog>
    </div>
  );
}
