// src/components/enforcers/EnsureMetaMask.js

import Link from 'next/link';

export default function EnsureMetaMask() {
  return (
    <div className="flex flex-col items-center h-screen text-red-500">

      <p className="text-pink">Super-secure Web3 Micro-Casino</p>
      <p className="text-pink">A quick way to double your Ethereum</p>
        <div className="flex flex-col mt-4 text-center text-green">
          MetaMask is not installed. Please install it{' '}
          <Link href="https://metamask.io/" target="_blank" className="text-blue-500 underline">
            here
          </Link>
        </div>
    </div>
  );
}
