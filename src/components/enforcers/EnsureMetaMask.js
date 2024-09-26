// src/components/enforcers/EnsureMetaMask.js

import Link from 'next/link';

export default function EnsureMetaMask() {
  return (
    <div className="text-red-500">
      MetaMask is not installed. Please install it{' '}
      <Link href="https://metamask.io/" target="_blank" className="text-blue-500 underline">
        here
      </Link>.
    </div>
  );
}
