import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { HTTP_STATUS_AUTH_FAILED } from '@/constants/httpCode';
import { useQuery } from '@/hooks/useQuery';
import { AuthInfoRes } from '@/schemas/auth/infoRes';
import { info } from '@/services/api/info';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { authAction } from '@/stores/reducers/auth';

export const useLogic = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [enabledGetUseInfo, setEnabledGetUseInfo] = useState(false);

  const checkLogin = (statusCode: number) => {
    if (HTTP_STATUS_AUTH_FAILED.includes(statusCode)) {
      dispatch(authAction.removeToken());

      return router.push('/');
    }
  };

  useQuery({
    apiConfig: info,
    responseSchema: AuthInfoRes,
    options: {
      enabled: enabledGetUseInfo,
      queryKey: [],
    },
    onSuccess: ({ data }) => dispatch(authAction.setUser(data || null)),
    onError: ({ statusCode }) => checkLogin(statusCode),
  });

  useEffect(() => {
    if ((!user.token?.refreshToken || user.token?.refreshToken === '') && user.isLoadedToken === true) {
      return router.push('/auth/login');
    }

    if (user.isLoadedToken === true && !user.data) {
      setEnabledGetUseInfo(true);
    }
  }, [user]);

  useEffect(() => {
    if (user.data) {
      setIsLoading(false);
    }
  }, [user, router]);

  return { isLoading };
};
