import React from 'react';
import Image from 'next/image'
import styles from './LoadingOverlay.module.scss'

export default function LoadingOverlay() {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col justify-center items-center backdrop-blur-lg'>
      <div className='flex flex-col jca'>
        <Image className={styles.image} src="/images/metamask.svg" width={150} height={150} alt="Metamask Logo" />
        <br />
        <p className="text-white">Processing transaction, do not refresh this page.</p>
        <p className="text-white">This may take a bit, depending on the ETH Blockchain.</p>
      </div>
    </div>
  );
}
