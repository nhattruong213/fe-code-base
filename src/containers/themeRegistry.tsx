'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

import { theme } from '@/styles/theme';

interface ThemeRegistryProps {
  children?: React.ReactNode;
}

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
export function ThemeRegistry(props: ThemeRegistryProps) {
  const { children } = props;

  return (
    <AppRouterCacheProvider options={{ key: 'ht' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
