// src/components/Navbar/BalanceAndDeposit/Balance.js
import { useSelector } from 'react-redux';

export default function Balance() {
  const userBalance = useSelector((state) => state.userBalance.balance);

  return (
    <div className="text-end w-full">
      <h3 className="text-sm font-overpass">Your EthRoulette Balance:</h3>

      <p className={`text-sm font-overpass mt-2 text-green-500`}>
          <span className="text-red-500">{userBalance} Eth</span>
      </p>
    </div>
  );
}
