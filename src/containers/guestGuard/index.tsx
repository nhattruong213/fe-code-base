'use client';

import { LoadingScreen } from '@/components/molecules/loading';
import { useLayout } from '@/hooks/useLayout';

import { useLogic } from './useLogic';

export const GuestGuard = ({ children }: { children: React.ReactNode }) => {
  useLayout({ type: 'public' });

  const { isLogged } = useLogic();

  return isLogged ? <LoadingScreen /> : children;
};
