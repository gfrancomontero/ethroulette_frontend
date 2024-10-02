// src/services/downloadTxt.js

export const downloadTransactionDetails = (transactionData) => {
  const transactionInfo = `
    From: ${transactionData.from}
    To: ${transactionData.to}
    Transaction Hash: ${transactionData.transactionHash}
    Amount Sent: ~${parseFloat(transactionData.amount).toFixed(6)} ETH
  `;

  // Create a Blob with the transaction info
  const blob = new Blob([transactionInfo], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);

  // Create an anchor element to trigger the download
  const a = document.createElement('a');
  a.href = url;
  a.download = 'transaction-details.txt';
  a.click();

  // Revoke the object URL after the download
  window.URL.revokeObjectURL(url);
};
