'use client';  // Ensure this is a client-side component

import ClientProvider from '@/components/ClientProvider';  // Your wrapper for client components
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <ClientProvider>  {/* Wrap with ClientProvider to ensure Redux and other client-side logic */}
      <Content />
    </ClientProvider>
  );
}

function Content() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Navbar />
    </div>
  );
}
