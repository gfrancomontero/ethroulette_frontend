// src/components/enforcers/EnsureWalletConnected.js

export default function EnsureWalletConnected({ onConnect }) {
  return (
    <div className="flex flex-col items-center h-screen">
      <p className="text-pink text-lg">Super-secure Web3 Micro-Casino</p>
      <p className="text-pink text-lg">A quick way to double your Ethereum</p>
      <h2 className="text-xl font-semibold my-4 font-overpass text-green">Please connect your MetaMask</h2>
      <button
        onClick={onConnect}  // The onConnect function will trigger the MetaMask wallet connection
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 z-10"
      >
        Connect MetaMask Wallet
      </button>
    </div>
  );
}
