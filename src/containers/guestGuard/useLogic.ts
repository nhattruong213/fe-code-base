import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAppSelector } from '@/stores/hooks';

export const useLogic = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const { token } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (token?.refreshToken && token?.refreshToken !== '') {
      return router.push('/');
    }

    return setIsLoading(false);
  }, [token]);

  return { isLoading };
};
