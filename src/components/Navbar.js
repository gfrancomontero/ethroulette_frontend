'use client';

import MetaMaskBalance from './Navbar/MetaMaskBalance';
import BalanceManager from './Navbar/BalanceManager';  
import BalanceAndDeposit from './Navbar/BalanceAndDeposit/Index';  

export default function Navbar() {

  return (
    <div className="flex w-full flex-row justify-between rb fixed top-0 p-2">
      <BalanceManager />
      <MetaMaskBalance />
      <BalanceAndDeposit />
    </div>
  );
}