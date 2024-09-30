import Roulette from './Games/Roulette/Roulette.js';

export default function Game() {

  return (
    <div className="rb h-screen w-screen flex flex-col jca text-white">
      <p className="text-pink">Super-secure Web3 Micro-Casino</p>
      <p className="text-pink">A quick way to double your Ethereum</p>
      <Roulette />
    </div>
  );
}
