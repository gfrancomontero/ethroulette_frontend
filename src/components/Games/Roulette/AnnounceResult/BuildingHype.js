import { useState, useEffect } from 'react';
import styles from './BuildingHype.module.scss';

export default function BuildingHype() {
  const [showRed, setShowRed] = useState(true);

  useEffect(() => {
    // Toggle between RED and BLACK every 300ms
    const interval = setInterval(() => {
      setShowRed((prevShowRed) => !prevShowRed);
    }, 150);

    // Clear interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex items-center justify-center h-full w-full ${styles.hypeBuilder}`}>
      <h1 className={`text-8xl font-extrabold transition duration-300 font-overpass ${showRed ? 'text-red-600' : 'text-black'}`}>
        {showRed ? 'RED' : 'BLACK'}
      </h1>
    </div>
  );
}
