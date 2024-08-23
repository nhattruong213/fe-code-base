'use client';

import { LoadingScreen } from '@/components/molecules/loading';
import { useLayout } from '@/hooks/useLayout';

import { useLogic } from './useLogic';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  useLayout({ type: 'private' });

  const { isLoading } = useLogic();

  return isLoading ? <LoadingScreen /> : children;
};
