import React from 'react';
import { useParams } from 'react-router-dom';
import { instruments } from '@/data/mockData';
import { CollectionShowcase } from '@/components/CollectionShowcase';
import { InstrumentStory, NotFoundState } from '@/components/InstrumentStory';

export function CollectionPage() {
  return <CollectionShowcase />;
}

export function InstrumentDetailPage() {
  const { instrumentId } = useParams();
  const instrument = instruments?.find((item) => item.id === instrumentId);
  if (!instrument) return <NotFoundState />;
  return <InstrumentStory />;
}

export default CollectionPage;