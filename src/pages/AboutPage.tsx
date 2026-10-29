import React from 'react';
import AboutEditorial from '@/components/AboutEditorial';

export interface AboutPageProps {
  className?: string;
}

export function AboutPage({ className = '' }: AboutPageProps) {
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = 'About | SurSangeet';
    }
  }, []);

  return (
    <main className={className}>
      <AboutEditorial />
    </main>
  );
}

export default AboutPage;