'use client';

import { Box, Toolbar } from '@mui/material';

import { drawerWidth } from '@/constants/app';

import { Draw } from '../draw';
import { Header } from '../header';
import { DrawContextProvider } from './context';

export const LayoutDashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <DrawContextProvider>
        <Header />
        <Draw />
      </DrawContextProvider>
      <Box component="main" sx={{ width: `calc(100% - ${drawerWidth})`, flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
