import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { HTTP_STATUS_AUTH_FAILED } from '@/constants/httpCode';
import { useMutation } from '@/hooks/useMutation';
import { useQuery } from '@/hooks/useQuery';
import { AuthInfoRes } from '@/schemas/auth/infoRes';
import { RefreshTokenReq } from '@/schemas/refreshToken/refeshReq';
import { RefreshTokenRes } from '@/schemas/refreshToken/refreshRes';
import { info } from '@/services/api/info';
import { postRefeshToken } from '@/services/api/refreshToke';
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

      return router.push('/auth/login');
    }
  };

  // user info
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

  const { mutate } = useMutation({
    apiConfig: postRefeshToken,
    responseSchema: RefreshTokenRes,
    requestSchema: RefreshTokenReq,
    onSuccess: ({ data }) => {
      if (user.data) {
        dispatch(
          authAction.setToken({
            accessToken: data?.accessToken || null,
            refreshToken: data?.refreshToken || null,
          })
        );
      }
    },
    onError: ({ statusCode }) => checkLogin(statusCode),
  });

  useEffect(() => {
    if (user.data) {
      const interval = setInterval(() => user.token?.refreshToken && mutate({ token: user.token?.refreshToken }), 1500000);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
