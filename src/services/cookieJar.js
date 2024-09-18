// src/services/cookieJar.js


export const referralManager = () => {
  // Extract the 'ref' parameter from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const referralCode = urlParams.get('ref') || 'organic';  // Get the 'ref' parameter

  localStorage.setItem('referralCode', referralCode);
};