import { useState, useEffect } from 'react';
import { initializeWeb3 } from '../services/Web3Service';
import Link from 'next/link'

export default function EnsureMetaMask() {
  const [metaMaskInstalled, setMetaMaskInstalled] = useState(false) // here I am declaring metamask installation status and storing as state variable

  useEffect(() => {
    const initializeWeb3 = initializeWeb3();
    // if the main web3 engine isn't available, means metamask isn't installed in the user
    // browser. then we can show him a download link or something
    if (!initializeWeb3) {
      setMetaMaskInstalled(false)
    } else {
      setMetaMaskInstalled(true)
    }
  }, [])

  if (!metaMaskInstalled) {
    return <div className="text-red-500">
      MetaMask is not installed please install it<Link href="www.metamask.com">here</Link>
    </div>
  }
}

