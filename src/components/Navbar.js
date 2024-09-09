'use client';

import UserWallet from './Navbar/UserWallet';
import BalanceManager from './Navbar/BalanceManager';  
import BalanceAndDeposit from './Navbar/BalanceAndDeposit/Index';  

export default function Navbar() {

  return (
    <div className="flex w-full flex-row justify-between rb fixed top-0 p-2">
      <BalanceManager />
      <UserWallet />
      <BalanceAndDeposit />
    </div>
  );
}