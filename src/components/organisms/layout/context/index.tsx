import { createContext, useMemo, useState } from "react";

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

  return (
    <DrawContext.Provider value={contextValue}>{children}</DrawContext.Provider>
  )
}