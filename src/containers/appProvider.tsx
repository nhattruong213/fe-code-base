'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';

import { SettingsDrawer } from '@/components/molecules/drawSetting/drawSetting';
import { SettingProvider } from '@/context/settings';
import { globalStore } from '@/stores';
import { ThemeProvider } from '@/styles/theme';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export function AppProvider({ children }: React.PropsWithChildren) {
  return (
    <SettingProvider
      defaultSettings={{
        themeMode: 'light', // 'light' | 'dark'
        themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini',
        themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
      }}
    >
      <AppRouterCacheProvider>
        <ThemeProvider>
          <SettingsDrawer />
          <Provider store={globalStore}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
          </Provider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </SettingProvider>
  );
}
