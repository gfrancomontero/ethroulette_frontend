import React from 'react';
import { downloadTransactionDetails } from '@/services/downloadTxt';

export default function DownloadButton({ transactionData }) {
  return (
    <div className="w-full flex flex-col jca mt-8">
      <small className="text-blue-300 font-overpass flex text-center">
        We highly recommend you download transaction details for your reference.
      </small>
      <button
        onClick={() => downloadTransactionDetails(transactionData)}
        className="bg-transparent border-pink text-pink hover:underline px-2 py-1"
      >
        Download
      </button>
    </div>
  );
}
