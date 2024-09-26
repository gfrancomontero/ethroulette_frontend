import React from 'react';

export default function TransactionInfo({ label, value, linkType }) {
  return (
    <div className="flex justify-between">
      <p className="text-pink font-mono">{label}:</p>
      <p className="text-blue-500 font-mono">
        <a href={`https://etherscan.io/${linkType}/${value}`} target="_blank" rel="noopener noreferrer">
          🔗 {value ? `${value.slice(0, 5)}...${value.slice(-5)}` : ''}
        </a>
      </p>
    </div>
  );
}
