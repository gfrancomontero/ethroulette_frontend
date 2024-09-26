// src/components/enforcers/EnsureWalletConnected.js

export default function EnsureWalletConnected({ onConnect }) {
  return (
    <div className="flex flex-col items-center h-screen">
      <h2 className="text-xl font-semibold mb-4">Please connect your MetaMask wallet to continue</h2>
      <button
        onClick={onConnect}  // The onConnect function will trigger the MetaMask wallet connection
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 z-10"
      >
        Connect MetaMask Wallet
      </button>
    </div>
  );
}
