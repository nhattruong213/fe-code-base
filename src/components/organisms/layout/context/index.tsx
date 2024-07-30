'use client';

import { Breakpoint, useMediaQuery } from '@mui/material';
import { createContext, useEffect, useMemo, useState } from 'react';

import { theme } from '@/styles/theme';

export type DrawContextValue = {
  drawerOpen: boolean;
  handlerDrawerOpen: (drawerOpen: boolean) => void;
};

export const DrawContext = createContext<DrawContextValue>({} as DrawContextValue);

export const DrawContextProvider = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('lg' as Breakpoint));
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);

  const contextValue = useMemo(
    () => ({
      drawerOpen,
      handlerDrawerOpen: setDrawerOpen,
    }),
    [drawerOpen]
  );

  useEffect(() => {
    setDrawerOpen(!isMobile);
  }, [isMobile]);

  return <DrawContext.Provider value={contextValue}>{children}</DrawContext.Provider>;
};
