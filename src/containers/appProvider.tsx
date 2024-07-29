'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeRegistry } from './themeRegistry';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export async function AppProvider({ children }: React.PropsWithChildren) {
  return (
    <ThemeRegistry>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeRegistry>
  );
}
