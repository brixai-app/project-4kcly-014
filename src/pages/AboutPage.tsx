import React from 'react';
import AboutStory from '@/components/AboutStory';

export function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-[#18222C]">
      <AboutStory className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8" />
    </main>
  );
}

export default AboutPage;