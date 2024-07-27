import { Breakpoint, useMediaQuery } from "@mui/material";
import { createContext, useEffect, useMemo, useState } from "react";

import { theme } from "@/styles/theme";

export type DrawContextValue = {
  drawerOpen: boolean;
  handlerDrawerOpen: (drawerOpen: boolean) => void;
};

export const DrawContext = createContext<DrawContextValue>({} as DrawContextValue);

export const DrawContextProvider = ({ children } : { children:React.ReactNode }) => {
  const [drawerOpen, setDrawerOpen] = useState(true);

  const contextValue = useMemo(() => ({
    drawerOpen,
    handlerDrawerOpen: setDrawerOpen
  }), [drawerOpen]);

  const isMobile = useMediaQuery(theme.breakpoints.down('lg' as Breakpoint));
  useEffect(() => {
    setDrawerOpen(!isMobile)
  }, [isMobile]);

  return (
    <DrawContext.Provider value={contextValue}>{children}</DrawContext.Provider>
  )
}