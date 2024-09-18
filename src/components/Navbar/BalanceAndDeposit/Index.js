// src/components/Navbar/Index.js

import React from 'react';
import Balance from './Balance';
import Deposit from './Deposit';

export default function Index() {
  return (
    <div className="text-end rbp-2 w-full">

      <Balance />
      <Deposit />
    </div>
  );
}
