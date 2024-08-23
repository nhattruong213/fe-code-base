import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useLogout } from '@/hooks/useLogout';
import { useAppSelector } from '@/stores/hooks';

export const useLogic = () => {
  const [isLogged, setIsLogged] = useState(true);
  const router = useRouter();
  const { logout } = useLogout();

  const { token, isLoadedToken } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!isLogged && token?.accessToken && token?.refreshToken) {
      return router.push('/product/list');
    }
  }, [isLogged, token?.accessToken, token?.refreshToken]);

  useEffect(() => {
    if (isLoadedToken && token?.accessToken) {
      logout();
    }

    setTimeout(() => setIsLogged(false), 150);
  }, [isLoadedToken]);

  return { isLogged };
};
