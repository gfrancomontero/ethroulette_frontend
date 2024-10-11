
'use client';

import BalanceManager from './Navbar/BalanceManager';  
import MetaMaskBalance from './Navbar/MetaMaskBalance';
import BalanceAndDeposit from './Navbar/BalanceAndDeposit/Index';  


export default function App() {
  
  return (
    <div className="flex w-full flex-col sm:flex-row sm:justify-between justify-start fixed top-0 p-2">
      <BalanceManager />
      <MetaMaskBalance />
      <BalanceAndDeposit />
    </div>
  );
}