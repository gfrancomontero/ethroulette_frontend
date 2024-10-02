import { useState, useEffect } from 'react';
import styles from './AnnounceResults.module.scss';
import { Button } from "@nextui-org/react";
import BuildingHype from './BuildingHype';

export default function UserWins({ onPress, winningColor, selectedColor, userWins, lastBetSize }) {
  const [buildingHype, setBuildingHype] = useState(true);

  useEffect(() => {
    // Set a timeout for the hype builder
    const hypeTimeout = setTimeout(() => {
      setBuildingHype(false);
    }, 2000); // Adjust the timing as necessary

    // Clear the timeout when the component unmounts
    return () => clearTimeout(hypeTimeout);
  }, []);

  return (
    <div className={`h-screen w-screen fixed z-50 top-0 left-0 flex flex-col jca backdrop-blur-lg ${userWins ? styles.userWins : styles.userLoses}`}>
      {buildingHype ? (
        <BuildingHype />
      ) : (
        <>
          <h2>😥</h2>
          <h3 className="font-overpass">You didn&apos;t win this time!</h3>
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
          <Button className="nextUiButton mt-6" onPress={onPress}>Try again</Button>
        </>
      )}
    </div>
  );
}
