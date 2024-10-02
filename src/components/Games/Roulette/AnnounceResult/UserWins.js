import { useState, useEffect } from 'react';
import { fetchEthToUsdRate } from '@/services/convertEthToUsd'; // Adjust path as necessary
import { Button } from "@nextui-org/react";
import Confetti from "react-confetti";
import styles from './AnnounceResults.module.scss';
import BuildingHype from './BuildingHype';

export default function UserWins({ onPress, winningColor, selectedColor, userWins, lastBetSize }) {
  const [buildingHype, setBuildingHype] = useState(true);
  const [ethToUsdRate, setEthToUsdRate] = useState(null);

  useEffect(() => {
    const getEthToUsdRate = async () => {
      try {
        const rate = await fetchEthToUsdRate();
        setEthToUsdRate(rate);
      } catch (error) {
        console.error(error.message);
      }
    };

    getEthToUsdRate();

    const hypeTimeout = setTimeout(() => {
      setBuildingHype(false);
    }, 2000); // Adjust timing as necessary

    return () => clearTimeout(hypeTimeout);
  }, []);

  const formatNumber = (num, decimals) => parseFloat(Number(num).toFixed(decimals)).toLocaleString();

  const calculateUSDValue = () =>
    ethToUsdRate ? formatNumber(lastBetSize * 2 * ethToUsdRate, 2) : 'Loading...';

  return (
    <div className={`h-screen w-screen fixed z-50 top-0 left-0 flex flex-col justify-center items-center backdrop-blur-lg ${userWins ? styles.userWins : styles.userLoses}`}>
      {buildingHype ? (
        <BuildingHype />
      ) : (
        <Result
          lastBetSize={lastBetSize}
          selectedColor={selectedColor}
          winningColor={winningColor}
          calculateUSDValue={calculateUSDValue}
          onPress={onPress}
        />
      )}
    </div>
  );
}

const Result = ({ lastBetSize, selectedColor, winningColor, calculateUSDValue, onPress }) => (
  <>
    <Confetti numberOfPieces={250} recycle={false} width={window.innerWidth} height={window.innerHeight} />
    <div className="flex flex-row justify-center items-center">
      <span className="text-4xl mt-2 mr-4">😁</span>
      <h1 className="text-3xl">You Win!</h1>
      <span className="text-4xl mt-2 ml-4">😁</span>
    </div>
    <div className={`flex flex-row ${styles.resultsGrid} mt-4 w-[320px]`}>
      <div className="header flex flex-col items-start w-full pr-1">
        <div className="w-full mr-1 rounded-lg border-1-green text-center mb-4">YOU CHOSE</div>
        <div className={`w-full mr-1 rounded-lg border-1-green text-center ${styles[selectedColor]}`}>
          {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1).toLowerCase()}
        </div>
      </div>
      <div className="header flex flex-col items-end w-full pl-1">
        <div className="w-full ml-1 rounded-lg border-1-green text-center mb-4">RESULT</div>
        <div className={`w-full ml-1 rounded-lg border-1-green text-center ${styles[winningColor]}`}>
          {winningColor.charAt(0).toUpperCase() + winningColor.slice(1).toLowerCase()}
        </div>
      </div>
    </div>
    <div className="text-center mt-4">
      Well done. You just won {lastBetSize} ETH.
      <br />
      That&apos;s about {calculateUSDValue()} USD.
    </div>
    <Button className="nextUiButton mt-8" onPress={onPress}>OK</Button>
  </>
);
