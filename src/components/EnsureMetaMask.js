import Link from 'next/link';

export default function EnsureMetaMask() {
  return (
    <div className="text-red-500">
      MetaMask is not installed. Please install it{' '}
      <Link href="https://metamask.io/" className="text-blue-500 underline">
        here
      </Link>.
    </div>
  );
}
