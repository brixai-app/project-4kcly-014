import { useParams } from 'react-router-dom';
import { InstrumentDetailExperience } from '@/components/InstrumentDetailExperience';

export function InstrumentDetailPage({ className = '' }: { className?: string }) {
  const params = useParams<{ id?: string }>();
  const id = params?.id ?? '';
  return (
    <main className={className}>
      <InstrumentDetailExperience />
      <div className="sr-only" data-instrument-id={id} />
    </main>
  );
}

export default InstrumentDetailPage;