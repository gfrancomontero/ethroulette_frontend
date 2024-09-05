export default function ConnectWallet({ onConnect }) {
  return (
    <button
      onClick={onConnect}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
    >
      Connect MetaMask Wallet
    </button>
  );
}
