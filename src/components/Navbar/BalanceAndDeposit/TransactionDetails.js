import React from 'react';
import TransactionInfo from './TransactionInfo';
import DownloadButton from './DownloadButton';

export default function TransactionDetails({ transactionData }) {
  return (
    <>
      <h5 className="font-bold text-green-500 w-full text-center">Transaction Complete!</h5>
      <div className="bg-gray-100 p-4 mt-4 rounded-lg">
        <TransactionInfo label="From" value={transactionData.from} linkType="address" />
        <TransactionInfo label="To" value={transactionData.to} linkType="address" />
        <TransactionInfo label="Transaction Hash" value={transactionData.transactionHash} linkType="tx" />
        <div className="flex justify-between">
          <p className="text-pink font-mono">Amount Sent:</p>
          <p className="text-blue-500 font-mono">~{parseFloat(transactionData.amount).toFixed(6)} ETH</p>
        </div>

        <DownloadButton transactionData={transactionData} />
      </div>
    </>
  );
}
