// src/components/Navbar/BalanceAndDeposit/Balance.js

export default function Balance({ account }) {

  return (
    <div className="text-end w-full">
      <h3 className="text-sm font-overpass">Your EthRoulette Balance:</h3>

      <p className={`text-sm font-overpass mt-2 text-${0 === 0 ? 'red' : 'green'}-500`}>
          <span className="text-red-500">{0} Eth</span>
      </p>
    </div>
  );
}
