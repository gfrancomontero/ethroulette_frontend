import WalletConnect from '../components/WalletConnect';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold mb-8">E.R.</h1>
      <WalletConnect />
    </div>
  );
}
