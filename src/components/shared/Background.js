"use client";

import React, { useEffect, useState } from 'react';
import styles from './background.module.scss';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Background = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const pathname = usePathname();
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
<div>
<div
      className={styles.mainContainer}
      style={{
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`,
      }}
    >
    </div>
    <Image
      alt="Miss Freedom"
      src='/images/backgroundLogo.png'
      priority={true}
      height={500}
      width={500}
      className={`
        default:          ${styles.neonImage}
                          ${styles[pathname.slice(1)]}
                          absolute bottom-0
                          left-[2.5vw] h-[90vh] sm:h-[65vh]
                          w-auto opacity-80
      `} 
    />
</div>
  );
};

export default Background;
