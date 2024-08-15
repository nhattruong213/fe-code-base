'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { SettingsDrawer } from '@/components/molecules/drawSetting/drawSetting';
import { SettingProvider } from '@/context/settings';
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
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </SettingProvider>
  );
}
