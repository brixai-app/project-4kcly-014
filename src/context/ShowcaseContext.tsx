import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ContactInquiry, FilterState, Instrument, InstrumentCategory, NavigationState } from '@/types';
import { loadInstrumentById, loadInstruments, submitInquiry } from '@/data/mockData';

type InquiryStatus = 'idle' | 'loading' | 'success' | 'error';

interface ShowcaseContextValue {
  instruments: Instrument[];
  filteredInstruments: Instrument[];
  loading: boolean;
  inquiryLoading: boolean;
  inquiryStatus: InquiryStatus;
  inquiryError: string | null;
  search: string;
  category: InstrumentCategory | 'All';
  sortBy: FilterState['sortBy'];
  inStockOnly: boolean;
  navigation: NavigationState;
  selectedInstrument: Instrument | null;
  inquiryInstrument: Instrument | null;
  setSearch: (value: string) => void;
  setCategory: (value: InstrumentCategory | 'All') => void;
  setSortBy: (value?: FilterState['sortBy']) => void;
  setInStockOnly: (value: boolean) => void;
  openDrawer: (instrumentId?: string | null) => void;
  closeDrawer: () => void;
  setLastVisitedPath: (path?: string) => void;
  refreshInstruments: () => Promise<void>;
  selectInstrumentById: (id?: string | null) => Promise<void>;
  submitInquiryForm: (inquiry: ContactInquiry) => Promise<boolean>;
}

const ShowcaseContext = createContext<ShowcaseContextValue | undefined>(undefined);

const normalize = (value: string) => value.trim().replace(/\s+/g, ' ').slice(0, 120);
const sanitize = (value: string) => normalize(value).replace(/[<>]/g, '');
const debounceMs = 250;

export function ShowcaseProvider({ children }: { children?: React.ReactNode }) {
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<InstrumentCategory | 'All'>('All');
  const [sortBy, setSortBy] = useState<FilterState['sortBy']>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [navigation, setNavigation] = useState<NavigationState>({ isDrawerOpen: false, activeInstrumentId: null, lastVisitedPath: '/' });
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null);
  const [inquiryInstrument, setInquiryInstrument] = useState<Instrument | null>(null);
  const [inquiryLoading, setInquiryLoading] = useState(false);
  const [inquiryStatus, setInquiryStatus] = useState<InquiryStatus>('idle');
  const [inquiryError, setInquiryError] = useState<string | null>(null);
  const debounceRef = useRef<number | null>(null);

  const refreshInstruments = useCallback(async () => {
    setLoading(true);
    try {
      const data = await loadInstruments();
      setInstruments(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshInstruments();
  }, [refreshInstruments]);

  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => setSearch(sanitize(searchInput)), debounceMs);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [searchInput]);

  const selectInstrumentById = useCallback(async (id?: string | null) => {
    if (!id) {
      setSelectedInstrument(null);
      setInquiryInstrument(null);
      return;
    }
    const cached = instruments.find((item) => item?.id === id) ?? null;
    if (cached) {
      setSelectedInstrument(cached);
      setInquiryInstrument(cached);
      return;
    }
    const loaded = await loadInstrumentById(id);
    setSelectedInstrument(loaded ?? null);
    setInquiryInstrument(loaded ?? null);
  }, [instruments]);

  const openDrawer = useCallback((instrumentId?: string | null) => {
    setNavigation((prev) => ({ ...prev, isDrawerOpen: true, activeInstrumentId: instrumentId ?? prev.activeInstrumentId ?? null }));
    void selectInstrumentById(instrumentId ?? navigation.activeInstrumentId ?? null);
  }, [navigation.activeInstrumentId, selectInstrumentById]);

  const closeDrawer = useCallback(() => {
    setNavigation((prev) => ({ ...prev, isDrawerOpen: false }));
  }, []);

  const setLastVisitedPath = useCallback((path?: string) => {
    setNavigation((prev) => ({ ...prev, lastVisitedPath: path ?? prev.lastVisitedPath ?? '/' }));
  }, []);

  const submitInquiryForm = useCallback(async (inquiry: ContactInquiry) => {
    setInquiryLoading(true);
    setInquiryStatus('loading');
    setInquiryError(null);
    try {
      await submitInquiry(inquiry);
      setInquiryStatus('success');
      return true;
    } catch (error) {
      setInquiryStatus('error');
      setInquiryError(error instanceof Error ? error.message : 'Unable to submit inquiry.');
      return false;
    } finally {
      setInquiryLoading(false);
    }
  }, []);

  const filteredInstruments = useMemo(() => {
    const q = search.toLowerCase();
    const list = instruments.filter((item) => {
      const matchesSearch =
        !q ||
        [item?.name, item?.category, item?.description, ...(item?.tags ?? [])].join(' ').toLowerCase().includes(q);
      const matchesCategory = category === 'All' || item?.category === category;
      const matchesStock = !inStockOnly || item?.inStock !== false;
      return matchesSearch && matchesCategory && matchesStock;
    });
    const sorted = [...list].sort((a, b) => {
      if (sortBy === 'price-asc') return (a?.price ?? 0) - (b?.price ?? 0);
      if (sortBy === 'price-desc') return (b?.price ?? 0) - (a?.price ?? 0);
      if (sortBy === 'rating') return (b?.rating ?? 0) - (a?.rating ?? 0);
      const af = a?.featured ? 1 : 0;
      const bf = b?.featured ? 1 : 0;
      return bf - af || (b?.reviewCount ?? 0) - (a?.reviewCount ?? 0);
    });
    return sorted;
  }, [category, instruments, inStockOnly, search, sortBy]);

  const value = useMemo<ShowcaseContextValue>(() => ({
    instruments,
    filteredInstruments,
    loading,
    inquiryLoading,
    inquiryStatus,
    inquiryError,
    search,
    category,
    sortBy,
    inStockOnly,
    navigation,
    selectedInstrument,
    inquiryInstrument,
    setSearch: setSearchInput,
    setCategory,
    setSortBy,
    setInStockOnly,
    openDrawer,
    closeDrawer,
    setLastVisitedPath,
    refreshInstruments,
    selectInstrumentById,
    submitInquiryForm,
  }), [
    instruments,
    filteredInstruments,
    loading,
    inquiryLoading,
    inquiryStatus,
    inquiryError,
    search,
    category,
    sortBy,
    inStockOnly,
    navigation,
    selectedInstrument,
    inquiryInstrument,
    openDrawer,
    closeDrawer,
    setLastVisitedPath,
    refreshInstruments,
    selectInstrumentById,
    submitInquiryForm,
  ]);

  return <ShowcaseContext.Provider value={value}>{children}</ShowcaseContext.Provider>;
}

export function useShowcase() {
  const context = useContext(ShowcaseContext);
  if (!context) throw new Error('useShowcase must be used within ShowcaseProvider');
  return context;
}

export default ShowcaseContext;
export { ShowcaseContext };
