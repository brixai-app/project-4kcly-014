import React from 'react';
import HomeHero from '@/components/HomeHero';
import HomeCollections from '@/components/HomeCollections';

export function Home() {
  return (
    <main className="bg-white text-[#18222C]">
      <HomeHero />
      <HomeCollections />
    </main>
  );
}

export default Home;