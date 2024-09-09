// src/components/Navbar/UserWallet.js

export default function DepositComponent() {
  return (
    <div className="text-center text-center w-full">
      <h3 className="text-sm font-overpass">Your Wallet:</h3>
      <p className="text-blue-500 font-mono break-all">
        User Account
      </p>

      {/* Show MetaMask balance */}
      <p className={`text-sm font-overpass mt-2 text-${0 == 0 ? 'red' : 'green'}-500`}>
        MetaMask Balance: X ETH
      </p>
    </div>
  );
}