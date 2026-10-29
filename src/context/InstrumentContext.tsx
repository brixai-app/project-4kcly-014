import React, { createContext, useContext, useMemo, useState } from 'react';
import type { Instrument, InstrumentCategory } from '@/types';
import mockData, { categories } from '@/data/mockData';

type InstrumentContextValue = {
  instruments: Instrument[];
  categories: InstrumentCategory[];
  featuredInstruments: Instrument[];
  selectedInstrumentId: string | null;
  selectedInstrument: Instrument | null;
  setSelectedInstrumentId: React.Dispatch<React.SetStateAction<string | null>>;
  getInstrumentById: (id?: string | null) => Instrument | null;
  getInstrumentsByCategory: (category?: InstrumentCategory | 'all') => Instrument[];
};

const InstrumentContext = createContext<InstrumentContextValue | undefined>(undefined);

export function InstrumentProvider({ children }: { children?: React.ReactNode }) {
  const [selectedInstrumentId, setSelectedInstrumentId] = useState<string | null>(mockData?.[0]?.id ?? null);

  const instruments = mockData ?? [];
  const featuredInstruments = useMemo(() => instruments.filter((item) => item?.featured ?? false), [instruments]);

  const getInstrumentById = (id?: string | null) => instruments.find((item) => item?.id === id) ?? null;
  const getInstrumentsByCategory = (category?: InstrumentCategory | 'all') =>
    category && category !== 'all' ? instruments.filter((item) => item?.category === category) : instruments;

  const selectedInstrument = getInstrumentById(selectedInstrumentId);

  const value = useMemo(
    () => ({
      instruments,
      categories: categories ?? [],
      featuredInstruments,
      selectedInstrumentId,
      selectedInstrument,
      setSelectedInstrumentId,
      getInstrumentById,
      getInstrumentsByCategory,
    }),
    [featuredInstruments, instruments, selectedInstrument, selectedInstrumentId]
  );

  return <InstrumentContext.Provider value={value}>{children}</InstrumentContext.Provider>;
}

export function useInstruments() {
  const context = useContext(InstrumentContext);
  if (!context) throw new Error('useInstruments must be used within an InstrumentProvider');
  return context;
}

export default InstrumentContext;
export { InstrumentContext };
