'use client';

import { useAuthentication } from '@/hooks/useAuthentication';

export const AuthContainer = ({ children }: { children?: React.ReactNode }) => {
  useAuthentication();

  return <>{children}</>;
};
