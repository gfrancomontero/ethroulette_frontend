'use client';

import { useEffect } from 'react';
import UserWallet from './Navbar/UserWallet';
import Pot from './Navbar/Pot';  
import BalanceAndDeposit from './Navbar/BalanceAndDeposit/Index';  

export default function Navbar() {

  return (
    <div className="flex w-full flex-row justify-between rb fixed top-0">
      <Pot />
      <UserWallet />
      <BalanceAndDeposit />
    </div>
  );
}