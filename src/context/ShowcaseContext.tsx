import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Instrument, ShowcaseDrawerState } from '@/types';

type ShowcaseContextValue = {
  selectedInstrument: Instrument | null;
  detailDrawer: ShowcaseDrawerState;
  contactDrawerOpen: boolean;
  mobileNavOpen: boolean;
  setSelectedInstrument: (instrument: Instrument | null) => void;
  openDetailDrawer: (instrument?: Instrument | null) => void;
  closeDetailDrawer: () => void;
  openContactDrawer: () => void;
  closeContactDrawer: () => void;
  toggleMobileNav: () => void;
  openMobileNav: () => void;
  closeMobileNav: () => void;
};

const ShowcaseContext = createContext<ShowcaseContextValue | undefined>(undefined);

export function ShowcaseProvider({ children }: { children?: ReactNode }) {
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null);
  const [detailDrawer, setDetailDrawer] = useState<ShowcaseDrawerState>({ open: false, instrumentId: null });
  const [contactDrawerOpen, setContactDrawerOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const openDetailDrawer = useCallback((instrument?: Instrument | null) => {
    setSelectedInstrument(instrument ?? null);
    setDetailDrawer({ open: true, instrumentId: instrument?.id ?? null });
  }, []);

  const closeDetailDrawer = useCallback(() => {
    setDetailDrawer({ open: false, instrumentId: null });
  }, []);

  const openContactDrawer = useCallback(() => {
    setContactDrawerOpen(true);
  }, []);

  const closeContactDrawer = useCallback(() => {
    setContactDrawerOpen(false);
  }, []);

  const toggleMobileNav = useCallback(() => {
    setMobileNavOpen((prev) => !prev);
  }, []);

  const openMobileNav = useCallback(() => {
    setMobileNavOpen(true);
  }, []);

  const closeMobileNav = useCallback(() => {
    setMobileNavOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      selectedInstrument,
      detailDrawer,
      contactDrawerOpen,
      mobileNavOpen,
      setSelectedInstrument,
      openDetailDrawer,
      closeDetailDrawer,
      openContactDrawer,
      closeContactDrawer,
      toggleMobileNav,
      openMobileNav,
      closeMobileNav,
    }),
    [
      selectedInstrument,
      detailDrawer,
      contactDrawerOpen,
      mobileNavOpen,
      openDetailDrawer,
      closeDetailDrawer,
      openContactDrawer,
      closeContactDrawer,
      toggleMobileNav,
      openMobileNav,
      closeMobileNav,
    ],
  );

  return <ShowcaseContext.Provider value={value}>{children}</ShowcaseContext.Provider>;
}

export function useShowcase() {
  const context = useContext(ShowcaseContext);
  if (!context) {
    throw new Error('useShowcase must be used within a ShowcaseProvider');
  }
  return context;
}

export default ShowcaseContext;
export { ShowcaseContext };
